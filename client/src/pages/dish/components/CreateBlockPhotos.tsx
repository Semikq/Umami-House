import {useEffect, useRef, useState} from "react";
import {Icon} from "@iconify/react";
import getImage from "../../../utils/getImage.ts";

function scrollToTop() {
    window.scrollTo({top: 0, behavior: "smooth"});
}

export default function CreateBlockPhotos ({dish}) {
    const [photo, setPhoto] = useState(0)
    const myRef = useRef(null);

    useEffect(() => {
        const container = myRef.current;
        if (!container) return;

        function handleWheel (e){
            e.preventDefault()
            container.scrollLeft += e.deltaY;
        }

        container.addEventListener("wheel", handleWheel, { passive: false });
        return () => container.removeEventListener("wheel", handleWheel);
    }, []);

    const selectPhoto = (index: number) => {
        setPhoto(index);
        scrollToTop();
    };

    return (
        <div className="product__photos">
            <div className="product__photo-spicy">
                <img
                    src={getImage(dish.dish_images[photo]?.image_url)}
                    alt={dish.dish_images[photo]?.title}
                />
                {dish.spicy === true && <Icon icon="mdi:fire" className="icon"/>}
            </div>
            <div className="product__additional-photos" ref={myRef}>
                {dish.dish_images.map((image, i) =>
                    <button
                        type="button"
                        key={image.uuid}
                        className={`product__photo-thumb${photo === i ? " is-active" : ""}`}
                        onClick={() => selectPhoto(i)}
                        aria-label={`Показати фото ${i + 1}`}
                        aria-pressed={photo === i}
                    >
                        <img src={getImage(image.image_url)} alt={image.title}/>
                    </button>
                )}
            </div>
        </div>
    )
}
