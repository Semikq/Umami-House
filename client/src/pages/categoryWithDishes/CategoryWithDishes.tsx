import { useState, useEffect } from "react"
import { fetchCategoryWithDishes } from "../../api/dish.tsx"
import { useParams } from "react-router-dom"
import { Icon } from "@iconify/react"
import { Link } from "react-router-dom"
import "./categoryWithDishes.css"

export function RenderListDishesPage({infoCategories}){

    return (
        <main>
            <h1>{infoCategories.title}</h1>
            <p>{infoCategories.sub_categories[0].name}</p>
            {/*<div className="menuCategories">*/}
            {/*    {listCategory.map((category) =>*/}
            {/*        <div className={`${category.id === activeCategory.id ? "active" : ""}`}>*/}
            {/*            <h2>{category.title}</h2>*/}
            {/*            <Icon className="icon" icon="solar:alt-arrow-right-linear"></Icon>*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</div>*/}
            {/*<h1>{activeCategory.title}</h1>*/}
            {/*{activeCategory.subcategories.map((subcategory) =>*/}
            {/*    <div className="section">*/}
            {/*        <div className="subcategories">*/}
            {/*            <h2>{subcategory.name}</h2>*/}
            {/*        </div>*/}
            {/*        <div className="listDishes">*/}
            {/*            {listDishes.filter((dish) => dish.subcategories_id === subcategory.id).map((dish) => (*/}
            {/*                <Link to={`/dish/${dish.id}`} key={dish.id} className="cardDish" style={{backgroundImage: `url(${dish.images[0]?.image_url})`}}>*/}
            {/*                    <div className="dishInfo">*/}
            {/*                        <h3>{dish.name}</h3>*/}
            {/*                        <p>({dish.weight}/10г)</p>*/}
            {/*                    </div>*/}
            {/*                    <div className="dishActions">*/}
            {/*                        <p>{dish.price} грн</p>*/}
            {/*                        <input type="button" value="У кошик" />*/}
            {/*                        {dish.frozen === 1 && <Icon className="icon" icon="famicons:snow" width={26}/>}*/}
            {/*                    </div>*/}
            {/*                </Link>*/}
            {/*            ))}*/}
            {/*        </div>*/}

            {/*    </div>*/}

        </main>
    )
}

export default function CreateCategoryWithDishes() {
    const [infoCategories, setInfoCategories] = useState({})
    const { id } = useParams()

    useEffect(() => {fetchCategoryWithDishes(id).then(result => setInfoCategories(result.data))}, [id])

    if (!infoCategories) return <p>Завантаження...</p>

    return (
        <RenderListDishesPage infoCategories={infoCategories} />
    )
}