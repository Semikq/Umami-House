import {Link, useParams} from "react-router-dom";
import {Icon} from "@iconify/react";
import {Categories} from "../../../redux/types/dishes.ts";

type CarouselCategoriesProps = {
    categories: Categories[],
    layout?: "horizontal" | "sidebar",
};

export default function CarouselCategories({
    categories,
    layout = "horizontal",
}: CarouselCategoriesProps) {
    const { uuid } = useParams();
    const isSidebar = layout === "sidebar";

    if (isSidebar) {
        return (
            <nav className="menuSidebar__categories" aria-label="Категорії меню">
                {categories.map((category) => {
                    const isActive = category.uuid === uuid;

                    return (
                        <Link
                            to={`/category/${category.uuid}`}
                            className={`menuSidebar__category${isActive ? " menuSidebar__category--active" : ""}`}
                            key={category.uuid}
                            aria-current={isActive ? "page" : undefined}
                        >
                            <span>{category.title}</span>
                            {isActive && (
                                <Icon className="menuSidebar__category-icon" icon="solar:alt-arrow-right-linear" width={16}/>
                            )}
                        </Link>
                    );
                })}
            </nav>
        );
    }

    return (
        <nav className="menuCategoriesWrap" aria-label="Категорії меню">
            <div className="menuCategories">
                {categories.map((category) => {
                    const isActive = category.uuid === uuid;

                    return (
                        <Link
                            to={`/category/${category.uuid}`}
                            className={`listCategory${isActive ? " active" : ""}`}
                            key={category.uuid}
                            aria-current={isActive ? "page" : undefined}
                        >
                            <span>{category.title}</span>
                            <Icon className="listCategory__arrow" icon="solar:alt-arrow-right-linear" width={16}/>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
