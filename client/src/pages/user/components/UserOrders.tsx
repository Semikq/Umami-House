import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Icon} from "@iconify/react";
import {useGetOrdersByUserQuery} from "../../../redux/api/ordersApi.ts";
import {Dish} from "../../../redux/types/dishes.ts";
import {Order} from "../../../redux/types/orders.ts";
import DishCardList from "../../../components/dishCard/DishCardList.tsx";
import {addOrderDishes, clearCart} from "../../../redux/slices/cartSlice.ts";
import {openCart} from "../../../redux/slices/uiSlice.ts";

const ORDER_STATUS_LABELS: Record<string, string> = {
    processing: "Нове",
    confirmed: "Підтверджено",
    preparing: "Готується",
    packing: "Пакується",
    delivering: "Доставляється",
    delivered: "Завершено",
    cancelled: "Скасовано",
};

function getOrderStatusLabel(status: string) {
    return ORDER_STATUS_LABELS[status] ?? status;
}

function getOrderStatusClass(status: string) {
    if (status === "delivered") return "user__order-status--done";
    if (status === "cancelled") return "user__order-status--cancel";
    if (status === "processing") return "user__order-status--new";
    return "user__order-status--progress";
}

function formatOrderDate(dateStr: string) {
    const date = new Date(dateStr);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${hours}:${minutes} ${day}/${month}/${year}`;
}

function getOrderDishes(order: Order) {
    return order.order_dish
        .filter((item) => item.dishes?.dish_images?.length)
        .map((item) => ({ ...item.dishes, count: item.count } as Dish & { count: number }));
}

function getOrderCurrentTotal(dishes: (Dish & { count: number })[]) {
    return dishes.reduce((sum, dish) => sum + dish.price * dish.count, 0);
}

function OrderItem({ order, orderNumber }: { order: Order, orderNumber: string }) {
    const dispatch = useDispatch();
    const dishes = getOrderDishes(order);
    const currentTotal = getOrderCurrentTotal(dishes);
    const availableDishes = dishes.filter((dish) => dish.active);

    const handleRepeatOrder = () => {
        if (availableDishes.length === 0) return;

        dispatch(clearCart());
        dispatch(addOrderDishes(availableDishes));
        dispatch(openCart());
    };

    return (
        <article className="user__order-item">
            <div className="user__order-meta-wrap">
                <div className="user__order-meta-row">
                    <p className="user__order-meta">
                        Замовлення №{orderNumber} ~ {formatOrderDate(order.created_at)}
                    </p>
                    <span className={`user__order-status ${getOrderStatusClass(order.status)}`}>
                        {getOrderStatusLabel(order.status)}
                    </span>
                </div>
                <div className="user__order-meta-end">
                    <button
                        type="button"
                        className="user__order-repeat-btn"
                        onClick={handleRepeatOrder}
                        disabled={availableDishes.length === 0}
                        title={availableDishes.length === 0 ? "Страви зараз недоступні" : "Додати страви в кошик"}
                    >
                        <Icon icon="mdi:cart-arrow-right" width={20} height={20}/>
                        Повторити замовлення
                    </button>
                    <p className="user__order-total">
                        {currentTotal.toLocaleString("uk-UA")} ₴
                    </p>
                </div>
            </div>
            <DishCardList dishes={dishes} layout="horizontal"/>
        </article>
    );
}

export default function UserOrders({ userUuid }: { userUuid: string }) {
    const { data: orders = [], isLoading } = useGetOrdersByUserQuery(userUuid);
    const sortedOrders = [...orders].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );

    if (isLoading) return null;

    return (
        <div id="orders" className="user__pastOrders">
            <h1 className="user__pastOrders-title">Ваші минулі замовлення!</h1>

            {sortedOrders.length === 0 ? (
                <>
                    <p className="user__pastOrders-text">
                        Ви ще нічого не замовляли.<br/>
                        Пропонуємо прямо зараз обрати смачні та якісні страви й насолодитися улюбленими смаками!
                    </p>
                    <Link to="/">
                        <button type="button" className="user__info-button--order">Замовити смачненького!</button>
                    </Link>
                </>
            ) : (
                <>
                    <p className="user__pastOrders-text user__pastOrders-text--filled">
                        Приємного перегляду! Сподіваємося, що ви ще раз замовите замовлення,<br/>
                        яке вам сподобалося найбільше!
                    </p>
                    <div className="user__orders-list">
                        {sortedOrders.map((order, index) => (
                            <OrderItem
                                key={order.uuid}
                                order={order}
                                orderNumber={(sortedOrders.length - index).toString().padStart(2, "0")}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
