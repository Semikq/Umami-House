import {Icon} from "@iconify/react";
import {setCount, incrementCount, decrementCount, delDish} from "../../../redux/slices/cartSlice.ts";
import {useState, useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import getImage from "../../../utils/getImage.ts";
import {getDishPrimaryImageUrl} from "../../../utils/dishImages.ts";
import {getCartLinePricing, getWholesaleCartLabel} from "../../../utils/corporateOffer.ts";

function ChangeQuantity ({ dish }) {
    const [countDish, setCountDish] = useState(dish.count)
    const dispatch = useDispatch()

    useEffect(() => {
        setCountDish(dish.count)
    }, [dish.count])

    const handleSetCount = (e) =>{
        let newCount = Number(e.target.value) || 1
        if (newCount < 0) newCount = 1
        if (newCount > 100) return
        setCountDish(newCount);
        dispatch(setCount({uuid: dish.uuid, count: newCount}))
    }

    const handleIncrementCount = () => {
        if (countDish < 100) {
            setCountDish(countDish + 1);
            dispatch(incrementCount(dish.uuid))
        }
    }

    const handleDecrementCount = () => {
        if (countDish > 1){
            setCountDish(countDish - 1);
            dispatch(decrementCount(dish.uuid))
        } else {
            dispatch(delDish(dish.uuid))
        }
    }

    return (
        <div className="cart__quantity">
            <button type="button" className="cart__quantity-btn" onClick={handleDecrementCount} aria-label="Зменшити">
                <Icon icon="stash:minus-solid"/>
            </button>
            <input className="cart__quantity-input" type="number" min={1} max={100} value={countDish} onChange={handleSetCount}/>
            <button type="button" className="cart__quantity-btn" onClick={handleIncrementCount} aria-label="Збільшити">
                <Icon icon="stash:plus-solid"/>
            </button>
        </div>
    )
}

type CartListDishesProps = {
    cartDishes: { dishes: unknown[], totalPrice?: number },
    variant?: "default" | "checkout",
}

export default function CartListDishes({ cartDishes, variant = "default" }: CartListDishesProps){
    const [openMenu, setOpenMenu] = useState(null)
    const dispatch = useDispatch()
    const menuRef = useRef(null);

    const handleToggleMenu = (id) => {
        setOpenMenu(openMenu ? null : id)
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpenMenu(null)
            }
        }

        if (openMenu !== null) document.addEventListener("mousedown", handleClickOutside)
        else document.removeEventListener("mousedown", handleClickOutside)

        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [openMenu]);

    if (cartDishes.dishes.length === 0) {
        return (
            <div className="cart__list-dishes cart__list-dishes--empty">
                <p className="cart__empty-text">Кошик пустий</p>
            </div>
        );
    }

    const listClassName = variant === "checkout"
        ? "cart__list-dishes cart__list-dishes--checkout"
        : "cart__list-dishes";

    return(
        <div className={listClassName}>
            {cartDishes.dishes.map(dish => {
                const { retailTotal, lineTotal, wholesaleActive } = getCartLinePricing(dish);
                const wholesaleLabel = getWholesaleCartLabel(dish);

                return (
                <div className="cart__dish" key={dish.uuid}>
                    <div className="cart__dish-header">
                        <img className="cart__dish-image" src={getImage(getDishPrimaryImageUrl(dish))} alt={dish.name}/>
                        <div className="cart__dish-info">
                            <h2 className="cart__dish-name">{dish.name}</h2>
                            <p className="cart__dish-weight">({dish.weight}/10г)</p>
                            {wholesaleLabel && (
                                <span className="cart__dish-wholesale">{wholesaleLabel}</span>
                            )}
                        </div>
                    </div>
                    <div className="cart__dish-controls">
                        <ChangeQuantity dish={dish}/>
                        {wholesaleActive ? (
                            <div className="cart__dish-prices">
                                <span className="cart__dish-price-old">
                                    {retailTotal.toLocaleString("uk-UA")} ₴
                                </span>
                                <p className="cart__dish-price">{lineTotal.toLocaleString("uk-UA")} ₴</p>
                            </div>
                        ) : (
                            <p className="cart__dish-price">{lineTotal.toLocaleString("uk-UA")} ₴</p>
                        )}
                        <button
                            type="button"
                            className="cart__dish-menu-btn"
                            onClick={() => handleToggleMenu(dish.uuid)}
                            aria-label="Додаткові дії"
                        >
                            <Icon icon="bi:three-dots-vertical"/>
                        </button>
                    </div>
                    {openMenu === dish.uuid &&
                        <div className="cart__dish-menu" ref={menuRef}>
                            <button type="button" className="cart__dish-menu-item">
                                <Icon icon="line-md:heart"/>
                                <span>Улюблене</span>
                            </button>
                            <button
                                type="button"
                                className="cart__dish-menu-item cart__dish-menu-item--danger"
                                onClick={() => {dispatch(delDish(dish.uuid)); setOpenMenu(null)}}
                            >
                                <Icon icon="iconamoon:trash-duotone"/>
                                <span>Видалити</span>
                            </button>
                        </div>
                    }
                </div>
            )})}
        </div>
    )
}
