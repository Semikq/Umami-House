import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {fetchCategoryWithDishes} from "../../api/dish.tsx"

export default function CreatePageCategories () {
    const { id }  = useParams()
    console.log(id)
    const [category, setCategory] = useState()
    useEffect(() => {
        fetchCategoryWithDishes(id).then(result => setCategory(result))
    }, []);
    console.log(category)
    console.log("DASDSA")
    return(
        <div>
            <h1>dasdadsad</h1>
        </div>
    )
}