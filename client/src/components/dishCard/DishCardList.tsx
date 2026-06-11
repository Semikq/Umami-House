import {Link} from "react-router-dom";
import {Icon} from "@iconify/react";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addDish} from "../../redux/slices/cartSlice.ts";
import {showCart} from "../../redux/slices/uiSlice.ts";
import getImage from "../../utils/getImage.ts";
import {Dish} from "../../redux/types/dishes.ts";
import {
    getCorporateOfferBadgeLabel,
    getCorporateDishPrice,
    prepareCartDish,
} from "../../utils/corporateOffer.ts";
import "./dishCard.css";

type DishWithCount = Dish & { count?: number };

type AuthUser = { role?: string; company_type?: string | null; company_name?: string | null } | null;

function DishButton({dish, user}: { dish: DishWithCount, user: AuthUser }) {
    const quantity = dish.count ?? 1;
    const displayPrice = getCorporateDishPrice(dish, user, quantity);
    const [text, setText] = useState(`${displayPrice} грн`);
    const state = useSelector((state: { cart: { dishes: Dish[] } }) => state.cart);
    const dispatch = useDispatch();
    const isInCart = state.dishes.find((item) => item.uuid === dish.uuid);

    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                if (isInCart) dispatch(showCart());
                else dispatch(addDish(prepareCartDish({ ...dish, count: quantity }, user, quantity)));
            }}
            onMouseEnter={() => !isInCart && setText("У кошик")}
            onMouseLeave={() => !isInCart && setText(`${displayPrice} грн`)}
        >
            {isInCart ? <Icon icon="solar:cart-3-bold"/> : text}
        </button>
    );
}

export default function DishCardList({
    dishes,
    layout = "grid",
    className = "",
}: {
    dishes: DishWithCount[],
    layout?: "grid" | "horizontal",
    className?: string,
}) {
    const user = useSelector((state: { auth: { user: { role?: string; company_type?: string | null } | null } }) => state.auth.user);

    return (
        <div className={`listDishes${layout === "horizontal" ? " listDishes--horizontal" : ""}${className ? ` ${className}` : ""}`}>
            {dishes.map((dish) => {
                const corporateLabel = getCorporateOfferBadgeLabel(dish, user);

                return (
                <Link
                    to={`/dish/${dish.uuid}`}
                    key={dish.uuid}
                    className="cardDish"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${getImage(dish.dish_images[0]?.image_url ?? "")})`,
                    }}
                >
                    {corporateLabel && (
                        <span className="cardDish__corporate-badge">{corporateLabel}</span>
                    )}
                    <div className="dishInfo">
                        <h1>{dish.name}</h1>
                        <p>({dish.weight}/10г)</p>
                    </div>
                    <div className="dishActions">
                        {dish.spicy === true && (
                            <span className="fireIcon" title="Гостре">
                                <Icon icon="mdi:fire" height={40}/>
                            </span>
                        )}
                        <DishButton dish={dish} user={user}/>
                    </div>
                </Link>
            )})}
        </div>
    );
}
