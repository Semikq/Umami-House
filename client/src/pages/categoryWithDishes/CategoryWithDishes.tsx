import { useState, useEffect, useRef } from "react"
import { fetchCategoryWithDishes, fetchAllCategories } from "../../api/dish.tsx"
import { useParams } from "react-router-dom"
import { Icon } from "@iconify/react"
import { Link } from "react-router-dom"
import "./categoryWithDishes.css"

function DishButton ({price}){
    const [text, setText] = useState(`${price} грн`)

    return (
        <input type="button" value={text} onMouseEnter={() => setText('У кошик')} onMouseLeave={() => setText(`${price} грн`)}/>
    )
}

function CarouselCategories ({categories}){
    const { id } = useParams()
    const activeCategory = categories.find((category) => category.id === Number(id))
    const myRef = useRef(null)

    useEffect(() => {
        const container = myRef.current

        const handleWheel = (e) => {
            e.preventDefault();
            container.scrollLeft += e.deltaY;
        };

        container.addEventListener("wheel", handleWheel, { passive: false });
        return () => container.removeEventListener("wheel", handleWheel);
    }, []);

    return (
        <div className="menuCategories" ref={myRef}>
            {categories.map((category) =>
                <Link to={`/category/${category.id}`} className={`listCategory ${category.id === activeCategory.id ? "active" : ""}`}>
                    <h2>{category.title}</h2>
                    <Icon className="icon" icon="solar:alt-arrow-right-linear" width={20}></Icon>
                </Link>
            )}
        </div>
    )
}

export function RenderListDishesPage({infoCategories, categories}){
    return (
        <main>
            <div className="search">
                <Icon className="icon" icon="icomoon-free:search" width={26}/>
                <input placeholder="Введіть назву страви"/>
            </div>

            <CarouselCategories categories={categories}/>
            <h1 className="categoryName">{infoCategories.title}</h1>

            {infoCategories.sub_categories.filter(sub_category => sub_category.dishes && sub_category.dishes.length > 0).map((sub_category) =>
                <section key={sub_category.id}>
                    <div className="subcategories">
                        <h2>{sub_category.name}</h2>
                    </div>
                    <div className="listDishes">
                        {sub_category.dishes.map((dish) =>
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
                </section>)}
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