import {Link} from "react-router-dom";
import getImage from "../../../utils/getImage.ts";

export default function CreateMenu({categories}) {
    return (
        <div className="menu" id="menu">
            {categories.slice(0, 10).map((category) => {
                if (!category?.image_url) return null;

                return (
                    <Link to={`/category/${category.uuid}`} key={category.uuid} style={{ 
                        backgroundImage: `url(${
                          category.image_url.startsWith('http') 
                            ? category.image_url 
                            : getImage(category.image_url)
                        })` 
                      }} className="menu-item">
                        <div className="shadow"></div>
                        <p>{category.title}</p>
                    </Link>
                )
            })}
        </div>
    )
}