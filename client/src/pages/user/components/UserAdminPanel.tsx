import {useState} from "react";
import {Icon} from "@iconify/react";
import {
    useDeleteUserByAdminMutation,
    useGetAllUsersQuery,
    useUpdateUserRoleMutation,
} from "../../../redux/api/usersApi.ts";
import {AdminUserListItem, UserRole} from "../../../redux/types/adminUsers.ts";
import {getCorporateTypeLabel} from "../../../utils/corporateOffer.ts";
import AdminUserBonusCardsModal from "./AdminUserBonusCardsModal.tsx";

const ROLE_OPTIONS: { value: Exclude<UserRole, "admin">, label: string, icon: string }[] = [
    { value: "user", label: "Клієнт", icon: "mdi:account-outline" },
    { value: "company", label: "Компанія", icon: "mdi:office-building-outline" },
];

function getRoleLabel(role: UserRole) {
    if (role === "admin") return "Адмін";
    return ROLE_OPTIONS.find((option) => option.value === role)?.label ?? role;
}

function getInitials(name: string, surname: string) {
    const first = name.trim().charAt(0).toUpperCase();
    const last = surname.trim().charAt(0).toUpperCase();
    return `${first}${last}` || "?";
}

function formatRegisteredAt(dateStr: string) {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

function UserAdminCard({
    user,
    currentUserUuid,
    onRoleChange,
    onOpenBonusCards,
    onDeleteUser,
    isUpdating,
    isDeleting,
}: {
    user: AdminUserListItem,
    currentUserUuid: string,
    onRoleChange: (uuid: string, role: UserRole) => void,
    onOpenBonusCards: (user: AdminUserListItem) => void,
    onDeleteUser: (user: AdminUserListItem) => void,
    isUpdating: boolean,
    isDeleting: boolean,
}) {
    const isSelf = user.uuid === currentUserUuid;

    return (
        <article className={`user__admin-card user__admin-card--${user.role}`}>
            <div className="user__admin-card-glow" aria-hidden="true"/>
            <button
                type="button"
                className="user__admin-delete-icon"
                onClick={() => onDeleteUser(user)}
                disabled={isSelf || isDeleting}
                aria-label={isSelf ? "Не можна видалити себе" : "Видалити клієнта"}
                title={isSelf ? "Не можна видалити себе" : "Видалити клієнта"}
            >
                <Icon icon="mdi:trash-can-outline" width={22}/>
            </button>
            <div className="user__admin-card-top">
                <div className="user__admin-card-avatar">{getInitials(user.name, user.surname)}</div>
                <div className="user__admin-card-identity">
                    <h3 className="user__admin-card-name">{user.name} {user.surname}</h3>
                    <span className={`user__admin-card-badge user__admin-card-badge--${user.role}`}>
                        {getRoleLabel(user.role)}
                    </span>
                </div>
            </div>

            <div className="user__admin-card-contacts">
                <span className="user__admin-chip">
                    <Icon icon="mdi:email-outline" width={15}/>
                    {user.email}
                </span>
                <span className="user__admin-chip">
                    <Icon icon="mdi:phone-outline" width={15}/>
                    {user.phone}
                </span>
                {user.city_name && (
                    <span className="user__admin-chip">
                        <Icon icon="mdi:map-marker-outline" width={15}/>
                        {user.city_name}
                    </span>
                )}
                {user.company_type && (
                    <span className="user__admin-chip">
                        <Icon icon="mdi:store-outline" width={15}/>
                        {getCorporateTypeLabel(user.company_type)}
                    </span>
                )}
                {user.company_name && (
                    <span className="user__admin-chip">
                        <Icon icon="mdi:briefcase-outline" width={15}/>
                        {user.company_name}
                    </span>
                )}
                <span className="user__admin-chip user__admin-chip--registered">
                    <Icon icon="mdi:calendar-account-outline" width={15}/>
                    Зареєстровано: {formatRegisteredAt(user.created_at)}
                </span>
            </div>

            <div className="user__admin-card-metrics">
                <div className="user__admin-metric">
                    <Icon icon="mdi:silverware-fork-knife" width={20} className="user__admin-metric-icon"/>
                    <div>
                        <span className="user__admin-metric-label">Витрачено</span>
                        <strong>{user.total_spent.toLocaleString("uk-UA")} ₴</strong>
                    </div>
                </div>
                <div className="user__admin-metric">
                    <Icon icon="mdi:cart-outline" width={20} className="user__admin-metric-icon"/>
                    <div>
                        <span className="user__admin-metric-label">Замовлень</span>
                        <strong>{user.orders_count}</strong>
                    </div>
                </div>
                <div className="user__admin-metric">
                    <Icon icon="mdi:gift-outline" width={20} className="user__admin-metric-icon"/>
                    <div>
                        <span className="user__admin-metric-label">Бонусів</span>
                        <strong>{user.bonuses.toLocaleString("uk-UA")}</strong>
                    </div>
                </div>
            </div>

            <button
                type="button"
                className="user__admin-bonus-btn"
                onClick={() => onOpenBonusCards(user)}
            >
                <Icon icon="mdi:cards-outline" width={20}/>
                Бонусні картки
            </button>

            <div className="user__admin-card-footer">
                <p className="user__admin-card-footer-label">Змінити роль</p>
                <div className="user__admin-role-pills" role="group" aria-label="Роль користувача">
                    {ROLE_OPTIONS.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            className={`user__admin-role-pill${user.role === option.value ? " user__admin-role-pill--active" : ""}`}
                            disabled={isSelf || isUpdating}
                            onClick={() => onRoleChange(user.uuid, option.value)}
                        >
                            <Icon icon={option.icon} width={16}/>
                            {option.label}
                        </button>
                    ))}
                </div>
                {isSelf && (
                    <p className="user__admin-role-hint">Не можна змінити власну роль</p>
                )}
            </div>
        </article>
    );
}

type UserAudience = "regular" | "company";

function isCompanyUser(user: AdminUserListItem) {
    return user.role === "company";
}

function isVisibleInPanel(user: AdminUserListItem) {
    return user.role !== "admin";
}

export default function UserAdminPanel({ currentUserUuid }: { currentUserUuid: string }) {
    const { data: users = [], isLoading, isFetching, error } = useGetAllUsersQuery();
    const [updateRole, { isLoading: isUpdating }] = useUpdateUserRoleMutation();
    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserByAdminMutation();
    const [bonusCardsUser, setBonusCardsUser] = useState<AdminUserListItem | null>(null);
    const [audience, setAudience] = useState<UserAudience>("regular");

    const filteredUsers = users.filter((user) => {
        if (!isVisibleInPanel(user)) return false;
        return audience === "company" ? isCompanyUser(user) : user.role === "user";
    });

    const handleRoleChange = async (uuid: string, role: UserRole) => {
        try {
            await updateRole({ uuid, role }).unwrap();
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteUser = async (user: AdminUserListItem) => {
        if (user.uuid === currentUserUuid) return;
        const confirmed = window.confirm(
            `Видалити користувача ${user.name} ${user.surname}? Цю дію не можна скасувати.`,
        );
        if (!confirmed) return;

        try {
            await deleteUser(user.uuid).unwrap();
            if (bonusCardsUser?.uuid === user.uuid) {
                setBonusCardsUser(null);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <section className="user__admin user__admin--standalone" id="users">
            <div className="user__admin-head">
                <div>
                    <h2 className="user__admin-title">Користувачі</h2>
                    <p className="user__admin-subtitle">
                        Перегляд клієнтів, контактних даних, витрат на страви та керування ролями
                    </p>
                </div>
                <div className="user__admin-audience" role="group" aria-label="Тип користувачів">
                    <button
                        type="button"
                        className={`user__admin-audience-btn${audience === "regular" ? " user__admin-audience-btn--active" : ""}`}
                        onClick={() => setAudience("regular")}
                    >
                        <Icon icon="mdi:account-outline" width={18}/>
                        Звичайні
                    </button>
                    <button
                        type="button"
                        className={`user__admin-audience-btn${audience === "company" ? " user__admin-audience-btn--active" : ""}`}
                        onClick={() => setAudience("company")}
                    >
                        <Icon icon="mdi:office-building-outline" width={18}/>
                        Юр. особи
                    </button>
                </div>
            </div>

            {(isLoading || isFetching) && (
                <p className="user__admin-empty">Завантаження користувачів...</p>
            )}

            {error && (
                <p className="user__admin-empty user__admin-empty--error">
                    Не вдалося завантажити список користувачів
                </p>
            )}

            {!isLoading && !isFetching && !error && users.length === 0 && (
                <p className="user__admin-empty">Користувачів поки немає</p>
            )}

            {!isLoading && !isFetching && !error && users.length > 0 && filteredUsers.length === 0 && (
                <p className="user__admin-empty">
                    {audience === "company"
                        ? "Юридичних осіб поки немає"
                        : "Звичайних користувачів поки немає"}
                </p>
            )}

            {!isLoading && !isFetching && filteredUsers.length > 0 && (
                <div className="user__admin-grid">
                    {filteredUsers.map((user) => (
                        <UserAdminCard
                            key={user.uuid}
                            user={user}
                            currentUserUuid={currentUserUuid}
                            onRoleChange={handleRoleChange}
                            onOpenBonusCards={setBonusCardsUser}
                            onDeleteUser={handleDeleteUser}
                            isUpdating={isUpdating}
                            isDeleting={isDeleting}
                        />
                    ))}
                </div>
            )}

            {bonusCardsUser && (
                <AdminUserBonusCardsModal
                    user={bonusCardsUser}
                    onClose={() => setBonusCardsUser(null)}
                />
            )}
        </section>
    );
}
