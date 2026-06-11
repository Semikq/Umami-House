import {Icon} from "@iconify/react";
import {Restaurants} from "../../../redux/types/restaurants.ts";
import {getLoyaltyPricing, getOrderPricing} from "../../../utils/loyalty.ts";
import {useGetActiveBonusCardsByUserQuery} from "../../../redux/api/usersApi.ts";
import {BonusCard} from "../../../redux/types/bonusCards.ts";
import {CorporateDeliveryAddress} from "../../../utils/corporateOffer.ts";

export type PaymentMethod = "cash" | "card";

type CartCheckoutProps = {
    isCorporateClient: boolean,
    isPickup: boolean,
    onPickupChange: (value: boolean) => void,
    deliveryAddress: string,
    onDeliveryAddressChange: (value: string) => void,
    corporateDelivery: CorporateDeliveryAddress,
    onCorporateDeliveryChange: (field: keyof CorporateDeliveryAddress, value: string) => void,
    selectedRestaurantUuid: string,
    onRestaurantChange: (value: string) => void,
    restaurants: Restaurants[],
    restaurantsLoading: boolean,
    paymentMethod: PaymentMethod | null,
    onSelectPayment: (method: PaymentMethod) => void,
    cardNumber: string,
    onCardChange: (value: string) => void,
    cardExpiry: string,
    onCardExpiryChange: (value: string) => void,
    cardCvv: string,
    onCardCvvChange: (value: string) => void,
    userUuid: string,
    selectedBonusCardUuid: string,
    onSelectBonusCard: (uuid: string) => void,
    totalPrice: number,
    availableBonuses: number,
    bonusesSpent: number,
    onBonusesSpentChange: (value: number) => void,
    maxSpendableBonuses: number,
    error: string,
}

const paymentOptions: { id: PaymentMethod, label: string, icon: string }[] = [
    { id: "cash", label: "Готівкою", icon: "mdi:cash" },
    { id: "card", label: "Карткою", icon: "mdi:credit-card-outline" },
]

function formatCardNumber(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

function formatCardExpiry(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function formatCardDate(dateStr: string) {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

function BonusCardMini({
    card,
    selected,
    onSelect,
}: {
    card: BonusCard,
    selected: boolean,
    onSelect: () => void,
}) {
    return (
        <button
            type="button"
            className={`cart__bonus-mini${selected ? " cart__bonus-mini--selected" : ""}`}
            onClick={onSelect}
        >
            <span className="cart__bonus-mini-badge">
                <Icon icon="mdi:gift-outline" width={16} height={16}/>
            </span>
            <span className="cart__bonus-mini-name">{card.name}</span>
            <span className="cart__bonus-mini-amount">{card.amount.toLocaleString("uk-UA")} ₴</span>
            <span className="cart__bonus-mini-date">до {formatCardDate(card.active_until)}</span>
        </button>
    );
}

export default function CartCheckout({
    isCorporateClient,
    isPickup,
    onPickupChange,
    deliveryAddress,
    onDeliveryAddressChange,
    corporateDelivery,
    onCorporateDeliveryChange,
    selectedRestaurantUuid,
    onRestaurantChange,
    restaurants,
    restaurantsLoading,
    paymentMethod,
    onSelectPayment,
    cardNumber,
    onCardChange,
    cardExpiry,
    onCardExpiryChange,
    cardCvv,
    onCardCvvChange,
    userUuid,
    selectedBonusCardUuid,
    onSelectBonusCard,
    totalPrice,
    availableBonuses,
    bonusesSpent,
    onBonusesSpentChange,
    maxSpendableBonuses,
    error,
}: CartCheckoutProps) {
    const { data: bonusCards = [], isLoading: bonusCardsLoading } = useGetActiveBonusCardsByUserQuery(
        userUuid,
        { skip: !userUuid, refetchOnMountOrArgChange: true },
    );

    const selectedCard = bonusCards.find((card) => card.uuid === selectedBonusCardUuid);
    const bonusCardAmount = selectedCard ? selectedCard.amount : 0;

    const {
        discountPercent,
        discountAmount,
        originalPrice,
        bonusesSpent: appliedBonuses,
        bonusCardDiscount,
        payable,
    } = getOrderPricing(totalPrice, bonusesSpent, bonusCardAmount, {
        skipLoyaltyBenefits: isCorporateClient,
    });

    return (
        <div className="cart__checkout">
            <section className="cart__checkout-section">
                <h2 className="cart__checkout-title">Отримання замовлення</h2>

                {isCorporateClient ? (
                    <div className="cart__checkout-address-grid">
                        <div className="cart__checkout-field cart__checkout-field--full">
                            <label className="cart__checkout-field-label" htmlFor="corpStreetAddress">Адреса (вулиця)</label>
                            <input
                                id="corpStreetAddress"
                                className="cart__checkout-input"
                                type="text"
                                placeholder="Назва вулиці, будинок"
                                value={corporateDelivery.streetAddress}
                                onChange={(e) => onCorporateDeliveryChange("streetAddress", e.target.value)}
                            />
                        </div>
                        <div className="cart__checkout-field cart__checkout-field--full">
                            <label className="cart__checkout-field-label" htmlFor="corpExactLocation">Точна локація</label>
                            <input
                                id="corpExactLocation"
                                className="cart__checkout-input"
                                type="text"
                                placeholder="Напр.: готель «X», корпус B, ресепшн"
                                value={corporateDelivery.exactLocation}
                                onChange={(e) => onCorporateDeliveryChange("exactLocation", e.target.value)}
                            />
                        </div>
                        <div className="cart__checkout-field cart__checkout-field--full">
                            <label className="cart__checkout-field-label" htmlFor="corpResponsiblePerson">Особа, яка приймає</label>
                            <input
                                id="corpResponsiblePerson"
                                className="cart__checkout-input"
                                type="text"
                                placeholder="ПІБ контактної особи"
                                value={corporateDelivery.responsiblePerson}
                                onChange={(e) => onCorporateDeliveryChange("responsiblePerson", e.target.value)}
                            />
                        </div>
                        <div className="cart__checkout-field cart__checkout-field--full">
                            <label className="cart__checkout-field-label" htmlFor="corpContactPhone">Номер телефону</label>
                            <input
                                id="corpContactPhone"
                                className="cart__checkout-input"
                                type="tel"
                                inputMode="tel"
                                autoComplete="tel"
                                placeholder="+380 XX XXX XX XX"
                                value={corporateDelivery.contactPhone}
                                onChange={(e) => onCorporateDeliveryChange("contactPhone", e.target.value)}
                            />
                        </div>
                        <div className="cart__checkout-field cart__checkout-field--full">
                            <label className="cart__checkout-field-label" htmlFor="corpDeliveryDate">Дата доставки</label>
                            <input
                                id="corpDeliveryDate"
                                className="cart__checkout-input"
                                type="date"
                                min={new Date().toISOString().slice(0, 10)}
                                value={corporateDelivery.deliveryDate}
                                onChange={(e) => onCorporateDeliveryChange("deliveryDate", e.target.value)}
                            />
                        </div>
                    </div>
                ) : (
                    <>
                        <label className="cart__pickup-toggle">
                            <span className={`cart__pickup-label${!isPickup ? " cart__pickup-label--active" : ""}`}>Доставка</span>
                            <button
                                type="button"
                                className={`cart__pickup-switch${isPickup ? " cart__pickup-switch--on" : ""}`}
                                role="switch"
                                aria-checked={isPickup}
                                onClick={() => onPickupChange(!isPickup)}
                            >
                                <span className="cart__pickup-switch-thumb"/>
                            </button>
                            <span className={`cart__pickup-label${isPickup ? " cart__pickup-label--active" : ""}`}>Самовивіз у ресторані</span>
                        </label>

                        {isPickup ? (
                            <div className="cart__checkout-field">
                                <label className="cart__checkout-field-label" htmlFor="restaurantSelect">Ресторан</label>
                                <select
                                    id="restaurantSelect"
                                    className="cart__checkout-select"
                                    value={selectedRestaurantUuid}
                                    onChange={(e) => onRestaurantChange(e.target.value)}
                                    disabled={restaurantsLoading || restaurants.length === 0}
                                >
                                    {restaurants.length === 0 ? (
                                        <option value="">Немає доступних ресторанів</option>
                                    ) : (
                                        restaurants.map((restaurant) => (
                                            <option key={restaurant.uuid} value={restaurant.uuid}>
                                                {restaurant.name} — {restaurant.address}
                                            </option>
                                        ))
                                    )}
                                </select>
                            </div>
                        ) : (
                            <div className="cart__checkout-field">
                                <label className="cart__checkout-field-label" htmlFor="deliveryAddress">Адреса доставки</label>
                                <input
                                    id="deliveryAddress"
                                    className="cart__checkout-input"
                                    type="text"
                                    placeholder="Вулиця, будинок, квартира"
                                    value={deliveryAddress}
                                    onChange={(e) => onDeliveryAddressChange(e.target.value)}
                                />
                            </div>
                        )}
                    </>
                )}
            </section>

            <section className="cart__checkout-section">
                <h2 className="cart__checkout-title">Спосіб оплати</h2>

                <div className="cart__payment-options">
                    {paymentOptions.map((option) => (
                        <label
                            key={option.id}
                            className={`cart__payment-option${paymentMethod === option.id ? " cart__payment-option--active" : ""}`}
                        >
                            <input
                                type="radio"
                                name="paymentMethod"
                                value={option.id}
                                checked={paymentMethod === option.id}
                                onChange={() => onSelectPayment(option.id)}
                            />
                            <Icon icon={option.icon} className="cart__payment-option-icon"/>
                            <span className="cart__payment-option-label">{option.label}</span>
                        </label>
                    ))}
                </div>

                {paymentMethod === "card" && (
                    <div className="cart__card-fields">
                        <div className="cart__checkout-field">
                            <label className="cart__checkout-field-label" htmlFor="cardNumber">Номер картки</label>
                            <input
                                id="cardNumber"
                                className="cart__checkout-input"
                                type="text"
                                inputMode="numeric"
                                autoComplete="cc-number"
                                placeholder="0000 0000 0000 0000"
                                value={cardNumber}
                                onChange={(e) => onCardChange(formatCardNumber(e.target.value))}
                            />
                        </div>
                        <div className="cart__card-row">
                            <div className="cart__checkout-field">
                                <label className="cart__checkout-field-label" htmlFor="cardExpiry">Термін дії</label>
                                <input
                                    id="cardExpiry"
                                    className="cart__checkout-input"
                                    type="text"
                                    inputMode="numeric"
                                    autoComplete="cc-exp"
                                    placeholder="ММ/РР"
                                    maxLength={5}
                                    value={cardExpiry}
                                    onChange={(e) => onCardExpiryChange(formatCardExpiry(e.target.value))}
                                />
                            </div>
                            <div className="cart__checkout-field">
                                <label className="cart__checkout-field-label" htmlFor="cardCvv">CVV</label>
                                <input
                                    id="cardCvv"
                                    className="cart__checkout-input"
                                    type="password"
                                    inputMode="numeric"
                                    autoComplete="cc-csc"
                                    placeholder="123"
                                    maxLength={3}
                                    value={cardCvv}
                                    onChange={(e) => onCardCvvChange(e.target.value.replace(/\D/g, "").slice(0, 3))}
                                />
                            </div>
                        </div>
                    </div>
                )}

            </section>

            {!isCorporateClient && availableBonuses > 0 && maxSpendableBonuses > 0 && (
                <section className="cart__checkout-section">
                    <h2 className="cart__checkout-title">Витратити бонуси</h2>
                    <div className="cart__bonuses-spend">
                        <div className="cart__bonuses-spend-header">
                            <p className="cart__bonuses-spend-available">
                                Доступно: {availableBonuses.toLocaleString("uk-UA")} бонусів
                            </p>
                            <p className="cart__bonuses-spend-value">
                                −{appliedBonuses.toLocaleString("uk-UA")} ₴
                            </p>
                        </div>
                        <input
                            type="range"
                            className="cart__bonuses-slider"
                            min={0}
                            max={maxSpendableBonuses}
                            step={1}
                            value={appliedBonuses}
                            onChange={(e) => onBonusesSpentChange(Number(e.target.value))}
                            aria-label="Кількість бонусів для списання"
                        />
                        <div className="cart__bonuses-slider-labels">
                            <span>0</span>
                            <span>{maxSpendableBonuses.toLocaleString("uk-UA")}</span>
                        </div>
                        <p className="cart__checkout-hint">1 бонус = 1 ₴ знижки на замовлення</p>
                    </div>
                </section>
            )}

            {(bonusCardsLoading || bonusCards.length > 0) && (
                <section className="cart__checkout-section">
                    <h2 className="cart__checkout-title">Бонусна картка</h2>
                    <div className="cart__bonus-cards-pick">
                        {bonusCardsLoading && (
                            <p className="cart__checkout-hint">Завантаження карток...</p>
                        )}

                        {!bonusCardsLoading && bonusCards.length > 0 && (
                            <>
                                <p className="cart__checkout-hint">Оберіть картку для знижки на замовлення</p>
                                <div className="cart__bonus-mini-grid">
                                    {bonusCards.map((card) => (
                                        <BonusCardMini
                                            key={card.uuid}
                                            card={card}
                                            selected={selectedBonusCardUuid === card.uuid}
                                            onSelect={() => onSelectBonusCard(
                                                selectedBonusCardUuid === card.uuid ? "" : card.uuid,
                                            )}
                                        />
                                    ))}
                                </div>
                            </>
                        )}

                        {selectedCard && selectedCard.amount > (
                            isCorporateClient ? totalPrice : getLoyaltyPricing(totalPrice).finalPrice
                        ) - appliedBonuses && (
                            <p className="cart__checkout-hint cart__checkout-hint--warning">
                                Картка на {selectedCard.amount.toLocaleString("uk-UA")} ₴ буде повністю використана та деактивована
                            </p>
                        )}
                    </div>
                </section>
            )}

            <section className="cart__checkout-summary">
                {!isCorporateClient && discountPercent > 0 && (
                    <div className="cart__checkout-summary-row cart__checkout-summary-row--discount">
                        <span>Знижка лояльності</span>
                        <span>−{discountAmount.toLocaleString("uk-UA")} ₴ ({discountPercent}%)</span>
                    </div>
                )}
                {!isCorporateClient && appliedBonuses > 0 && (
                    <div className="cart__checkout-summary-row cart__checkout-summary-row--bonuses">
                        <span>Списано бонусів</span>
                        <span>−{appliedBonuses.toLocaleString("uk-UA")} ₴</span>
                    </div>
                )}
                {bonusCardDiscount > 0 && (
                    <div className="cart__checkout-summary-row cart__checkout-summary-row--bonuses">
                        <span>Бонусна картка</span>
                        <span>−{bonusCardDiscount.toLocaleString("uk-UA")} ₴</span>
                    </div>
                )}
                <div className="cart__checkout-summary-row cart__checkout-summary-row--total">
                    <span>Загальна сума кошика</span>
                    <div className="cart__checkout-prices">
                        {((!isCorporateClient && (discountPercent > 0 || appliedBonuses > 0)) || bonusCardDiscount > 0) && (
                            <span className="cart__checkout-summary-old">
                                {originalPrice.toLocaleString("uk-UA")} ₴
                            </span>
                        )}
                        <strong>{payable.toLocaleString("uk-UA")} ₴</strong>
                    </div>
                </div>
            </section>

            {error && <p className="cart__checkout-error">{error}</p>}
        </div>
    );
}
