import {FormEvent, useEffect, useMemo, useState} from "react";
import {Icon} from "@iconify/react";
import {
    useDeleteAdminOrderMutation,
    useGetAllOrdersQuery,
    useUpdateOrderStatusMutation,
} from "../../../redux/api/ordersApi.ts";
import {Order, OrderStatus} from "../../../redux/types/orders.ts";
import getImage from "../../../utils/getImage.ts";
import {getCorporateTypeLabel, isCorporateOrderUser} from "../../../utils/corporateOffer.ts";

const STATUSES_HIDDEN_FROM_ALL: OrderStatus[] = ["cancelled", "delivered"];

const STATUS_FILTERS: { value: "all" | OrderStatus, label: string }[] = [
    { value: "all", label: "Усі" },
    { value: "processing", label: "Нові" },
    { value: "confirmed", label: "Підтверджені" },
    { value: "preparing", label: "Готуються" },
    { value: "packing", label: "Пакуються" },
    { value: "delivering", label: "Доставляються" },
    { value: "delivered", label: "Завершені" },
    { value: "cancelled", label: "Скасовані" },
];

const STATUS_OPTIONS: { value: OrderStatus, label: string }[] = [
    { value: "processing", label: "Нове" },
    { value: "confirmed", label: "Підтверджено" },
    { value: "preparing", label: "Готується" },
    { value: "packing", label: "Пакується" },
    { value: "delivering", label: "Доставляється" },
    { value: "delivered", label: "Завершено" },
    { value: "cancelled", label: "Скасовано" },
];

function formatOrderDate(dateStr: string) {
    const date = new Date(dateStr);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${hours}:${minutes} ${day}.${month}.${year}`;
}

function formatPaymentMethod(method: string) {
    if (method === "card") return "Картка";
    if (method === "cash") return "Готівка";
    if (method.startsWith("bonus_card:")) return "Бонусна картка";
    return method;
}

function getStatusLabel(status: string) {
    return STATUS_OPTIONS.find((item) => item.value === status)?.label ?? status;
}

function getStatusClass(status: string) {
    if (status === "delivered") return "user__order-admin-status--done";
    if (status === "cancelled") return "user__order-admin-status--cancel";
    if (status === "processing") return "user__order-admin-status--new";
    return "user__order-admin-status--progress";
}

function getCustomerInitials(order: Order) {
    if (!order.users) return "??";
    const first = order.users.name?.trim().charAt(0).toUpperCase() ?? "";
    const last = order.users.surname?.trim().charAt(0).toUpperCase() ?? "";
    return `${first}${last}` || "??";
}

function getCustomerName(order: Order) {
    return order.users
        ? `${order.users.name} ${order.users.surname}`.trim()
        : "Клієнт";
}

function getDishesCount(order: Order) {
    return order.order_dish.reduce((sum, item) => sum + item.count, 0);
}

function resolveImageSrc(imageUrl: string) {
    return imageUrl.startsWith("http") ? imageUrl : getImage(imageUrl);
}

function AdminOrderCard({
    order,
    orderNumber,
}: {
    order: Order,
    orderNumber: string,
}) {
    const [updateStatus, { isLoading }] = useUpdateOrderStatusMutation();
    const [deleteOrder, { isLoading: isDeleting }] = useDeleteAdminOrderMutation();
    const [status, setStatus] = useState<OrderStatus>(order.status as OrderStatus);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        setStatus(order.status as OrderStatus);
        setSaved(false);
    }, [order]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await updateStatus({ uuid: order.uuid, status }).unwrap();
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (err) {
            console.log(err);
        }
    };

    const handleComplete = async () => {
        try {
            await updateStatus({ uuid: order.uuid, status: "delivered" }).unwrap();
            setStatus("delivered");
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm(`Видалити замовлення №${orderNumber}?`)) return;
        try {
            await deleteOrder(order.uuid).unwrap();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form
            className={`user__admin-card user__admin-card--order user__admin-card--order-${order.status}`}
            onSubmit={handleSubmit}
        >
            <div className="user__admin-card-glow" aria-hidden="true"/>
            <button
                type="button"
                className="user__admin-delete-icon"
                onClick={handleDelete}
                disabled={isDeleting}
                aria-label="Видалити замовлення"
                title="Видалити замовлення"
            >
                <Icon icon="mdi:trash-can-outline" width={22}/>
            </button>

            <div className="user__admin-card-top">
                <div className="user__admin-card-avatar">{getCustomerInitials(order)}</div>
                <div className="user__admin-card-identity">
                    <h3 className="user__admin-card-name">Замовлення №{orderNumber}</h3>
                    <span className={`user__admin-card-badge user__order-admin-status ${getStatusClass(order.status)}`}>
                        {getStatusLabel(order.status)}
                    </span>
                </div>
            </div>

            <div className="user__admin-card-contacts">
                <span className="user__admin-chip">
                    <Icon icon="mdi:account-outline" width={16}/>
                    {getCustomerName(order)}
                </span>
                {isCorporateOrderUser(order.users) && (
                    <>
                        <span className="user__admin-chip user__admin-chip--corporate">
                            <Icon icon="mdi:domain" width={16}/>
                            {order.users?.company_name || "Юридична особа"}
                        </span>
                        {order.users?.company_type && (
                            <span className="user__admin-chip user__admin-chip--corporate">
                                <Icon icon="mdi:tag-outline" width={16}/>
                                {getCorporateTypeLabel(order.users.company_type)}
                            </span>
                        )}
                    </>
                )}
                <span className="user__admin-chip">
                    <Icon icon="mdi:phone-outline" width={16}/>
                    {order.users?.phone ?? "—"}
                </span>
                <span className="user__admin-chip">
                    <Icon icon="mdi:email-outline" width={16}/>
                    {order.users?.email ?? "—"}
                </span>
                <span className="user__admin-chip">
                    <Icon icon="mdi:credit-card-outline" width={16}/>
                    {formatPaymentMethod(order.payment_method)}
                </span>
                <span className="user__admin-chip">
                    <Icon icon="mdi:map-marker-outline" width={16}/>
                    {order.delivery_address}
                </span>
                <span className="user__admin-chip user__admin-chip--registered">
                    <Icon icon="mdi:calendar-clock-outline" width={16}/>
                    {formatOrderDate(order.created_at)}
                </span>
            </div>

            <div className="user__admin-card-metrics">
                <div className="user__admin-metric">
                    <Icon icon="mdi:cash-multiple" width={22} className="user__admin-metric-icon"/>
                    <div>
                        <span className="user__admin-metric-label">Сума</span>
                        <strong>{order.total_price.toLocaleString("uk-UA")} ₴</strong>
                    </div>
                </div>
                <div className="user__admin-metric">
                    <Icon icon="mdi:food-outline" width={22} className="user__admin-metric-icon"/>
                    <div>
                        <span className="user__admin-metric-label">Страв</span>
                        <strong>{getDishesCount(order)}</strong>
                    </div>
                </div>
                <div className="user__admin-metric">
                    <Icon icon="mdi:package-variant-closed" width={22} className="user__admin-metric-icon"/>
                    <div>
                        <span className="user__admin-metric-label">Позицій</span>
                        <strong>{order.order_dish.length}</strong>
                    </div>
                </div>
            </div>

            <div className="user__order-admin-dishes">
                {order.order_dish.map((item) => {
                    const image = item.dishes?.dish_images?.[0]?.image_url;
                    return (
                        <div key={item.uuid} className="user__order-admin-dish">
                            {image ? (
                                <img
                                    src={resolveImageSrc(image)}
                                    alt={item.dishes.name}
                                    className="user__order-admin-dish-image"
                                />
                            ) : (
                                <div className="user__order-admin-dish-image user__order-admin-dish-image--empty">
                                    <Icon icon="mdi:food" width={24}/>
                                </div>
                            )}
                            <div className="user__order-admin-dish-info">
                                <p className="user__order-admin-dish-name">{item.dishes?.name ?? "Страва"}</p>
                                <p className="user__order-admin-dish-meta">
                                    {item.count} × {item.dishes?.price ?? 0} ₴
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="user__admin-card-footer">
                <p className="user__admin-card-footer-label">Статус замовлення</p>
                <select
                    className="user__order-status-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as OrderStatus)}
                >
                    {STATUS_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <div className="user__admin-role-pills user__order-action-pills">
                    {order.status !== "delivered" && order.status !== "cancelled" && (
                        <button
                            type="button"
                            className="user__admin-role-pill user__order-complete-pill"
                            onClick={handleComplete}
                            disabled={isLoading}
                        >
                            <Icon icon="mdi:check-circle-outline" width={18}/>
                            Завершити
                        </button>
                    )}
                    <button
                        type="submit"
                        className={`user__admin-role-pill${saved ? " user__admin-role-pill--active" : ""}`}
                        disabled={isLoading}
                    >
                        <Icon icon="mdi:content-save-outline" width={18}/>
                        {isLoading ? "..." : saved ? "Збережено" : "Зберегти статус"}
                    </button>
                </div>
            </div>
        </form>
    );
}

type UserOrderManagerProps = {
    variant?: "retail" | "corporate",
};

export default function UserOrderManager({ variant = "retail" }: UserOrderManagerProps) {
    const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all");
    const { data: orders = [], isLoading, isFetching } = useGetAllOrdersQuery(undefined);
    const isCorporateView = variant === "corporate";

    const scopedOrders = useMemo(
        () => orders.filter((order) => {
            const corporate = isCorporateOrderUser(order.users);
            return isCorporateView ? corporate : !corporate;
        }),
        [orders, isCorporateView],
    );

    const visibleOrders = useMemo(
        () => scopedOrders.filter((order) => !STATUSES_HIDDEN_FROM_ALL.includes(order.status as OrderStatus)),
        [scopedOrders],
    );

    const sortedOrders = useMemo(() => {
        const filtered = statusFilter === "all"
            ? visibleOrders
            : scopedOrders.filter((order) => order.status === statusFilter);
        return [...filtered].sort(
            (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
    }, [scopedOrders, statusFilter, visibleOrders]);

    const counts = useMemo(() => {
        const map = new Map<string, number>();
        for (const order of scopedOrders) {
            map.set(order.status, (map.get(order.status) ?? 0) + 1);
        }
        return map;
    }, [scopedOrders]);

    return (
        <section
            className="user__admin user__admin--standalone"
            id={isCorporateView ? "corporate-order-management" : "order-management"}
        >
            <h2 className="user__admin-title">{isCorporateView ? "Юр. замовлення" : "Замовлення"}</h2>
            <p className="user__admin-subtitle">
                {isCorporateView
                    ? "Замовлення від юридичних осіб: оптові ціни, доставка за адресою закладу"
                    : "Замовлення від звичайних клієнтів — статуси та доставка"}
            </p>

            <div className="user__order-admin-filters">
                {STATUS_FILTERS.map((filter) => {
                    const count = filter.value === "all"
                        ? visibleOrders.length
                        : counts.get(filter.value) ?? 0;
                    return (
                        <button
                            key={filter.value}
                            type="button"
                            className={`user__order-admin-filter${statusFilter === filter.value ? " user__order-admin-filter--active" : ""}`}
                            onClick={() => setStatusFilter(filter.value)}
                        >
                            {filter.label}
                            <span className="user__order-admin-filter-count">{count}</span>
                        </button>
                    );
                })}
            </div>

            {(isLoading || isFetching) && (
                <p className="user__admin-empty">Завантаження замовлень...</p>
            )}

            {!isLoading && sortedOrders.length === 0 && (
                <p className="user__admin-empty">Замовлень у цій категорії немає</p>
            )}

            {!isLoading && sortedOrders.length > 0 && (
                <div className="user__admin-grid user__admin-grid--flow">
                    {sortedOrders.map((order, index) => (
                        <AdminOrderCard
                            key={order.uuid}
                            order={order}
                            orderNumber={(sortedOrders.length - index).toString().padStart(3, "0")}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
