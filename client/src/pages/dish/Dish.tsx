import {useState, useEffect, useRef} from "react"
import {fetchDish} from "../../api/dish.tsx";
import {Link, useParams} from "react-router-dom"
import {Icon} from "@iconify/react"
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
        <div className="product__additional-photos" ref={myRef}>
            {photos.map(image =>
                <img src={image.image_url} alt={image.title}/>
            )}
        </div>
    )
}

function ChangeQuantity () {
    const [count, setCount] = useState(0)

    return (
        <div className="product__quantity">
            <Icon className="icon" icon="stash:minus-solid" onClick={() => {if (count > 0) setCount(count - 1)}}/>
            <p>{count}</p>
            <Icon className="icon" icon="stash:plus-solid" onClick={() => {if (count < 100) setCount(count + 1)}}/>
        </div>
    )
}

const infoCards = [
    {title: "Способи оплати", icon: "mynaui:credit-card", text: "Umami House пропонує зручні способи оплати: онлайн карткою під час оформлення замовлення, готівкою при отриманні або через термінал карткою на місці. Обирайте, що підходить саме вам!"},
    {title: "Швидка доставка", icon: "material-symbols:delivery-truck-speed-outline-rounded", text: "Umami House доставляє свіжі страви та заморожену продукцію у термо-сумках, зберігаючи їх свіжість і смак. Обирайте готові страви або заморожені продукти для зручного приготування вдома."},
    {title: "Система лояльності", icon: "basil:present-outline", text: "Umami House дарує знижки! Досягайте певної суми замовлень і отримуйте знижку у відсотках. Також з кожного замовлення накопичуйте 1% бонусів для майбутніх покупок — що більше замовляєте, то вигідніше!"},
    {title: "Якість страви", icon: "streamline-sharp:fork-plate", text: "Наші страви готуються з натуральних продуктів, які ми закуповуємо у фермерів та сертифікованих підприємств. Це гарантує свіжість, якість та чудовий смак у кожному шматочку!"},
]

function CreateCardsWithInfo ({infoCards}){
    return (
        <section className="product__info-for-user">
        {infoCards.map((infoCard, index)=>
                <div className="product__info-card" key={index}>
                    <div>
                        <h2>{infoCard.title}</h2>
                        <Icon icon={infoCard.icon} width={30} color="#333333"></Icon>
                    </div>
                    <p>{infoCard.text}</p>
                </div>
        )}
        </section>
    )
}

function RenderDishPage({dish}){
    return (
        <main>
            <div className="product">
                <div className="product__photos">
                    <div className="product__breadcrumbs">
                        <Link className="product__link" to={`/category/${dish.sub_categories.categories.id}`}>{dish.sub_categories.categories.title}</Link>
                        <div className="icon">
                            <Icon icon="lets-icons:arrow-drop-right"/>
                        </div>
                        <Link className="product__link" to={`/category/${dish.sub_categories.id}`}>{dish.sub_categories.name}</Link>
                        <div className="icon">
                            <Icon icon="lets-icons:arrow-drop-right"/>
                        </div>
                        <p className="product__link">{dish.name}</p>
                    </div>
                    <img src={dish.dish_images[0]?.image_url} alt={dish.dish_images[0]?.title}/>
                    <BlockPhotos photos={dish.dish_images.slice(0, 3)}/>
                </div>
                <div className="product__info">
                    <section className="product__info-and-purchase">
                        <h1>{dish.name}</h1>
                        <div className="product__info-weight">
                            <h2>Склад</h2>
                            <p>({dish.weight}/10г)</p>
                        </div>
                        <p className="product__info-ingredients">{dish.ingredients}</p>
                        <div className="product__purchase">
                            {dish.frozen === true &&
                                <div className="product__button--frozen">
                                    <p>Заморожена версія</p>
                                    <Icon icon="famicons:snow" width={25}/>
                                </div>
                            }
                            <div className="product__quantity-purchase">
                                <ChangeQuantity/>
                                <input className="product__button--add-product" type="button" value="У кошик"/>
                            </div>
                        </div>
                    </section>
                    <CreateCardsWithInfo infoCards={infoCards}/>
                </div>
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