import {Link} from "react-router-dom";
import {Icon} from "@iconify/react";
import {useState} from "react";
import {addDish} from "../../../redux/slices/cartSlice.ts";
import {showCart} from "../../../redux/slices/uiSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import getImage from "../../../utils/getImage.ts";

function DishButton ({dish}){
    const [text, setText] = useState(`${dish.price} грн`)
    const state = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const isInCart = state.dishes.find(i => i.id === dish.id);

    return (
        <button onClick={(e) => {
                e.preventDefault()
                if (isInCart) dispatch(showCart())
                else dispatch(addDish({ ...dish, count: 1 }))
            }}
            onMouseEnter={() => !isInCart && setText('У кошик')}
            onMouseLeave={() => !isInCart && setText(`${dish.price} грн`)}>
            { isInCart ? <Icon icon="solar:cart-3-bold"/> : text }
        </button>
    )
}

export default function ListDishes({sub_category}){
    return (
        <div className="listDishes">
            {sub_category.dishes.map((dish) =>
                <Link to={`/dish/${dish.id}`} key={dish.id} className="cardDish" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${getImage(dish.dish_images[0].image_url)})` }}>
                    <div className="dishInfo">
                        <h1>{dish.name}</h1>
                        <p>({dish.weight}/10г)</p>
                    </div>
                    <div className="dishActions">
                        {dish.spicy === true && <span className="fireIcon" title="Гостре"><Icon icon="mdi:fire" height={40}/></span>}
                        <DishButton dish={dish} />
                        {dish.frozen === true && <span title="Заморожена версія"><Icon className="icon" icon="famicons:snow" width={26}/></span>}
                    </div>
                </Link>
            )}
        </div>
    )
}