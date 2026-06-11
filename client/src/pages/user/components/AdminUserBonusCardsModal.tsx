import {FormEvent, useState} from "react";
import {Icon} from "@iconify/react";
import {
    useAddBonusCardMutation,
    useDeleteBonusCardMutation,
    useGetBonusCardsByUserQuery,
} from "../../../redux/api/usersApi.ts";
import {BonusCard} from "../../../redux/types/bonusCards.ts";
import {AdminUserListItem} from "../../../redux/types/adminUsers.ts";

function formatActiveUntil(dateStr: string) {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

function getDefaultActiveUntil() {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    return date.toISOString().slice(0, 10);
}

function getCardStatus(card: BonusCard) {
    const notExpired = new Date(card.active_until).getTime() >= Date.now();
    if (card.is_active && notExpired) return "Активна";
    if (!card.is_active) return "Використана";
    return "Прострочена";
}

type AdminUserBonusCardsModalProps = {
    user: AdminUserListItem,
    onClose: () => void,
}

export default function AdminUserBonusCardsModal({ user, onClose }: AdminUserBonusCardsModalProps) {
    const { data: cards = [], isLoading, isFetching } = useGetBonusCardsByUserQuery(user.uuid);
    const [addCard, { isLoading: isAdding }] = useAddBonusCardMutation();
    const [deleteCard, { isLoading: isDeleting }] = useDeleteBonusCardMutation();
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        name: "",
        amount: "",
        description: "",
        active_until: getDefaultActiveUntil(),
    });

    const handleAdd = async (e: FormEvent) => {
        e.preventDefault();
        const amount = Number(form.amount);
        if (!form.name.trim() || !form.description.trim() || amount <= 0) return;

        try {
            const activeUntil = new Date(`${form.active_until}T23:59:59`).toISOString();
            await addCard({
                userUuid: user.uuid,
                name: form.name.trim(),
                amount,
                description: form.description.trim(),
                active_until: activeUntil,
            }).unwrap();
            setForm({ name: "", amount: "", description: "", active_until: getDefaultActiveUntil() });
            setShowForm(false);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (cardUuid: string) => {
        if (!window.confirm("Видалити цю бонусну картку?")) return;
        try {
            await deleteCard(cardUuid).unwrap();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="user__admin-modal-backdrop">
            <div
                className="user__admin-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="adminBonusModalTitle"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="user__admin-modal-header">
                    <div>
                        <h2 id="adminBonusModalTitle" className="user__admin-modal-title">
                            Бонусні картки
                        </h2>
                        <p className="user__admin-modal-subtitle">
                            {user.name} {user.surname} · {user.email}
                        </p>
                    </div>
                    <button type="button" className="user__admin-modal-close" onClick={onClose} aria-label="Закрити">
                        <Icon icon="ic:round-close" width={26}/>
                    </button>
                </div>

                <div className="user__admin-modal-toolbar">
                    <button
                        type="button"
                        className="user__admin-modal-add-btn"
                        onClick={() => setShowForm((prev) => !prev)}
                    >
                        <Icon icon="mdi:plus" width={20}/>
                        {showForm ? "Скасувати" : "Додати картку"}
                    </button>
                </div>

                {showForm && (
                    <form className="user__admin-card-form" onSubmit={handleAdd}>
                        <div className="user__admin-card-form-row">
                            <label>
                                Назва
                                <input
                                    value={form.name}
                                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                                    placeholder="Святкова картка"
                                    required
                                />
                            </label>
                            <label>
                                Сума (₴)
                                <input
                                    type="number"
                                    min={1}
                                    value={form.amount}
                                    onChange={(e) => setForm((p) => ({ ...p, amount: e.target.value }))}
                                    placeholder="100"
                                    required
                                />
                            </label>
                        </div>
                        <label>
                            Опис
                            <input
                                value={form.description}
                                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                                placeholder="Опис картки для користувача"
                                required
                            />
                        </label>
                        <label>
                            Дійсна до
                            <input
                                type="date"
                                value={form.active_until}
                                onChange={(e) => setForm((p) => ({ ...p, active_until: e.target.value }))}
                                required
                            />
                        </label>
                        <button type="submit" className="user__admin-card-form-submit" disabled={isAdding}>
                            {isAdding ? "Додавання..." : "Створити картку"}
                        </button>
                    </form>
                )}

                <div className="user__admin-modal-list">
                    {(isLoading || isFetching) && (
                        <p className="user__admin-modal-empty">Завантаження...</p>
                    )}

                    {!isLoading && !isFetching && cards.length === 0 && (
                        <p className="user__admin-modal-empty">У користувача немає бонусних карток</p>
                    )}

                    {!isLoading && !isFetching && cards.map((card) => (
                        <article key={card.uuid} className="user__admin-modal-card">
                            <div className="user__admin-modal-card-main">
                                <div className="user__admin-modal-card-top">
                                    <h3>{card.name}</h3>
                                    <span className="user__admin-modal-card-status">{getCardStatus(card)}</span>
                                </div>
                                <p className="user__admin-modal-card-amount">
                                    {card.amount.toLocaleString("uk-UA")} ₴
                                </p>
                                <p className="user__admin-modal-card-desc">{card.description}</p>
                                <p className="user__admin-modal-card-date">
                                    <Icon icon="mdi:calendar-clock" width={16}/>
                                    до {formatActiveUntil(card.active_until)}
                                </p>
                            </div>
                            <button
                                type="button"
                                className="user__admin-modal-card-delete"
                                onClick={() => handleDelete(card.uuid)}
                                disabled={isDeleting}
                                aria-label="Видалити картку"
                            >
                                <Icon icon="mdi:trash-can-outline" width={22}/>
                            </button>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
