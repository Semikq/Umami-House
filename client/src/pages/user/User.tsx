import {logOut, updateUserProfile} from "../../redux/slices/authSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {useLogoutMutation, useUpdateUserMutation} from "../../redux/api/usersApi.ts";
import {Icon} from "@iconify/react";
import {useLocation, useNavigate} from "react-router-dom";
import {FormEvent, useEffect, useState} from "react";
import PageLoader from "../../components/PageLoader/PageLoader.tsx";
import UserFavorites from "./components/UserFavorites.tsx";
import UserOrders from "./components/UserOrders.tsx";
import UserBonusCards from "./components/UserBonusCards.tsx";
import UserAdminPanel from "./components/UserAdminPanel.tsx";
import UserMenuManager from "./components/UserMenuManager.tsx";
import UserSaleManager from "./components/UserSaleManager.tsx";
import UserCityManager from "./components/UserCityManager.tsx";
import UserPartnerManager from "./components/UserPartnerManager.tsx";
import UserOrderManager from "./components/UserOrderManager.tsx";
import UserCorporateRecommendations from "./components/UserCorporateRecommendations.tsx";
import "./user.css"
import {CORPORATE_TYPE_OPTIONS, getCorporateTypeLabel, isCorporateClient} from "../../utils/corporateOffer.ts"

function getRoleTitle(user: { role: string; company_type?: string | null; company_name?: string | null }) {
    if (user.role === "admin") return "Адмін";
    if (isCorporateClient(user)) return "Компанія";
    return "Клієнт";
}

type ProfileForm = {
    surname: string,
    name: string,
    phone: string,
    email: string,
    company_type: string,
    company_name: string,
}

type UserCabinetView = "profile" | "orders" | "corporate-orders" | "users" | "menu" | "sales" | "cities" | "partners";

const ADMIN_NAV_ITEMS: {
    view: Exclude<UserCabinetView, "profile">,
    label: string,
    icon: string,
}[] = [
    { view: "orders", label: "Замовлення", icon: "mdi:clipboard-list-outline" },
    { view: "corporate-orders", label: "Юр. замовлення", icon: "mdi:domain" },
    { view: "users", label: "Користувачі", icon: "mdi:account-group-outline" },
    { view: "menu", label: "Меню", icon: "mdi:silverware-fork-knife" },
    { view: "sales", label: "Акції", icon: "mingcute:sale-line" },
    { view: "cities", label: "Міста", icon: "mdi:city-variant-outline" },
    { view: "partners", label: "Партнери", icon: "mdi:handshake-outline" },
];
type ProfileSection = "profile" | "orders" | "favorites" | "recommendations";

type ProfileFieldKey = keyof ProfileForm | "city" | "company_type" | "company_name";

function CreateBlocUser({
    user,
    isEditing,
    form,
    onChange
}: {
    user: {
        role?: string,
        bonuses?: number,
        cities?: { name: string } | null,
        company_type?: string | null,
        company_name?: string | null,
    },
    isEditing: boolean,
    form: ProfileForm,
    onChange: (field: keyof ProfileForm, value: string) => void,
}) {
    const corporateFields: { key: ProfileFieldKey, title: string, editable: boolean }[] = isCorporateClient(user)
        ? [
            { key: "company_type", title: "Тип закладу", editable: true },
            { key: "company_name", title: "Назва юридичної особи", editable: true },
        ]
        : [];

    const fields: { key: ProfileFieldKey, title: string, editable: boolean }[] = [
        ...corporateFields,
        { key: "surname", title: "Прізвище", editable: true },
        { key: "name", title: "Ім'я", editable: true },
        { key: "phone", title: "Номер телефону", editable: true },
        { key: "email", title: "E-mail", editable: true },
        { key: "city", title: "Місто", editable: false },
    ]

    return(
        <div className="user__info-details">
            {fields.map((item) => {
                const displayValue = item.key === "city"
                    ? user.cities?.name ?? "Не обрано"
                    : item.key === "company_type"
                        ? getCorporateTypeLabel(form.company_type || user.company_type)
                        : item.key === "company_name"
                            ? form.company_name || user.company_name || "—"
                            : form[item.key];

                return (
                    <div key={item.title} className="user__info-details--bloc">
                        <h3 className="info__details-bloc--title">{item.title}</h3>
                        {isEditing && item.editable && item.key === "company_type" ? (
                            <select
                                className="info__details-bloc--input"
                                value={form.company_type}
                                onChange={(e) => onChange("company_type", e.target.value)}
                            >
                                {CORPORATE_TYPE_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        ) : isEditing && item.editable ? (
                            <input
                                className="info__details-bloc--input"
                                value={displayValue}
                                onChange={(e) => onChange(item.key as keyof ProfileForm, e.target.value)}
                            />
                        ) : (
                            <p className="info__details-bloc--value">{displayValue}</p>
                        )}
                    </div>
                );
            })}
        </div>
    )
}

function RenderUserPage({ user }){
    const navigator = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const [logoutApi] = useLogoutMutation()
    const [updateUserApi, { isLoading: isSaving }] = useUpdateUserMutation()
    const isAdmin = user.role === "admin"
    const corporateUser = isCorporateClient(user)
    const [activeView, setActiveView] = useState<UserCabinetView>("profile")
    const [profileSection, setProfileSection] = useState<ProfileSection>("profile")
    const [isEditing, setIsEditing] = useState(false)
    const buildProfileForm = (): ProfileForm => ({
        surname: user.surname ?? "",
        name: user.name ?? "",
        phone: user.phone ?? "",
        email: user.email ?? "",
        company_type: user.company_type ?? CORPORATE_TYPE_OPTIONS[0].value,
        company_name: user.company_name ?? "",
    })

    const [form, setForm] = useState<ProfileForm>(() => buildProfileForm())

    useEffect(() => {
        if (location.hash === "#orders" && isAdmin) {
            setActiveView("orders")
            return
        }

        if (location.hash === "#corporate-orders" && isAdmin) {
            setActiveView("corporate-orders")
            return
        }

        if (location.hash === "#users" && isAdmin) {
            setActiveView("users")
            return
        }

        if (location.hash === "#menu" && isAdmin) {
            setActiveView("menu")
            return
        }

        if (location.hash === "#sales" && isAdmin) {
            setActiveView("sales")
            return
        }

        if (location.hash === "#cities" && isAdmin) {
            setActiveView("cities")
            return
        }

        if (location.hash === "#partners" && isAdmin) {
            setActiveView("partners")
            return
        }

        if (location.hash === "#profile") {
            setActiveView("profile")
            setProfileSection("profile")
            window.scrollTo({ top: 0, behavior: "smooth" })
            return
        }

        if (location.hash === "#favorites" && !isAdmin) {
            setActiveView("profile")
            setProfileSection("favorites")
            window.requestAnimationFrame(() => {
                document.getElementById("favorites")?.scrollIntoView({ behavior: "smooth", block: "start" })
            })
            return
        }

        if (location.hash === "#recommendations" && corporateUser && !isAdmin) {
            setActiveView("profile")
            setProfileSection("recommendations")
            window.scrollTo({ top: 0, behavior: "smooth" })
            return
        }

        if (location.hash === "#orders" && !isAdmin) {
            setActiveView("profile")
            setProfileSection("orders")
            window.requestAnimationFrame(() => {
                document.getElementById("orders")?.scrollIntoView({ behavior: "smooth", block: "start" })
            })
        }
    }, [location.pathname, location.hash, isAdmin, corporateUser])

    const scrollToClientSection = (sectionId: string) => {
        window.requestAnimationFrame(() => {
            document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" })
        })
    }

    const switchClientSection = (section: ProfileSection) => {
        setIsEditing(false)
        setActiveView("profile")
        setProfileSection(section)
        if (section === "orders") scrollToClientSection("orders")
        else if (section === "favorites") scrollToClientSection("favorites")
        else window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const openProfileView = () => {
        switchClientSection("profile")
    }

    const openOrderManager = () => {
        setActiveView("orders")
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const openCorporateOrderManager = () => {
        setActiveView("corporate-orders")
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const openAdminView = (view: Exclude<UserCabinetView, "profile">) => {
        if (view === "orders") openOrderManager()
        else if (view === "corporate-orders") openCorporateOrderManager()
        else if (view === "users") openUsersManager()
        else if (view === "menu") openMenuManager()
        else if (view === "sales") openSaleManager()
        else if (view === "cities") openCityManager()
        else if (view === "partners") openPartnerManager()
    }

    const openUsersManager = () => {
        setActiveView("users")
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const openOrdersSection = () => {
        switchClientSection("orders")
    }

    const openFavoritesSection = () => {
        switchClientSection("favorites")
    }

    const openRecommendationsSection = () => {
        switchClientSection("recommendations")
    }

    const openMenuManager = () => {
        setActiveView("menu")
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const openSaleManager = () => {
        setActiveView("sales")
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const openCityManager = () => {
        setActiveView("cities")
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const openPartnerManager = () => {
        setActiveView("partners")
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const handleFormChange = (field: keyof ProfileForm, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    const startEditing = () => {
        setForm(buildProfileForm())
        setIsEditing(true)
    }

    const cancelEditing = () => {
        setIsEditing(false)
        setForm(buildProfileForm())
    }

    const handleSave = async (e: FormEvent) => {
        e.preventDefault()
        if (!isEditing) return

        try {
            const result = await updateUserApi({
                uuid: user.uuid,
                email: form.email,
                name: form.name,
                surname: form.surname,
                phone: form.phone,
                company_type: form.company_type,
                company_name: form.company_name,
            }).unwrap()

            dispatch(updateUserProfile(result.data))
            setIsEditing(false)
        } catch (err) {
            console.log(err)
        }
    }

    const handleLogout = async () => {
        try {
            await logoutApi({}).unwrap()
            dispatch(logOut())
            navigator("/")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <main>
            <div className="user__select user__select--admin">
                <div className="user__select-admin-layout">
                    <div className="user__select-admin-top">
                        <div
                            className={`user__select-admin-profile user__select-block--clickable${
                                isAdmin
                                    ? activeView === "profile" ? " user__select-block--active" : ""
                                    : activeView === "profile" && profileSection === "profile" ? " user__select-block--active" : ""
                            }`}
                            onClick={openProfileView}
                        >
                            <Icon icon="solar:user-linear" width={36}/>
                            <div className="select__block-user">
                                <h2 className="select__block-title">{user.name} {user.surname}</h2>
                                <p className="select__block-mail">{user.email}</p>
                            </div>
                        </div>
                        <div className="user__select-exit" onClick={() => handleLogout()}>
                            <Icon icon="mingcute:exit-fill" width={26}/>
                            <h2 className="select__exit-button">Вийти</h2>
                        </div>
                    </div>
                    <nav className="user__select-admin-nav" aria-label={isAdmin ? "Адмін-навігація" : "Навігація профілю"}>
                        {isAdmin && <p className="user__select-admin-nav-title">Менеджмент</p>}
                        <div className="user__select-tab user__select-tab--admin">
                            {isAdmin ? (
                                ADMIN_NAV_ITEMS.map((item) => (
                                    <div
                                        key={item.view}
                                        className={`user__select-block user__select-block--clickable${activeView === item.view ? " user__select-block--active" : ""}`}
                                        onClick={() => openAdminView(item.view)}
                                    >
                                        <Icon icon={item.icon} width={24}/>
                                        <h2 className="select__block-title">{item.label}</h2>
                                    </div>
                                ))
                            ) : (
                                <>
                                    <div
                                        className={`user__select-block user__select-block--clickable${profileSection === "orders" ? " user__select-block--active" : ""}`}
                                        onClick={openOrdersSection}
                                    >
                                        <Icon icon="mdi:cart-outline" width={24}/>
                                        <h2 className="select__block-title">Історія замовлень</h2>
                                    </div>
                                    <div
                                        className={`user__select-block user__select-block--clickable${profileSection === "favorites" ? " user__select-block--active" : ""}`}
                                        onClick={openFavoritesSection}
                                    >
                                        <Icon icon="mdi:heart-outline" width={24}/>
                                        <h2 className="select__block-title">Улюблені страви</h2>
                                    </div>
                                    {corporateUser && (
                                        <div
                                            className={`user__select-block user__select-block--clickable${profileSection === "recommendations" ? " user__select-block--active" : ""}`}
                                            onClick={openRecommendationsSection}
                                        >
                                            <Icon icon="mdi:thumb-up-outline" width={24}/>
                                            <h2 className="select__block-title">Ми рекомендуємо</h2>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </nav>
                </div>
            </div>

            {activeView === "profile" && (isAdmin || profileSection !== "recommendations") && (
                <div className="user__profile-layout">
                    <div className="user__info">
                        <h1 className="user__info-role">{getRoleTitle(user)}</h1>
                        <h2 className="user__info-contactDetails">Контактні дані</h2>
                        {isEditing ? (
                            <form onSubmit={handleSave}>
                                <CreateBlocUser
                                    user={user}
                                    isEditing
                                    form={form}
                                    onChange={handleFormChange}
                                />
                                <div className="user__info-actions">
                                    <button type="submit" className="user__info-button--edit" disabled={isSaving}>
                                        {isSaving ? "Збереження..." : "Зберегти"}
                                    </button>
                                    <button type="button" className="user__info-button--cancel" onClick={cancelEditing}>
                                        Скасувати
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <CreateBlocUser
                                    user={user}
                                    isEditing={false}
                                    form={form}
                                    onChange={handleFormChange}
                                />
                                <button type="button" className="user__info-button--edit" onClick={startEditing}>
                                    Редагувати профіль
                                </button>
                            </>
                        )}
                    </div>
                    <UserBonusCards
                        bonuses={user.bonuses ?? 0}
                        userUuid={user.uuid}
                        hideBonusBalance={!isAdmin && corporateUser}
                    />
                </div>
            )}

            {activeView === "profile" && (isAdmin || profileSection !== "recommendations") && (
                <>
                    <UserOrders userUuid={user.uuid}/>
                    <UserFavorites userUuid={user.uuid}/>
                </>
            )}

            {!isAdmin && corporateUser && activeView === "profile" && profileSection === "recommendations" && (
                <UserCorporateRecommendations user={user}/>
            )}

            {activeView === "orders" && isAdmin && (
                <UserOrderManager variant="retail"/>
            )}

            {activeView === "corporate-orders" && isAdmin && (
                <UserOrderManager variant="corporate"/>
            )}

            {activeView === "users" && isAdmin && (
                <UserAdminPanel currentUserUuid={user.uuid}/>
            )}

            {activeView === "menu" && isAdmin && (
                <UserMenuManager/>
            )}

            {activeView === "sales" && isAdmin && (
                <UserSaleManager/>
            )}

            {activeView === "cities" && isAdmin && (
                <UserCityManager/>
            )}

            {activeView === "partners" && isAdmin && (
                <UserPartnerManager/>
            )}
        </main>
    )
}

export default function CreateUserPage(){
    const user = useSelector(state => state.auth.user)

    if (!user) return <PageLoader/>;

    return (
        <RenderUserPage user={user}/>
    )
}
