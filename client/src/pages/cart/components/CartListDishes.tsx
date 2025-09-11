import {Icon} from "@iconify/react";
import {setCount, incrementCount, decrementCount, delDish} from "../../../redux/slices/cartSlice.ts";
import {useState, useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import getImage from "../../../utils/getImage.ts";

function ChangeQuantity ({ dish }) {
    const [countDish, setCountDish] = useState(dish.count)
    const dispatch = useDispatch()

    const handleSetCount = (e) =>{
        let newCount = Number(e.target.value) || 1
        if (newCount < 0) newCount = 1
        if (newCount > 100) return
        setCountDish(newCount);
        dispatch(setCount({id: dish.id, count: newCount}))
    }

    const handleIncrementCount = () => {
        if (countDish < 100) {
            setCountDish(countDish + 1);
            dispatch(incrementCount(dish.id))
        }
    }

    const handleDecrementCount = () => {
        if (countDish > 1){
            setCountDish(countDish - 1);
            dispatch(decrementCount(dish.id))
        } else {
            dispatch(delDish(dish.id))
        }
    }

    return (
        <div className="product__quantity">
            <Icon className="icon" icon="stash:minus-solid" onClick={handleDecrementCount}/>
            <input className="count" type="number" value={countDish} onChange={handleSetCount}/>
            <Icon className="icon" icon="stash:plus-solid" onClick={handleIncrementCount}/>
        </div>
    )
}

export default function CartListDishes({ cartDishes }){
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
    }, [menuRef]);

    return(
        <div className="cart__list-dishes">
            {cartDishes.dishes.map(dish =>
                <div className="cart__dish">
                    <div className="cart__dish-header">
                        <img className="cart__dish-image" src={getImage(dish.dish_images[0].image_url)} alt={dish.name}/>
                        <h2 className="cart__dish-title">
                            <span className="cart__dish-name">{dish.name}</span>
                            <span className="cart__dish-weight">({dish.weight}/10г)</span>
                        </h2>
                    </div>
                    <div className="cart__dish-controls">
                        <ChangeQuantity dish={dish}/>
                        <p className="dish__controls-price">{(dish.price * dish.count).toLocaleString('uk-UA')} ₴</p>
                    </div>
                    <Icon className="dish__controls-threeDots" onClick={() => handleToggleMenu(dish.id)} icon="bi:three-dots-vertical"/>
                    {openMenu === dish.id &&
                        <div className="dish__controls-additionalMenu" ref={menuRef}>
                            <div className="dish__controls-additionalMenu-item">
                                <Icon icon="line-md:heart"/>
                                <p>Улюблене</p>
                            </div>
                            <div className="dish__controls-additionalMenu-item" onClick={() => {dispatch(delDish(dish.id)); setOpenMenu(null)}}>
                                <Icon icon="iconamoon:trash-duotone"/>
                                <p>Видалити</p>
                            </div>
                        </div>
                    }
                </div>
            )}
        </div>
    )
}