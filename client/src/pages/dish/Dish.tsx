import {useState, useEffect, useRef} from "react"
import {fetchDish, fetchCategoryWithDishes} from "../../api/dish.tsx";
import {Link, useParams} from "react-router-dom"
import {Icon} from "@iconify/react"
import "./dish.css"

function CreateBlockPhotos ({dish}) {
    const [photo, setPhoto] = useState(0)
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

    return <div className="product__photos">
        <div className="product__photo-spicy">
            <img src={dish.dish_images[photo]?.image_url} alt={dish.dish_images[photo]?.title}/>
            {dish.spicy === true && <Icon icon="mdi:fire" className="icon"/>}
        </div>
        <div className="product__additional-photos" ref={myRef}>
            {dish.dish_images.map((image, i) =>
                <img src={image.image_url} alt={image.title} key={image.id} onClick={() => setPhoto(i)} />
            )}
        </div>
    </div>
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

function CreateCardsWithInfo (){
    const infoCards = [
        {title: "Способи оплати", icon: "mynaui:credit-card", text: "Umami House пропонує зручні способи оплати: онлайн карткою під час оформлення замовлення, готівкою при отриманні або через термінал карткою на місці. Обирайте, що підходить саме вам!"},
        {title: "Швидка доставка", icon: "material-symbols:delivery-truck-speed-outline-rounded", text: "Umami House доставляє свіжі страви та заморожену продукцію у термо-сумках, зберігаючи їх свіжість і смак. Обирайте готові страви або заморожені продукти для зручного приготування вдома."},
        {title: "Система лояльності", icon: "basil:present-outline", text: "Umami House дарує знижки! Досягайте певної суми замовлень і отримуйте знижку у відсотках. Також з кожного замовлення накопичуйте 1% бонусів для майбутніх покупок — що більше замовляєте, то вигідніше!"},
        {title: "Якість страви", icon: "streamline-sharp:fork-plate", text: "Наші страви готуються з натуральних продуктів, які ми закуповуємо у фермерів та сертифікованих підприємств. Це гарантує свіжість, якість та чудовий смак у кожному шматочку!"},
    ]

    return (
        <section className="product__info-for-user">
            <div className="wrapper__product__info-for-user">
                {infoCards.map((infoCard, index)=>
                    <div className="product__info-card" key={index}>
                        <div>
                            <h2>{infoCard.title}</h2>
                            <Icon icon={infoCard.icon} width={30} color="#333333"></Icon>
                        </div>
                        <p>{infoCard.text}</p>
                    </div>
                )}
            </div>
        </section>
    )
}

function DishButton ({price}){
    const [text, setText] = useState(`${price} грн`)

    return (
        <input type="button" value={text} onMouseEnter={() => setText('У кошик')} onMouseLeave={() => setText(`${price} грн`)}/>
    )
}

function CreateAdditionalOffers({categoryName, additionalDish}){
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

function CreateFormRateProduct(){
    const stars = Array(5).fill(0)
    const [index, setIndex] = useState(0)
    const [rating, setRating] = useState(0)

    return(
        <section className="comment__card">
            <h1>Залиши свою оцінку та коментарь!</h1>
            <div className="comment__info">
                <div className="comment__info-rating">
                    {stars.map((_, i) => (
                        <Icon icon={i + 1 <= (index || rating) ? "bxs:star" : "bx:star"} onClick={() => setRating(i + 1)} onMouseEnter={() => setIndex(i + 1)} onMouseLeave={() => setIndex(0)} width={30} className="rating" color="#F1C232"/>
                    ))}
                </div>
                <div className="comment__addition-comment">
                    <input type="text" placeholder="Коментарь..."/>
                    <Icon icon="tabler:message" className="icon" width={36}/>
                </div>
            </div>
        </section>
    )
}

function CreateUserComment({infoComment}) {
    const stars = Array(5).fill(0)
    const [showComment, setShowComment] = useState(false)

    return(
        <section className="comment__card">
            <h1>{infoComment.users.name}</h1>
            <div className="comment__info">
                <div className="comment__info-rating">
                    {stars.map((_, i) => (
                        <Icon icon={i < infoComment.rating ? "bxs:star" : "bx:star"} key={i} width={30} color="#F1C232"/>
                    ))}
                </div>
                <div className={`${infoComment.comment.length > 60 && (showComment === true ? "showComment" : "")} comment__info-comment`}>
                    <p>{!showComment ? (infoComment.comment.length > 60 ? `${infoComment.comment.slice(0, 60)}...` : infoComment.comment) : infoComment.comment}</p>
                    <Icon icon="eva:arrow-right-fill" onClick={() => setShowComment(!showComment)} className={`${showComment === true && "active"} icon`} width={30}/>
                </div>
            </div>
        </section>
    )
}

function RenderDishPage({dish, additionalDish}){
    return (
        <main>
            <div className="product">
                <div className="product__breadcrumbs-photos">
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
                    <CreateBlockPhotos dish={dish}/>
                </div>
                <div className="product__info">
                    <section className="product__info-and-purchase">
                        <div className="product__header">
                            <h1>{dish.name}</h1>
                            <Icon icon="line-md:heart"></Icon>
                        </div>
                        <div className="product__info-weight">
                            <h2>Склад</h2>
                            <p>({dish.weight}/10г)</p>
                        </div>
                        <p className="product__info-ingredients">{dish.ingredients}</p>
                        <div className="product__purchase">
                            {dish.frozen === true &&
                                <div className="product__button--frozen">
                                    <p>Заморожена версія</p>
                                    <Icon icon="famicons:snow"/>
                                </div>
                            }
                            <div className="product__quantity-purchase">
                                <ChangeQuantity/>
                                <input className="product__button--add-product" type="button" value="У кошик"/>
                            </div>
                        </div>
                    </section>
                    <CreateCardsWithInfo/>
                </div>
            </div>
            <div className="product__additionalOffers">
                <CreateAdditionalOffers categoryName={"Досконала пара"} additionalDish={additionalDish}/>
                <CreateAdditionalOffers categoryName={"Ми рекомендуємо"} additionalDish={additionalDish}/>
            </div>
            <div className="product__comments">
                <CreateFormRateProduct/>
                {dish.dish_comments.map((infoComment) =>
                    <CreateUserComment infoComment={infoComment}/>
                )}
            </div>
        </main>
    )
}

export default function CreateDish() {
    const [dish, setDish] = useState()
    const [additionalDish, setAdditionalDish] = useState({})
    const { id } = useParams()

    useEffect(() => {fetchDish(id).then(result => setDish(result.data))}, [id])
    useEffect(() => {fetchCategoryWithDishes(1).then(result => setAdditionalDish(result.data))}, [id]);

    if (!dish || !additionalDish.title) return <p>Завантаження...</p>

    return (
        <RenderDishPage dish={dish} additionalDish={additionalDish} />
    )
}