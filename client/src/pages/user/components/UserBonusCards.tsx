import {useState} from "react";
import {Icon} from "@iconify/react";
import {useGetBonusCardsByUserQuery} from "../../../redux/api/usersApi.ts";
import {BonusCard} from "../../../redux/types/bonusCards.ts";

function formatActiveUntil(dateStr: string) {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

function getCardStatus(card: BonusCard) {
    const notExpired = new Date(card.active_until).getTime() >= Date.now();

    if (card.is_active && notExpired) {
        return { active: true, label: "Активна" };
    }

    if (!card.is_active) {
        return { active: false, label: "Використана" };
    }

    return { active: false, label: "Прострочена" };
}

function BonusCardItem({ card }: { card: BonusCard }) {
    const { active, label } = getCardStatus(card);

    return (
        <article className={`user__wallet-card${active ? "" : " user__wallet-card--expired"}`}>
            <div className="user__wallet-card-top">
                <span className="user__wallet-card-badge">
                    <Icon icon="mdi:gift-outline" width={18} height={18}/>
                    Бонусна картка
                </span>
                <span className={`user__wallet-card-status${active ? " user__wallet-card-status--active" : ""}`}>
                    {label}
                </span>
            </div>
            <h3 className="user__wallet-card-name">{card.name}</h3>
            <p className="user__wallet-card-amount">
                {card.amount.toLocaleString("uk-UA")}
                <span>₴</span>
            </p>
            <p className="user__wallet-card-description">{card.description}</p>
            <p className="user__wallet-card-expiry">
                <Icon icon="mdi:calendar-clock" width={18} height={18}/>
                Дійсна до {formatActiveUntil(card.active_until)}
            </p>
        </article>
    );
}

type UserBonusCardsProps = {
    bonuses: number,
    userUuid: string,
    hideBonusBalance?: boolean,
}

export default function UserBonusCards({ bonuses, userUuid, hideBonusBalance = false }: UserBonusCardsProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: bonusCards = [], isLoading, isFetching } = useGetBonusCardsByUserQuery(userUuid, {
        skip: !isModalOpen || !userUuid,
        refetchOnMountOrArgChange: true,
    });

    return (
        <>
            <aside className="user__bonus-panel" aria-label={hideBonusBalance ? "Бонусні картки" : "Бонусна програма"}>
                {!hideBonusBalance && (
                    <div className="user__bonus-main">
                        <div className="user__bonus-main-glow" aria-hidden="true"/>
                        <div className="user__bonus-main-content">
                            <div className="user__bonus-main-top">
                                <span className="user__bonus-main-icon" aria-hidden="true">
                                    <Icon icon="mdi:gift-outline" width={28} height={28}/>
                                </span>
                                <p className="user__bonus-main-label">Бонусний рахунок</p>
                            </div>
                            <p className="user__bonus-main-value">
                                {bonuses.toLocaleString("uk-UA")}
                                <span>бонусів</span>
                            </p>
                            <p className="user__bonus-main-hint">1 бонус = 1 ₴ знижки при оформленні</p>
                        </div>
                    </div>
                )}

                {hideBonusBalance && (
                    <div className="user__bonus-cards-only">
                        <span className="user__bonus-cards-only-icon" aria-hidden="true">
                            <Icon icon="mdi:cards-outline" width={28} height={28}/>
                        </span>
                        <p className="user__bonus-cards-only-title">Бонусні картки</p>
                        <p className="user__bonus-cards-only-hint">Переглядайте та використовуйте картки при оформленні</p>
                    </div>
                )}

                <button
                    type="button"
                    className="user__bonus-open-btn"
                    onClick={() => setIsModalOpen(true)}
                >
                    <Icon icon="mdi:cards-outline" width={22} height={22}/>
                    Переглянути бонусні картки
                </button>
            </aside>

            {isModalOpen && (
                <div className="user__bonus-modal-backdrop">
                    <div
                        className="user__bonus-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="userBonusModalTitle"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="user__bonus-modal-header">
                            <h2 id="userBonusModalTitle" className="user__bonus-modal-title">Бонусні картки</h2>
                            <button
                                type="button"
                                className="user__bonus-modal-close"
                                onClick={() => setIsModalOpen(false)}
                                aria-label="Закрити"
                            >
                                <Icon icon="ic:round-close" width={26} height={26}/>
                            </button>
                        </div>

                        <div className="user__bonus-modal-list">
                            {(isLoading || isFetching) && (
                                <p className="user__bonus-modal-empty">Завантаження карток...</p>
                            )}

                            {!isLoading && !isFetching && bonusCards.length === 0 && (
                                <p className="user__bonus-modal-empty">У вас поки немає бонусних карток</p>
                            )}

                            {!isLoading && !isFetching && bonusCards.map((card) => (
                                <BonusCardItem key={card.uuid} card={card}/>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
