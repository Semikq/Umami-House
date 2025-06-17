import { useState, useEffect } from "react"
import { fetchAllDishesByCategory } from "../../api/dishes.js"
import { fetchAllCategories } from "../../api/dishes.js"
import { useParams } from "react-router-dom"
import { Icon } from "@iconify/react"
import { Link } from "react-router-dom"
import "./dishes.css"

export function RenderListDishesPage({listCategory, listDishes}){
    const { id } = useParams()
    const activeCategory = listCategory.find((cat) => cat.id === Number(id))

    return (
        <main>
            <div className="menuCategories">
                {listCategory.map((category) => 
                    <div className={`${category.id === activeCategory.id ? "active" : ""}`}>
                        <h2>{category.title}</h2>
                        <Icon className="icon" icon="solar:alt-arrow-right-linear"></Icon>
                    </div>
                )}
            </div>
            <h1>{activeCategory.title}</h1>
            {activeCategory.subcategories.map((subcategory) => 
                <div className="section">
                    <div className="subcategories">
                        <h2>{subcategory.name}</h2>
                    </div>
                    <div className="listDishes">
                        {listDishes.filter((dish) => dish.subcategories_id === subcategory.id).map((dish) => (
                            <Link to={`/dish/${dish.id}`} key={dish.id} className="cardDish" style={{backgroundImage: `url(${dish.images[0]?.image_url})`}}>
                                <div className="dishInfo">
                                    <h3>{dish.name}</h3>
                                    <p>({dish.weight}/10г)</p>
                                </div>
                                <div className="dishActions">
                                    <p>{dish.price} грн</p>
                                    <input type="button" value="У кошик" />
                                    {dish.frozen === 1 && <Icon className="icon" icon="famicons:snow" width={26}/>}
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>
            )}
        </main>
    )
}

export function CreateListDishesPage() {
  const [listCategory, setListCategory] = useState([])
  const [listDishes, setListDishes] = useState([])
  const { id } = useParams()

  console.log(id)
  console.log(listCategory)
    console.log(listDishes)

  useEffect(() => {fetchAllCategories().then(result => setListCategory(result.data))}, [id])
  useEffect(() => {fetchAllDishesByCategory(Number(id)).then(result => setListDishes(result.data))}, [id])

  if (!listCategory.length || !listDishes.length) return <p>Завантаження...</p>

  return (
    <RenderListDishesPage listCategory={listCategory} listDishes={listDishes} />
  )
}