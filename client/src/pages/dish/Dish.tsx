import {useState, useEffect} from "react"
import {fetchDish, fetchCategoryWithDishes} from "../../api/dish.tsx";
import CreateBlockPhotos from "./components/CreateBlockPhotos.tsx"
import ChangeQuantity from "./components/ChangeQuantity.tsx";
import CreateCardsWithInfo from "./components/CreateCardsWithInfo.tsx";
import CreateAdditionalOffers from "./components/CreateAdditionalOffers.tsx";
import CreateFormRateProduct from "./components/CreateFormRateProduct.tsx";
import CreateUserComment from "./components/CreateUserComment.tsx";
import {Link, useParams} from "react-router-dom"
import {Icon} from "@iconify/react"
import "./dish.css"

function RenderDishPage({dish, additionalDish}){
    return (
        <main>
            <div className="product">
                <div className="product__breadcrumbs-photos">
                    <div className="product__header-actions-phone">
                        <Icon icon="lets-icons:arrow-drop-left" className="product__turnBack-button"></Icon>
                        <Icon icon="line-md:heart" className="product__like-button"></Icon>
                    </div>
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
                            <Icon icon="line-md:heart" className="product__like-button"></Icon>
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
                                {dish.frozen === true && <Icon icon="famicons:snow" className="snow-icon--frozen"/>}
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