import {useState} from "react";
import {Icon} from "@iconify/react";
import getImage from "../../../utils/getImage.ts";

export default function CreateSlider ({sale}) {
    const [index, setIndex] = useState(0)
    const [show, setShow] = useState(true)

    window.addEventListener("resize", () => {
        if(window.innerWidth < 499){
            setShow(false)
        }else {
            setShow(true)
        }
    })

    const nextSlide = () => setIndex((prevIndex) => (prevIndex + 1) % sale.length)
    const prevSlide = () => setIndex((prevIndex) => (prevIndex - 1 + sale.length) % sale.length)

    return (
        <div className="saleSlider">
            <div onClick={() => prevSlide()}>
                <Icon icon="solar:round-arrow-left-broken" className="icon" width={50} height={50} color="#F1C232"></Icon>
            </div>
            <div onClick={() => nextSlide()}>
                <Icon icon="solar:round-arrow-right-broken" className="icon" width={50} height={50} color="#F1C232"></Icon>
            </div>
            {sale.length > 0 && (
                <>
                    {show ? <img className="afisha" src={getImage(sale[((index - 1) + sale.length) % sale.length].image_url)}/> : null}
                    <img className="afisha" src={`${sale[index].image_url}`}/>
                    {show ? <img className="afisha" src={getImage(sale[(index + 1) % sale.length].image_url)}/> : null}
                </>
            )}
        </div>
    )
}