import {Link} from "react-router-dom";
import {Icon} from "@iconify/react";
import {useState} from "react";

function DishButton ({price}){
    const [text, setText] = useState(`${price} грн`)
    return (
        <input type="button" value={text} onMouseEnter={() => setText('У кошик')} onMouseLeave={() => setText(`${price} грн`)}/>
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
                        <DishButton price={dish.price} />
                        {dish.frozen === true && <span title="Заморожена версія"><Icon className="icon" icon="famicons:snow" width={26}/></span>}
                    </div>
                </Link>
            )}
        </div>
    )
}