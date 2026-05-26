import {useEffect, useRef, useState} from "react";
import {Icon} from "@iconify/react";
import getImage from "../../../utils/getImage.ts";

export default function CreateBlockPhotos ({dish}) {
    const [photo, setPhoto] = useState(0)
    const myRef = useRef(null);

    useEffect(() => {
        const container = myRef.current;

        function handleWheel (e){
            e.preventDefault()
            container.scrollLeft += e.deltaY;
        }

        container.addEventListener("wheel", handleWheel, { passive: false });
        return () => container.removeEventListener("wheel", handleWheel);
    }, []);

    return <div className="product__photos">
        <div className="product__photo-spicy">
            <img src={getImage(dish.dish_images[photo]?.image_url)} alt={dish.dish_images[photo]?.title}/>
            {dish.spicy === true && <Icon icon="mdi:fire" className="icon"/>}
        </div>
        <div className="product__additional-photos" ref={myRef}>
            {dish.dish_images.map((image, i) =>
                <img src={getImage(image.image_url)} alt={image.title} key={image.uuid} onClick={() => setPhoto(i)} />
            )}
        </div>
    </div>
}