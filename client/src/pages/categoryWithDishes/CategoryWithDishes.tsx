import { useState, useEffect } from "react"
import { fetchCategoryWithDishes, fetchAllCategories } from "../../api/dish.tsx"
import { useParams } from "react-router-dom"
import { Icon } from "@iconify/react"
import { Link } from "react-router-dom"
import "./categoryWithDishes.css"

export function RenderListDishesPage({infoCategories, categories}){
    const { id } = useParams()
    const activeCategory = categories.find((category) => category.id === Number(id))

    return (
        <main>
            <div className="menuCategories">
                {categories.map((category) =>
                    <div className={`${category.id === activeCategory.id ? "active" : ""}`}>
                        <h2>{category.title}</h2>
                        <Icon className="icon" icon="solar:alt-arrow-right-linear"></Icon>
                    </div>
                )}
            </div>

            <h1>{infoCategories.title}</h1>

            {infoCategories.sub_categories.map((sub_category) =>
                <div className="section">
                    <div className="subcategories">
                        <h2>{sub_category.name}</h2>
                    </div>
                    <div className="listDishes">
                        {sub_category.dishes.map((dish) =>
                            <Link to={`/dish/${dish.id}`} key={dish.id} className="cardDish" style={{ backgroundImage: `url(${dish.dish_images[0].image_url})` }}>
                                <div className="dishInfo">
                                    <h3>{dish.name}</h3>
                                    <p>({dish.weight}/10г)</p>
                                </div>
                                <div className="dishActions">
                                    <p>{dish.price} грн</p>
                                    <input type="button" value="У кошик" />
                                    {dish.frozen === true && <Icon className="icon" icon="famicons:snow" width={26}/>}
                                </div>
                            </Link>
                        )}
                    </div>
                </div>)}
        </main>
    )
}

export default function CreateCategoryWithDishes() {
    const [infoCategories, setInfoCategories] = useState({})
    const [categories, setCategories] = useState([])
    const { id } = useParams()

    useEffect(() => {fetchCategoryWithDishes(id).then(result => setInfoCategories(result.data))}, [id])
    useEffect(() => {fetchAllCategories().then(result => setCategories(result.data))}, [id]);

    if (!infoCategories || categories.length === 0) return <p>Завантаження...</p>
    return (
        <RenderListDishesPage infoCategories={infoCategories} categories={categories} />
    )
}