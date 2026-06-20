import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {Icon} from "@iconify/react";
import {useDispatch, useSelector} from "react-redux";
import {showCart} from "../../../redux/slices/uiSlice.ts";
import {addDish} from "../../../redux/slices/cartSlice.ts";
import getImage from "../../../utils/getImage.ts";
import {getDishPrimaryImageUrl, sanitizeDishImages} from "../../../utils/dishImages.ts";
import {Category, Dish} from "../../../redux/types/dishes.ts";
import {
    getCorporateOfferBadgeLabel,
    getCorporateDishPrice,
    prepareCartDish,
} from "../../../utils/corporateOffer.ts";
import "../../../components/dishCard/dishCard.css";

type AuthUser = { role?: string; company_type?: string | null; company_name?: string | null } | null;

function DishButton ({dish, user}: { dish: { uuid: string; price: number; count?: number }, user: AuthUser }) {
    const displayPrice = getCorporateDishPrice(dish, user, 1);
    const [text, setText] = useState(`${displayPrice} грн`);
    const state = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const isInCart = state.dishes.find(i => i.uuid === dish.uuid);

    return (
        <button onClick={(e) => {
            e.preventDefault();
            if (isInCart) dispatch(showCart());
            else dispatch(addDish(prepareCartDish({ ...dish, count: 1 }, user, 1)));
        }}
                onMouseEnter={() => !isInCart && setText("У кошик")}
                onMouseLeave={() => !isInCart && setText(`${displayPrice} грн`)}>
            { isInCart ? <Icon icon="solar:cart-3-bold"/> : text }
        </button>
    );
}

function getVisibleDishes(additionalDish: Category | undefined): Dish[] {
    const dishes = additionalDish?.sub_categories?.[0]?.dishes ?? [];

    return dishes.filter(
        (dish) => Boolean(dish?.uuid) && sanitizeDishImages(dish.dish_images).length > 0,
    );
}

export default function CreateAdditionalOffers({
    categoryName,
    additionalDish,
}: {
    categoryName: string,
    additionalDish?: Category,
}) {
    const myRef = useRef<HTMLDivElement>(null);
    const user = useSelector((state: { auth: { user: AuthUser } }) => state.auth.user);
    const visibleDishes = getVisibleDishes(additionalDish);

    useEffect(() => {
        const container = myRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            container.scrollLeft += e.deltaY;
        };

        container.addEventListener("wheel", handleWheel, { passive: false });
        return () => container.removeEventListener("wheel", handleWheel);
    }, []);

    if (visibleDishes.length === 0) return null;

    return(
        <div className="additionalOffers__block">
            <div className="additionalOffers__header">
                <h2>{categoryName}</h2>
            </div>
            <div className="additionalOffers__list" ref={myRef}>
                {visibleDishes.map((dish) => {
                    const corporateLabel = getCorporateOfferBadgeLabel(dish, user);
                    const imageUrl = getDishPrimaryImageUrl(dish);

                    return (
                    <Link
                        to={`/dish/${dish.uuid}`}
                        key={dish.uuid}
                        className="cardDish"
                        style={{
                            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${getImage(imageUrl)})`,
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
                            {dish.spicy === true && <span className="fireIcon" title="Гостре"><Icon icon="mdi:fire" height={40}/></span>}
                            <DishButton dish={dish} user={user} />
                        </div>
                    </Link>
                )})}
            </div>
        </div>
    );
}
