import {useMemo} from "react";
import {Link} from "react-router-dom";
import {Icon} from "@iconify/react";
import {useAllDishesQuery} from "../../../redux/api/dishesApi.ts";
import {Dish} from "../../../redux/types/dishes.ts";
import {
    filterCorporateRecommendedDishes,
    getCorporateOfferBadgeLabel,
    getCorporateTypeLabel,
    isCorporateClient,
} from "../../../utils/corporateOffer.ts";

type CorporateUser = {
    company_type?: string | null;
    company_name?: string | null;
    role?: string;
};

function formatWeight(weight: number): string {
    return `(${weight}/10г)`;
}

function formatPrice(price: number): string {
    return `${price} грн`;
}

function formatWholesaleMinQty(minQty: number | null | undefined): string {
    if (minQty != null && minQty > 1) {
        return `від ${minQty} шт`;
    }
    return "—";
}

function CorporatePriceList({dishes, user}: { dishes: Dish[], user: CorporateUser }) {
    const sortedDishes = useMemo(
        () => [...dishes].sort((a, b) => a.name.localeCompare(b.name, "uk")),
        [dishes],
    );

    return (
        <div className="user__price-list">
            <div className="user__price-list-scroll">
                <table className="user__price-list-table">
                    <thead>
                        <tr>
                            <th scope="col">№</th>
                            <th scope="col">Страва</th>
                            <th scope="col">Вага</th>
                            <th scope="col">Роздріб</th>
                            <th scope="col">Опт від</th>
                            <th scope="col">Ціна опт</th>
                            <th scope="col" aria-label="Дія"/>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedDishes.map((dish, index) => {
                            const badge = getCorporateOfferBadgeLabel(dish, user);
                            const wholesalePrice = dish.wholesale_price ?? null;

                            return (
                                <tr key={dish.uuid} className="user__price-list-row">
                                    <td className="user__price-list-num">{index + 1}</td>
                                    <td className="user__price-list-name">
                                        <Link to={`/dish/${dish.uuid}`} className="user__price-list-link">
                                            {dish.name}
                                        </Link>
                                        {badge && (
                                            <span className="user__price-list-badge">{badge}</span>
                                        )}
                                    </td>
                                    <td className="user__price-list-weight">{formatWeight(dish.weight)}</td>
                                    <td className="user__price-list-retail">{formatPrice(dish.price)}</td>
                                    <td className="user__price-list-min">
                                        {formatWholesaleMinQty(dish.wholesale_min_qty)}
                                    </td>
                                    <td className="user__price-list-wholesale">
                                        {wholesalePrice != null ? formatPrice(wholesalePrice) : "—"}
                                    </td>
                                    <td className="user__price-list-action">
                                        <Link
                                            to={`/dish/${dish.uuid}`}
                                            className="user__price-list-go"
                                            aria-label={`Переглянути ${dish.name}`}
                                        >
                                            <Icon icon="mdi:arrow-right" width={18}/>
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <p className="user__price-list-note">
                Оптова ціна застосовується автоматично при досягненні мінімальної кількості в кошику.
            </p>
        </div>
    );
}

export default function UserCorporateRecommendations({user}: { user: CorporateUser }) {
    const {data: dishes = [], isLoading} = useAllDishesQuery(undefined, {
        skip: !isCorporateClient(user),
    });

    const recommendedDishes = useMemo(
        () => filterCorporateRecommendedDishes(dishes, user),
        [dishes, user],
    );

    if (!isCorporateClient(user)) return null;

    const typeLabel = getCorporateTypeLabel(user.company_type);

    return (
        <div id="recommendations" className="user__recommendations">
            <h1 className="user__recommendations-title">Ми рекомендуємо</h1>

            {isLoading ? (
                <p className="user__recommendations-text">Завантаження пропозицій...</p>
            ) : recommendedDishes.length === 0 ? (
                <>
                    <p className="user__recommendations-text">
                        Поки немає спеціальних пропозицій та оптових цін для типу закладу «{typeLabel}».
                        Загляньте в меню пізніше — нові акції з&apos;являться тут автоматично.
                    </p>
                    <Link to="/">
                        <button type="button" className="user__info-button--favorites">
                            Перейти до меню
                        </button>
                    </Link>
                </>
            ) : (
                <>
                    <p className="user__recommendations-text">
                        Прайс-лист акцій та оптових цін для «{typeLabel}» — оберіть страву та замовляйте зі знижкою.
                    </p>
                    <CorporatePriceList dishes={recommendedDishes} user={user}/>
                </>
            )}
        </div>
    );
}
