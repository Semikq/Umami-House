import {Link} from "react-router-dom";
import {Icon} from "@iconify/react";
import {useState} from "react";
import {addDish} from "../../../redux/slices/cartSlice.ts";
import {useDispatch} from "react-redux";

function DishButton ({dish}){
    const [text, setText] = useState(`${dish.price} грн`)
    const dispatch = useDispatch()

    return (
        <input type="button" value={text} onClick={(e) => {dispatch(addDish({...dish, count: 1})); e.preventDefault()}} onMouseEnter={() => setText('У кошик')} onMouseLeave={() => setText(`${dish.price} грн`)}/>
    )
}

export default function ListDishes({sub_category}){
    return (
        <div className="listDishes">
            {sub_category.dishes.map((dish) =>
                <Link to={`/dish/${dish.id}`} key={dish.id} className="cardDish" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${dish.dish_images[0].image_url})` }}>
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