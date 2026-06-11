import {useAllDishesQuery, useCategoriesQuery, useCategoryWithDishesQuery} from "../../redux/api/dishesApi.ts";
import {useEffect, useMemo, useState} from "react";
import {useLocation, useParams} from "react-router-dom"
import {Icon} from "@iconify/react"
import CarouselCategories from "./components/CarouselCategories.tsx";
import ListDishes from "./components/ListDishes.tsx";
import DishCardList from "../../components/dishCard/DishCardList.tsx";
import PageLoader from "../../components/PageLoader/PageLoader.tsx";
import {Category, Dish} from "../../redux/types/dishes.ts";
import "./categoryWithDishes.css"

function normalizeSearchQuery(query: string) {
    return query.trim().toLowerCase();
}

function isVisibleMenuDish(dish: Dish) {
    return dish.active && (dish.dish_images?.length ?? 0) > 0;
}

function dishMatchesQuery(dish: Dish, query: string) {
    return dish.name.toLowerCase().includes(query);
}

export function RenderListDishesPage({
    infoCategories,
    categories,
}: {
    infoCategories: Category,
    categories: { uuid: string, title: string }[],
}) {
    const location = useLocation();
    const { uuid: categoryUuid } = useParams();
    const [searchQuery, setSearchQuery] = useState("");
    const normalizedQuery = normalizeSearchQuery(searchQuery);
    const isSearching = normalizedQuery.length > 0;

    const { data: allDishes = [] } = useAllDishesQuery(undefined, {
        skip: !isSearching,
    });

    const visibleSubCategories = useMemo(() => {
        const withDishes = infoCategories.sub_categories
            .map((sub_category) => ({
                ...sub_category,
                dishes: (sub_category.dishes ?? []).filter(isVisibleMenuDish),
            }))
            .filter((sub_category) => sub_category.dishes.length > 0);

        if (!isSearching) {
            return withDishes;
        }

        return withDishes
            .map((sub_category) => ({
                ...sub_category,
                dishes: sub_category.dishes.filter((dish) => dishMatchesQuery(dish, normalizedQuery)),
            }))
            .filter((sub_category) => sub_category.dishes.length > 0);
    }, [infoCategories.sub_categories, isSearching, normalizedQuery]);

    const searchResults = useMemo(() => {
        if (!isSearching) return [];

        return allDishes.filter(
            (dish) => isVisibleMenuDish(dish) && dishMatchesQuery(dish, normalizedQuery),
        );
    }, [allDishes, isSearching, normalizedQuery]);

    useEffect(() => {
        setSearchQuery("");
    }, [categoryUuid]);

    useEffect(() => {
        if (!location.hash || isSearching) return;

        const targetId = location.hash.slice(1);
        const target = document.getElementById(targetId);
        if (!target) return;

        window.requestAnimationFrame(() => {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    }, [location.hash, infoCategories, isSearching]);

    return (
        <main className="menuPage">
            <div className="menuToolbar">
                <div className="search">
                    <span className="search__iconWrap" aria-hidden="true">
                        <Icon className="search__icon" icon="icomoon-free:search" width={22}/>
                    </span>
                    <input
                        type="search"
                        placeholder="Введіть назву страви"
                        aria-label="Пошук страви"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                    />
                </div>
            </div>

            <div className="menuLayout">
                <aside className="menuSidebar">
                    <p className="menuSidebar__label">Категорії</p>
                    <CarouselCategories categories={categories} layout="sidebar"/>

                    {!isSearching && visibleSubCategories.length > 0 && (
                        <>
                            <p className="menuSidebar__label menuSidebar__label--sub">Підкатегорії</p>
                            <nav className="menuSidebar__subcategories" aria-label="Підкатегорії">
                                {visibleSubCategories.map((sub_category) => (
                                    <a
                                        key={sub_category.uuid}
                                        href={`#sub-${sub_category.uuid}`}
                                        className="menuSidebar__subcategory"
                                    >
                                        {sub_category.name}
                                    </a>
                                ))}
                            </nav>
                        </>
                    )}
                </aside>

                <div className="menuContent">
                    {isSearching ? (
                        <>
                            <h1 className="categoryName">Результати пошуку</h1>
                            <p className="menuSearchSummary">
                                За запитом «{searchQuery.trim()}»
                                {searchResults.length > 0 && ` — знайдено ${searchResults.length}`}
                            </p>
                            {searchResults.length > 0 ? (
                                <DishCardList dishes={searchResults}/>
                            ) : (
                                <p className="menuSearchEmpty">Страв за цим запитом не знайдено</p>
                            )}
                        </>
                    ) : (
                        <>
                            <h1 className="categoryName">{infoCategories.title}</h1>

                            {visibleSubCategories.map((sub_category) =>
                                <section key={sub_category.uuid} id={`sub-${sub_category.uuid}`}>
                                    <div className="subcategories">
                                        <h2>{sub_category.name}</h2>
                                    </div>
                                    <ListDishes sub_category={sub_category}/>
                                </section>)}
                        </>
                    )}
                </div>
            </div>
        </main>
    )
}

export default function CreateCategoryWithDishes() {
    const { uuid } = useParams()
    const {data: infoCategories, isLoading: infoCategoriesLoading} = useCategoryWithDishesQuery(uuid)
    const {data: categories, isLoading: categoriesLoading} = useCategoriesQuery()

    if (infoCategoriesLoading || categoriesLoading) return <PageLoader/>;

    return (
        <RenderListDishesPage infoCategories={infoCategories} categories={categories} />
    )
}
