import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {Icon} from "@iconify/react";

function DishButton ({price}){
    const [text, setText] = useState(`${price} грн`)

    return (
        <input type="button" value={text} onMouseEnter={() => setText('У кошик')} onMouseLeave={() => setText(`${price} грн`)}/>
    )
}

export default function CreateAdditionalOffers({categoryName, additionalDish}){
    const myRef = useRef(null);

    useEffect(() => {
        const container = myRef.current;

        const handleWheel = (e) => {
            e.preventDefault()
            container.scrollLeft += e.deltaY;
        }

        container.addEventListener("wheel", handleWheel, { passive: false });
        return () => container.removeEventListener("wheel", handleWheel);
    }, [])

    return(
        <div className="additionalOffers__block">
            <div className="additionalOffers__header">
                <h2>{categoryName}</h2>
            </div>
            <div className="additionalOffers__list" ref={myRef}>
                {additionalDish.sub_categories[0].dishes.map((dish) =>
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
        </div>
    )
}