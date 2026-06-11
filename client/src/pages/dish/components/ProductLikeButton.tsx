import {useState} from "react";
import {Icon} from "@iconify/react";

interface ProductLikeButtonProps {
    liked?: boolean;
    onToggle?: () => void;
}

export default function ProductLikeButton({liked: likedProp, onToggle}: ProductLikeButtonProps) {
    const [likedLocal, setLikedLocal] = useState(false)
    const [animating, setAnimating] = useState(false)

    const liked = likedProp ?? likedLocal

    const toggleLike = () => {
        if (onToggle) onToggle()
        else setLikedLocal((prev) => !prev)

        setAnimating(true)
        window.setTimeout(() => setAnimating(false), 520)
    }

    return (
        <button
            type="button"
            className={`product__like-button${liked ? " is-liked" : ""}${animating ? " is-animating" : ""}`}
            onClick={toggleLike}
            aria-label={liked ? "Прибрати з обраного" : "Додати в обране"}
            aria-pressed={liked}
        >
            <Icon icon={liked ? "mdi:heart" : "line-md:heart"}/>
        </button>
    )
}
