import {useCategoryWithDishesQuery} from "../../redux/api/dishesApi.ts";
import {useCategoriesQuery} from "../../redux/api/dishesApi.ts";
import {useParams} from "react-router-dom"
import {Icon} from "@iconify/react"
import CarouselCategories from "./components/CarouselCategories.tsx";
import ListDishes from "./components/ListDishes.tsx";
import "./categoryWithDishes.css"

export function RenderListDishesPage({infoCategories, categories}){
    return (
        <main>
            <div className="search">
                <Icon className="icon" icon="icomoon-free:search" width={26}/>
                <input placeholder="Введіть назву страви"/>
            </div>

            <CarouselCategories categories={categories}/>
            <h1 className="categoryName">{infoCategories.title}</h1>

            {infoCategories.sub_categories.filter(sub_category => sub_category.dishes && sub_category.dishes.length > 0).map((sub_category, i) =>
                <section key={i}>
                    <div className="subcategories">
                        <h2>{sub_category.name}</h2>
                    </div>
                    <ListDishes sub_category={sub_category}/>
                </section>)}
        </main>
    )
}

export default function CreateCategoryWithDishes() {
    const { id } = useParams()
    const {data: infoCategories, isLoading: infoCategoriesLoading} = useCategoryWithDishesQuery(id)
    const {data: categories, isLoading: categoriesLoading} = useCategoriesQuery()

    if (infoCategoriesLoading || categoriesLoading) return <p>Завантаження...</p>

    return (
        <RenderListDishesPage infoCategories={infoCategories} categories={categories} />
    )
}