import {useEffect, useRef, useState} from "react";
import {Icon} from "@iconify/react";
import getImage from "../../../utils/getImage.ts";
import {sanitizeDishImages} from "../../../utils/dishImages.ts";
import {Dish} from "../../../redux/types/dishes.ts";

function scrollToTop() {
    window.scrollTo({top: 0, behavior: "smooth"});
}

export default function CreateBlockPhotos ({dish}: { dish: Dish }) {
    const photos = sanitizeDishImages(dish.dish_images);
    const [photo, setPhoto] = useState(0);
    const myRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (photo >= photos.length) {
            setPhoto(0);
        }
    }, [photo, photos.length]);

    useEffect(() => {
        const container = myRef.current;
        if (!container) return;

        function handleWheel (e: WheelEvent){
            e.preventDefault();
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
                {photos.length > 0 ? (
                    <img
                        src={getImage(photos[photo]?.image_url ?? "")}
                        alt={photos[photo]?.title ?? dish.name}
                    />
                ) : (
                    <div className="product__photo-placeholder" aria-hidden="true">
                        <Icon icon="mdi:image-off-outline" width={48}/>
                    </div>
                )}
                {dish.spicy === true && <Icon icon="mdi:fire" className="icon"/>}
            </div>
            {photos.length > 1 && (
                <div className="product__additional-photos" ref={myRef}>
                    {photos.map((image, i) =>
                        <button
                            type="button"
                            key={image.image_url + i}
                            className={`product__photo-thumb${photo === i ? " is-active" : ""}`}
                            onClick={() => selectPhoto(i)}
                            aria-label={`Показати фото ${i + 1}`}
                            aria-pressed={photo === i}
                        >
                            <img src={getImage(image.image_url)} alt={image.title}/>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
