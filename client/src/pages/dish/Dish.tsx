import {useDishQuery, useCategoryWithDishesQuery} from "../../redux/api/dishesApi.ts";
import CreateBlockPhotos from "./components/CreateBlockPhotos.tsx"
import ChangeQuantity from "./components/ChangeQuantity.tsx";
import CreateCardsWithInfo from "./components/CreateCardsWithInfo.tsx";
import CreateAdditionalOffers from "./components/CreateAdditionalOffers.tsx";
import CreateFormRateProduct from "./components/CreateFormRateProduct.tsx";
import CreateUserComment from "./components/CreateUserComment.tsx";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addDish} from "../../redux/slices/cartSlice.ts";
import {showCart} from "../../redux/slices/uiSlice.ts";
import {Link, useParams} from "react-router-dom"
import {Icon} from "@iconify/react"
import "./dish.css"

function RenderDishPage({dish, additionalDish}){
    const state = useSelector(state => state.cart)
    const IsInCart = state.dishes.find(i => i.uuid === dish.uuid)
    const [count, setCount] = useState(1)
    const dispatch = useDispatch()

    return (
        <main>
            <div className="product">
                <div className="product__breadcrumbs-photos">
                    <div className="product__header-actions-phone">
                        <Icon icon="lets-icons:arrow-drop-left" className="product__turnBack-button"></Icon>
                        <Icon icon="line-md:heart" className="product__like-button"></Icon>
                    </div>
                    <div className="product__breadcrumbs">
                        <Link className="product__link" to={`/category/${dish.sub_categories.categories.uuid}`}>{dish.sub_categories.categories.title}</Link>
                        <div className="icon">
                            <Icon icon="lets-icons:arrow-drop-right"/>
                        </div>
                        <Link className="product__link" to={`/category/${dish.sub_categories.uuid}`}>{dish.sub_categories.name}</Link>
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
                                <ChangeQuantity IsInCart={IsInCart} setCount={setCount}/>
                                {dish.frozen === true && <Icon icon="famicons:snow" className="snow-icon--frozen"/>}
                                <button className="product__button--add-product" onClick={() => {
                                    if (IsInCart) dispatch(showCart())
                                    else dispatch(addDish({...dish, count}))
                                }}>
                                    {IsInCart ? <Icon icon="solar:cart-3-bold"/> : "У кошик"}
                                </button>
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
                {dish.dish_comments.map((infoComment, i) =>
                    <CreateUserComment key={i} infoComment={infoComment}/>
                )}
            </div>
        </main>
    )
}

export default function CreateDish() {
    const { uuid } = useParams()
    const {data: dish, isLoading: dishLoading} = useDishQuery(uuid)
    const categoryUuid = dish?.sub_categories?.category_uuid
    const {data: additionalDish, isLoading: additionalDishLoading} = useCategoryWithDishesQuery(categoryUuid, { skip: !categoryUuid })

    if (dishLoading || additionalDishLoading) return <p>Завантаження...</p>

    return (
        <RenderDishPage dish={dish} additionalDish={additionalDish} />
    )
}