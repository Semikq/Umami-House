import { useEffect, useState, useRef } from "react"
import { fetchDish } from "../../api/dish.tsx";
import {Link, useParams} from "react-router-dom"
import { Icon } from "@iconify/react"
import "./dish.css"

function BlockPhotos ({photos}) {
    const myRef = useRef(null);

    useEffect(() => {
        const container = myRef.current;

        function handleWheel (e){
            e.preventDefault()
            container.scrollLeft += e.deltaY;
        }

        container.addEventListener("wheel", handleWheel, { passive: false });
        return () => container.removeEventListener("wheel", handleWheel);
    }, []);

    return (
        <div className="blockPhotos" ref={myRef}>
            {photos.map(image =>
                <img src={image.image_url} alt={image.title}/>
            )}
        </div>
    )
}

function RenderDishPage({dish}){
    const [count, setCount] = useState(0)

    return (
        <main>
            <div className="blockProduct">
                <div className="blockInfoPhoto">
                    <div className="linkBlock">
                        <Link className="linkDish" to={`/category/${dish.sub_categories.categories.id}`}>{dish.sub_categories.categories.title}</Link>
                        <Icon icon="lets-icons:arrow-drop-right" width={32}/>
                        <Link className="linkDish" to={`/category/${dish.sub_categories.id}`}>{dish.sub_categories.name}</Link>
                        <Icon icon="lets-icons:arrow-drop-right" width={32}/>
                        <p className="linkDish">{dish.name}</p>
                    </div>
                    <img src={dish.dish_images[0]?.image_url} alt={dish.dish_images[0]?.title}/>
                    <BlockPhotos photos={dish.dish_images.slice(0, 3)}/>
                </div>
                {/*<div className="infoDish">*/}
                {/*    <h1>{dish.name}</h1>*/}
                {/*    <div className="infoWeight">*/}
                {/*        <p>Склад</p>*/}
                {/*        <p>({dish.weight}/10г)</p>*/}
                {/*    </div>*/}
                {/*    <p className="infoIngredients">{dish.ingredients}</p>*/}
                {/*    <div className="typeBuy">*/}
                {/*        {dish.frozen === true &&*/}
                {/*            <div className="frozen">*/}
                {/*                <p>Заморожена версія</p>*/}
                {/*                <Icon className="icon" icon="famicons:snow" width={25}/>*/}
                {/*            </div>*/}
                {/*        }*/}
                {/*        <div className="infoBuy">*/}
                {/*            <div>*/}
                {/*                <input type="button" onClick={() => {if (count > 0) setCount(count - 1)}} value="-" />*/}
                {/*                <p>{count}</p>*/}
                {/*                <input type="button" onClick={() => {if (count < 100) setCount(count + 1)}} value=" +" />*/}
                {/*            </div>*/}
                {/*            <input className="basket" type="button" value="У кошик" />*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className="infoForUser">*/}
                {/*        <div className="block">*/}
                {/*            <div>*/}
                {/*                <h2>Способи оплати</h2>*/}
                {/*                <Icon icon="mynaui:credit-card" width={30} color="#333333"></Icon>*/}
                {/*            </div>*/}
                {/*            <p>Umami House пропонує зручні способи оплати: онлайн карткою під час оформлення замовлення, готівкою при отриманні або через термінал карткою на місці. Обирайте, що підходить саме вам!</p>*/}
                {/*        </div>*/}
                {/*        <div className="block">*/}
                {/*            <div>*/}
                {/*                <h2>Швидка доставка</h2>*/}
                {/*                <Icon icon="material-symbols:delivery-truck-speed-outline-rounded" width={30} color="#333333"></Icon>*/}
                {/*            </div>*/}
                {/*            <p>Umami House доставляє свіжі страви та заморожену продукцію у термо-сумках, зберігаючи їх свіжість і смак. Обирайте готові страви або заморожені продукти для зручного приготування вдома.</p>*/}
                {/*        </div>*/}
                {/*        <div className="block">*/}
                {/*            <div>*/}
                {/*                <h2>Система лояльності</h2>*/}
                {/*                <Icon icon="basil:present-outline" width={30} color="#333333"></Icon>*/}
                {/*            </div>*/}
                {/*            <p>Umami House дарує знижки! Досягайте певної суми замовлень і отримуйте знижку у відсотках. Також з кожного замовлення накопичуйте 1% бонусів для майбутніх покупок — що більше замовляєте, то вигідніше!</p>*/}
                {/*        </div>*/}
                {/*        <div className="block">*/}
                {/*            <div>*/}
                {/*                <h2>Якість страви</h2>*/}
                {/*                <Icon icon="streamline-sharp:fork-plate" width={30} color="#333333"></Icon>*/}
                {/*            </div>*/}
                {/*            <p>Наші страви готуються з натуральних продуктів, які ми закуповуємо у фермерів та сертифікованих підприємств. Це гарантує свіжість, якість та чудовий смак у кожному шматочку!</p>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </main>
    )
}

export default function CreateDish() {
    const [dish, setDish] = useState()
    const { id } = useParams()

    useEffect(() => {fetchDish(id).then(result => setDish(result.data))}, [id])

    if (!dish) return <p>Завантаження...</p>

    return (
        <RenderDishPage dish={dish} />
    )
}