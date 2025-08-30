import {Link} from "react-router-dom";

export default function CreateMenu({categories}) {
    return (
        <div className="menu" id="menu">
            {categories.slice(0, 10).map((category) => {
                return (
                    <Link to={`/category/${category.id}`} key={category.id} style={{ backgroundImage: `url(${category.image_url})` }} className="menu-item">
                        <div className="shadow"></div>
                        <p>{category.title}</p>
                    </Link>
                )
            })}
        </div>
    )
}