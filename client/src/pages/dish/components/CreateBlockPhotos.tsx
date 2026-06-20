import {useEffect, useRef, useState} from "react";
import {Icon} from "@iconify/react";
import getImage from "../../../utils/getImage.ts";

function scrollToTop() {
    window.scrollTo({top: 0, behavior: "smooth"});
}

export default function CreateBlockPhotos ({dish}) {
    const photos = (dish.dish_images ?? []).filter((image) => image?.image_url);
    const [photo, setPhoto] = useState(0)
    const myRef = useRef(null);

    useEffect(() => {
        if (photo >= photos.length) {
            setPhoto(0);
        }
    }, [photo, photos.length]);

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
                    src={getImage(photos[photo]?.image_url)}
                    alt={photos[photo]?.title}
                />
                {dish.spicy === true && <Icon icon="mdi:fire" className="icon"/>}
            </div>
            <div className="product__additional-photos" ref={myRef}>
                {photos.map((image, i) =>
                    <button
                        type="button"
                        key={image.uuid ?? `${image.image_url}-${i}`}
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
