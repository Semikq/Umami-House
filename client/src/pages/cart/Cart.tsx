import {closeAuth, closeCart, openAuth, openCart} from "../../redux/slices/uiSlice.ts";
import {updateUserProfile} from "../../redux/slices/authSlice.ts";
import {clearCart} from "../../redux/slices/cartSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {Icon} from "@iconify/react";
import CartListDishes from "./components/CartListDishes.tsx";
import CartCheckout, {PaymentMethod} from "./components/CartCheckout.tsx";
import OrderSuccessModal from "./components/OrderSuccessModal.tsx";
import {useAddOrderMutation} from "../../redux/api/ordersApi.ts";
import {useGetActiveBonusCardsByUserQuery} from "../../redux/api/usersApi.ts";
import {useRestaurantsByCityQuery, useRestaurantsQuery} from "../../redux/api/restaurantsApi.ts";
import {Restaurants} from "../../redux/types/restaurants.ts";
import {useNavigate} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {getMaxSpendableBonuses, getOrderPricing} from "../../utils/loyalty.ts";
import {
    CorporateDeliveryAddress,
    formatCorporateDeliveryAddress,
    isCorporateClient,
} from "../../utils/corporateOffer.ts";
import "./cart.css"

const EMPTY_CORPORATE_DELIVERY: CorporateDeliveryAddress = {
    streetAddress: "",
    exactLocation: "",
    responsiblePerson: "",
    contactPhone: "",
    deliveryDate: "",
};

function CartTotalPrice({
    totalPrice,
    bonusesSpent = 0,
    bonusCardAmount = 0,
    skipLoyaltyBenefits = false,
}: {
    totalPrice: number,
    bonusesSpent?: number,
    bonusCardAmount?: number,
    skipLoyaltyBenefits?: boolean,
}) {
    const { discountPercent, originalPrice, payable, bonusCardDiscount } =
        getOrderPricing(totalPrice, bonusesSpent, bonusCardAmount, { skipLoyaltyBenefits });
    const hasDiscount = (!skipLoyaltyBenefits && (discountPercent > 0 || bonusesSpent > 0))
        || bonusCardDiscount > 0;

    if (!hasDiscount) {
        return (
            <p className="footer__controls-totalPrice">
                {totalPrice.toLocaleString("uk-UA")} <Icon icon="mdi:currency-uah"/>
            </p>
        );
    }

    return (
        <div className="footer__controls-prices">
            <span className="footer__controls-oldPrice">
                {originalPrice.toLocaleString("uk-UA")} <Icon icon="mdi:currency-uah"/>
            </span>
            <p className="footer__controls-totalPrice">
                {payable.toLocaleString("uk-UA")} <Icon icon="mdi:currency-uah"/>
            </p>
        </div>
    );
}

function getPaymentMethodValue(method: PaymentMethod) {
    return method === "cash" ? "cash" : "card";
}

function getDeliveryAddress(
    isPickup: boolean,
    deliveryAddress: string,
    selectedRestaurant: Restaurants | undefined,
) {
    if (isPickup && selectedRestaurant) {
        return `Самовивіз: ${selectedRestaurant.name}, ${selectedRestaurant.address}`;
    }

    return deliveryAddress.trim();
}

function validateCheckout(
    isCorporate: boolean,
    isPickup: boolean,
    deliveryAddress: string,
    corporateDelivery: CorporateDeliveryAddress,
    selectedRestaurantUuid: string,
    method: PaymentMethod | null,
    cardNumber: string,
    cardExpiry: string,
    cardCvv: string,
) {
    if (isCorporate) {
        if (!corporateDelivery.streetAddress.trim()) return "Введіть адресу (вулицю)";
        if (!corporateDelivery.exactLocation.trim()) return "Введіть точну локацію";
        if (!corporateDelivery.responsiblePerson.trim()) return "Вкажіть особу, яка приймає";
        if (!corporateDelivery.contactPhone.trim()) return "Введіть номер телефону";
        if (!corporateDelivery.deliveryDate.trim()) return "Оберіть дату доставки";
    } else if (isPickup) {
        if (!selectedRestaurantUuid) return "Оберіть ресторан для самовивозу";
    } else if (!deliveryAddress.trim()) {
        return "Введіть адресу доставки";
    }

    if (!method) return "Оберіть спосіб оплати";

    if (method === "card") {
        const digits = cardNumber.replace(/\s/g, "");
        if (digits.length !== 16) return "Введіть коректний 16-значний номер картки";

        const expiryDigits = cardExpiry.replace(/\D/g, "");
        if (expiryDigits.length !== 4) return "Введіть термін дії картки (ММ/РР)";
        const month = Number(expiryDigits.slice(0, 2));
        if (month < 1 || month > 12) return "Некоректний місяць у терміні дії";

        if (cardCvv.length !== 3) return "Введіть 3-значний CVV код";
    }

    return "";
}

function RenderCartBloc(){
    const dispatch = useDispatch()
    const cartDishes = useSelector(state => state.cart)
    const user = useSelector(state => state.auth.user)
    const userCity = useSelector(state => state.userCity)
    const navigator = useNavigate()
    const [addOrder, { isLoading }] = useAddOrderMutation()
    const [checkoutStep, setCheckoutStep] = useState<"cart" | "checkout">("cart")
    const [isPickup, setIsPickup] = useState(false)
    const [deliveryAddress, setDeliveryAddress] = useState("")
    const [corporateDelivery, setCorporateDelivery] = useState<CorporateDeliveryAddress>(EMPTY_CORPORATE_DELIVERY)
    const [selectedRestaurantUuid, setSelectedRestaurantUuid] = useState("")
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)
    const [cardNumber, setCardNumber] = useState("")
    const [cardExpiry, setCardExpiry] = useState("")
    const [cardCvv, setCardCvv] = useState("")
    const [selectedBonusCardUuid, setSelectedBonusCardUuid] = useState("")
    const [checkoutError, setCheckoutError] = useState("")
    const [bonusesSpent, setBonusesSpent] = useState(0)
    const [showSuccess, setShowSuccess] = useState(false)
    const [authRequiredForCheckout, setAuthRequiredForCheckout] = useState(false)

    useEffect(() => {
        const scrollY = window.scrollY;
        const { style } = document.body;

        style.position = "fixed";
        style.top = `-${scrollY}px`;
        style.left = "0";
        style.right = "0";
        style.width = "100%";
        style.overflow = "hidden";

        return () => {
            style.position = "";
            style.top = "";
            style.left = "";
            style.right = "";
            style.width = "";
            style.overflow = "";
            window.scrollTo(0, scrollY);
        };
    }, []);

    const { data: cityRestaurants = [], isLoading: cityRestaurantsLoading } = useRestaurantsByCityQuery(
        userCity.uuid,
        { skip: !userCity.uuid },
    )
    const { data: allRestaurants = [], isLoading: allRestaurantsLoading } = useRestaurantsQuery(
        undefined,
        { skip: Boolean(userCity.uuid) },
    )

    const restaurants = useMemo(
        () => (userCity.uuid ? cityRestaurants : allRestaurants).filter((restaurant) => restaurant.active),
        [userCity.uuid, cityRestaurants, allRestaurants],
    )
    const restaurantsLoading = userCity.uuid ? cityRestaurantsLoading : allRestaurantsLoading
    const selectedRestaurant = restaurants.find((restaurant) => restaurant.uuid === selectedRestaurantUuid)

    const isCartEmpty = cartDishes.dishes.length === 0
    const corporateUser = isCorporateClient(user)
    const availableBonuses = user?.bonuses ?? 0
    const maxSpendableBonuses = useMemo(
        () => getMaxSpendableBonuses(cartDishes.totalPrice, availableBonuses),
        [cartDishes.totalPrice, availableBonuses],
    )
    const { data: activeBonusCards = [] } = useGetActiveBonusCardsByUserQuery(user?.uuid ?? "", {
        skip: !user?.uuid || checkoutStep !== "checkout",
        refetchOnMountOrArgChange: true,
    });

    const bonusCardAmount = useMemo(() => {
        if (!selectedBonusCardUuid) return 0;
        return activeBonusCards.find((card) => card.uuid === selectedBonusCardUuid)?.amount ?? 0;
    }, [selectedBonusCardUuid, activeBonusCards]);

    const orderPricing = useMemo(
        () => getOrderPricing(
            cartDishes.totalPrice,
            corporateUser ? 0 : bonusesSpent,
            bonusCardAmount,
            { skipLoyaltyBenefits: corporateUser },
        ),
        [cartDishes.totalPrice, bonusesSpent, bonusCardAmount, corporateUser],
    )

    useEffect(() => {
        if (corporateUser) {
            setIsPickup(false)
            setBonusesSpent(0)
        }
    }, [corporateUser])

    useEffect(() => {
        if (!corporateUser || !user) return;

        const fullName = [user.name, user.surname].filter(Boolean).join(" ").trim();
        if (!fullName) return;

        setCorporateDelivery((prev) => ({
            ...prev,
            responsiblePerson: prev.responsiblePerson || fullName,
            contactPhone: prev.contactPhone || user.phone?.trim() || "",
        }));
    }, [corporateUser, user]);

    useEffect(() => {
        if (bonusesSpent > maxSpendableBonuses) {
            setBonusesSpent(maxSpendableBonuses)
        }
    }, [bonusesSpent, maxSpendableBonuses])

    useEffect(() => {
        if (selectedBonusCardUuid && !activeBonusCards.some((card) => card.uuid === selectedBonusCardUuid)) {
            setSelectedBonusCardUuid("")
        }
    }, [activeBonusCards, selectedBonusCardUuid])

    useEffect(() => {
        if (!selectedRestaurantUuid && restaurants.length > 0) {
            setSelectedRestaurantUuid(restaurants[0].uuid)
        }
    }, [restaurants, selectedRestaurantUuid])

    useEffect(() => {
        if (!authRequiredForCheckout || !user?.uuid) return

        setAuthRequiredForCheckout(false)
        dispatch(closeAuth())
        setCheckoutError("")
        setCheckoutStep("checkout")
    }, [authRequiredForCheckout, user?.uuid, dispatch])

    const resetCheckoutState = () => {
        setCheckoutStep("cart")
        setIsPickup(false)
        setDeliveryAddress("")
        setCorporateDelivery(EMPTY_CORPORATE_DELIVERY)
        setSelectedRestaurantUuid(restaurants[0]?.uuid ?? "")
        setPaymentMethod(null)
        setCardNumber("")
        setCardExpiry("")
        setCardCvv("")
        setSelectedBonusCardUuid("")
        setBonusesSpent(0)
        setCheckoutError("")
    }

    const handleStartCheckout = () => {
        if (isCartEmpty) return

        if (!user?.uuid) {
            setAuthRequiredForCheckout(true)
            dispatch(openCart())
            dispatch(openAuth())
            return
        }

        dispatch(closeAuth())
        setCheckoutError("")
        setCheckoutStep("checkout")
    }

    const handleConfirmOrder = async () => {
        const error = validateCheckout(
            corporateUser,
            isPickup,
            deliveryAddress,
            corporateDelivery,
            selectedRestaurantUuid,
            paymentMethod,
            cardNumber,
            cardExpiry,
            cardCvv,
        )

        if (error) {
            setCheckoutError(error)
            return
        }

        if (!user?.uuid || !paymentMethod) return

        try {
            const result = await addOrder({
                user_uuid: user.uuid,
                delivery_address: corporateUser
                    ? formatCorporateDeliveryAddress(corporateDelivery)
                    : getDeliveryAddress(isPickup, deliveryAddress, selectedRestaurant),
                payment_method: getPaymentMethodValue(paymentMethod),
                dishes: cartDishes.dishes,
                total_price: orderPricing.payable,
                bonuses_spent: corporateUser ? 0 : orderPricing.bonusesSpent,
                bonus_card_uuid: selectedBonusCardUuid || undefined,
            }).unwrap()

            if (result.data?.bonuses !== undefined) {
                dispatch(updateUserProfile({ bonuses: result.data.bonuses }))
            }

            dispatch(clearCart())
            setShowSuccess(true)
        } catch (err) {
            console.log(err)
            setCheckoutError("Не вдалося оформити замовлення. Спробуйте ще раз.")
        }
    }

    const handleCloseSuccess = () => {
        setShowSuccess(false)
        resetCheckoutState()
        dispatch(closeCart())
    }

    const handleGoToProfile = () => {
        setShowSuccess(false)
        resetCheckoutState()
        dispatch(closeCart())
        navigator("/user")
    }

    const handleBackToCart = () => {
        setCheckoutStep("cart")
        setCheckoutError("")
    }

    return (
        <>
            <div
                className="cart-backdrop"
                onWheel={(e) => e.preventDefault()}
                onTouchMove={(e) => {
                    if (e.target === e.currentTarget) e.preventDefault();
                }}
            >
                <div className="cart" onClick={(e) => e.stopPropagation()}>
                    <div className="cart__header">
                        <h1 className="cart__header-title">
                            {checkoutStep === "checkout" ? "Оформлення замовлення" : "Кошик"}
                        </h1>
                        <button type="button" className="cart__header-icon" onClick={() => dispatch(closeCart())} aria-label="Закрити кошик">
                            <Icon icon="ic:round-close"/>
                        </button>
                    </div>

                    {checkoutStep === "cart" ? (
                        <CartListDishes cartDishes={cartDishes}/>
                    ) : (
                        <div className="cart__body cart__body--checkout">
                            <div className="cart__dishes-fixed">
                                <CartListDishes cartDishes={cartDishes} variant="checkout"/>
                            </div>
                            <div className="cart__checkout-scroll">
                                <CartCheckout
                                    isCorporateClient={corporateUser}
                                    isPickup={isPickup}
                                    onPickupChange={(value) => {
                                        setIsPickup(value)
                                        setCheckoutError("")
                                    }}
                                    deliveryAddress={deliveryAddress}
                                    onDeliveryAddressChange={setDeliveryAddress}
                                    corporateDelivery={corporateDelivery}
                                    onCorporateDeliveryChange={(field, value) => {
                                        setCorporateDelivery((prev) => ({ ...prev, [field]: value }))
                                        setCheckoutError("")
                                    }}
                                    selectedRestaurantUuid={selectedRestaurantUuid}
                                    onRestaurantChange={setSelectedRestaurantUuid}
                                    restaurants={restaurants}
                                    restaurantsLoading={restaurantsLoading}
                                    paymentMethod={paymentMethod}
                                    onSelectPayment={(method) => {
                                        setPaymentMethod(method)
                                        setCheckoutError("")
                                    }}
                                    cardNumber={cardNumber}
                                    onCardChange={setCardNumber}
                                    cardExpiry={cardExpiry}
                                    onCardExpiryChange={setCardExpiry}
                                    cardCvv={cardCvv}
                                    onCardCvvChange={setCardCvv}
                                    userUuid={user?.uuid ?? ""}
                                    selectedBonusCardUuid={selectedBonusCardUuid}
                                    onSelectBonusCard={setSelectedBonusCardUuid}
                                    totalPrice={cartDishes.totalPrice}
                                    availableBonuses={availableBonuses}
                                    bonusesSpent={bonusesSpent}
                                    onBonusesSpentChange={setBonusesSpent}
                                    maxSpendableBonuses={maxSpendableBonuses}
                                    error={checkoutError}
                                />
                            </div>
                        </div>
                    )}

                    <div className="cart__footer">
                        {checkoutStep === "cart" ? (
                            <>
                                <button type="button" className="footer__button-continue" onClick={() => dispatch(closeCart())}>
                                    Продовжити покупки
                                </button>
                                <div className="footer__controls">
                                    <div className="controls__totalPrice-bloc">
                                        <p className="controls__totalPrice-text">Разом</p>
                                        <CartTotalPrice totalPrice={cartDishes.totalPrice}/>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleStartCheckout}
                                        className="footer__controls-button"
                                        disabled={isCartEmpty}
                                    >
                                        Оформити замовлення
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <button type="button" className="footer__button-continue" onClick={handleBackToCart}>
                                    Назад
                                </button>
                                <div className="footer__controls">
                                    <div className="controls__totalPrice-bloc">
                                        <p className="controls__totalPrice-text">Разом</p>
                                        <CartTotalPrice
                                            totalPrice={cartDishes.totalPrice}
                                            bonusesSpent={corporateUser ? 0 : bonusesSpent}
                                            bonusCardAmount={bonusCardAmount}
                                            skipLoyaltyBenefits={corporateUser}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleConfirmOrder}
                                        className="footer__controls-button"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Оформлення..." : "Підтвердити"}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {showSuccess && (
                <OrderSuccessModal
                    onClose={handleCloseSuccess}
                    onGoToProfile={handleGoToProfile}
                />
            )}
        </>
    )
}

export default function CreateCartBloc(){
    return (
        <RenderCartBloc/>
    )
}
