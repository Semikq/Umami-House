import {useDishQuery, useCategoryWithDishesQuery} from "../../redux/api/dishesApi.ts";
import CreateBlockPhotos from "./components/CreateBlockPhotos.tsx"
import ChangeQuantity from "./components/ChangeQuantity.tsx";
import CreateCardsWithInfo from "./components/CreateCardsWithInfo.tsx";
import CreateAdditionalOffers from "./components/CreateAdditionalOffers.tsx";
import CreateFormRateProduct from "./components/CreateFormRateProduct.tsx";
import CreateUserComment from "./components/CreateUserComment.tsx";
import ProductLikeButton from "./components/ProductLikeButton.tsx";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addDish} from "../../redux/slices/cartSlice.ts";
import {showAuth, showCart} from "../../redux/slices/uiSlice.ts";
import {
    useAddFavoriteMutation,
    useDeleteFavoriteMutation,
    useGetFavoritesQuery,
} from "../../redux/api/favoritesApi.ts";
import {Link, useNavigate, useParams} from "react-router-dom"
import {Icon} from "@iconify/react"
import "./dish.css"
import PageLoader from "../../components/PageLoader/PageLoader.tsx";
import {
    getCorporateOfferLabel,
    getCorporateDishPrice,
    hasCorporateOfferForUser,
    hasCorporateSpecialPrice,
    prepareCartDish,
} from "../../utils/corporateOffer.ts";

function RenderDishPage({dish, additionalDish}){
    const navigate = useNavigate()
    const state = useSelector(state => state.cart)
    const user = useSelector(state => state.auth.user)
    const categoryUuid = dish.sub_categories.categories?.uuid ?? dish.sub_categories.category_uuid
    const subCategoryUuid = dish.sub_categories.uuid
    const IsInCart = state.dishes.find(i => i.uuid === dish.uuid)
    const [count, setCount] = useState(1)
    const [cartAnimating, setCartAnimating] = useState(false)
    const dispatch = useDispatch()
    const {data: favorites = []} = useGetFavoritesQuery(user?.uuid, {skip: !user?.uuid})
    const [addFavorite] = useAddFavoriteMutation()
    const [deleteFavorite] = useDeleteFavoriteMutation()
    const isLiked = favorites.some((favorite) => favorite.dish_uuid === dish.uuid)
    const corporateOfferLabel = hasCorporateOfferForUser(dish, user)
        ? getCorporateOfferLabel(dish)
        : null
    const effectiveUnitPrice = getCorporateDishPrice(dish, user, count)
    const wholesaleApplied = hasCorporateSpecialPrice(dish, user, count)

    const handleToggleFavorite = async () => {
        if (!user?.uuid) {
            dispatch(showAuth())
            return
        }

        try {
            if (isLiked) {
                await deleteFavorite({user_uuid: user.uuid, dish_uuid: dish.uuid}).unwrap()
            } else {
                await addFavorite({user_uuid: user.uuid, dish_uuid: dish.uuid}).unwrap()
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleAddToCart = () => {
        setCartAnimating(true)
        window.setTimeout(() => setCartAnimating(false), 450)

        if (IsInCart) dispatch(showCart())
        else dispatch(addDish(prepareCartDish({ ...dish, count }, user, count)))
    }

    return (
        <main>
            <div className="product">
                <div className="product__breadcrumbs-photos">
                    <div className="product__header-actions-phone">
                        <button
                            type="button"
                            className="product__turnBack-button"
                            onClick={() => navigate(`/category/${categoryUuid}`)}
                            aria-label="Повернутись до меню"
                        >
                            <Icon icon="lets-icons:arrow-drop-left"/>
                        </button>
                        <ProductLikeButton liked={isLiked} onToggle={handleToggleFavorite}/>
                    </div>
                    <div className="product__breadcrumbs">
                        <Link className="product__link" to={`/category/${categoryUuid}`}>
                            {dish.sub_categories.categories?.title ?? "Меню"}
                        </Link>
                        <div className="icon">
                            <Icon icon="lets-icons:arrow-drop-right"/>
                        </div>
                        <Link className="product__link" to={`/category/${categoryUuid}#sub-${subCategoryUuid}`}>
                            {dish.sub_categories.name}
                        </Link>
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
                            <ProductLikeButton liked={isLiked} onToggle={handleToggleFavorite}/>
                        </div>
                        <div className="product__info-weight">
                            <h2>Склад</h2>
                            <p>({dish.weight}/10г)</p>
                        </div>
                        <p className="product__info-ingredients">{dish.ingredients}</p>
                        {corporateOfferLabel && (
                            <div className={`product__corporate-offer${wholesaleApplied ? " product__corporate-offer--active" : ""}`}>
                                <Icon icon="mdi:tag-multiple-outline" width={22} height={22}/>
                                <span>
                                    {corporateOfferLabel}
                                    {wholesaleApplied && ` • застосовано: ${effectiveUnitPrice} ₴/шт`}
                                </span>
                            </div>
                        )}
                        <div className="product__purchase">
                            <div className="product__quantity-purchase">
                                <ChangeQuantity IsInCart={IsInCart} setCount={setCount}/>
                                <button
                                    type="button"
                                    className={`product__button--add-product${cartAnimating ? " is-animating" : ""}${IsInCart ? " is-in-cart" : ""}`}
                                    onClick={handleAddToCart}
                                >
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
                <CreateFormRateProduct dishUuid={dish.uuid}/>
                {dish.dish_comments.length > 0 && (
                    <div className="product__comments-list">
                        <h2 className="product__comments-list-title">Відгуки гостей</h2>
                        {dish.dish_comments.map((infoComment) => (
                            <CreateUserComment
                                key={infoComment.uuid}
                                infoComment={infoComment}
                                dishUuid={dish.uuid}
                            />
                        ))}
                    </div>
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

    if (dishLoading || additionalDishLoading) return <PageLoader/>

    return (
        <RenderDishPage dish={dish} additionalDish={additionalDish} />
    )
}