import {Link, useParams} from "react-router-dom";
import {useEffect, useRef} from "react";
import {Icon} from "@iconify/react";

export default function CarouselCategories ({categories}){
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
            {categories.map((category, i) =>
                <Link to={`/category/${category.id}`} className={`listCategory ${category.id === activeCategory.id ? "active" : ""}`} key={i}>
                    <h2>{category.title}</h2>
                    <Icon className="icon" icon="solar:alt-arrow-right-linear" width={20}></Icon>
                </Link>
            )}
        </div>
    )
}