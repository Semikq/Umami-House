import {useState} from "react";
import {Icon} from "@iconify/react";

export default function CreateUserComment({infoComment}) {
    const stars = Array(5).fill(0)
    const [showComment, setShowComment] = useState(false)

    return(
        <section className="comment__card">
            <h1>{infoComment.users.name}</h1>
            <div className="comment__info">
                <div className="comment__info-rating">
                    {stars.map((_, i) => (
                        <Icon icon={i < infoComment.rating ? "bxs:star" : "bx:star"} key={i} className="comment__rating" color="#F1C232"/>
                    ))}
                </div>
                <div className={`${infoComment.comment.length > 50 && (showComment === true ? "showCommentContainer" : "")} comment__info-comment`}>
                    <p className={`product__comment ${showComment === true && "showComment"}`}>{infoComment.comment}</p>
                    <Icon icon="eva:arrow-right-fill" onClick={() => setShowComment(!showComment)} className={`${showComment === true && "active"} icon`}/>
                </div>
            </div>
        </section>
    )
}