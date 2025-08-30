import {useState} from "react";
import {Icon} from "@iconify/react";

export default function CreateFormRateProduct(){
    const stars = Array(5).fill(0)
    const [index, setIndex] = useState(0)
    const [rating, setRating] = useState(0)

    return(
        <section className="comment__card">
            <h1>Залиши свою оцінку та коментарь!</h1>
            <div className="comment__info">
                <div className="comment__info-rating">
                    {stars.map((_, i) => (
                        <Icon icon={i + 1 <= (index || rating) ? "bxs:star" : "bx:star"} key={i} onClick={() => setRating(i + 1)} onMouseEnter={() => setIndex(i + 1)} onMouseLeave={() => setIndex(0)} width={30} className="rating" color="#F1C232"/>
                    ))}
                </div>
                <div className="comment__addition-comment">
                    <input type="text" placeholder="Коментарь..."/>
                    <Icon icon="tabler:message" className="icon" width={36}/>
                </div>
            </div>
        </section>
    )
}