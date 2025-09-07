import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Icon} from "@iconify/react";
import {showCart} from "../../redux/slices/uiSlice.ts";
import "./mobileCart.css"

function RenderMobileCart(){
    const [isMobile, setIsMobile] = useState(false)
    const { dishes, totalPrice } = useSelector(state => state.cart)
    const dispatch = useDispatch()

    useEffect(() => {
        const handleResize = () =>{
            if (window.innerWidth < 992){
                setIsMobile(true)
            }else {
                setIsMobile(false)
            }
        }
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    return(
        <>
            {isMobile &&
                <div className="mobile__cart" onClick={() => dispatch(showCart())}>
                    <Icon className="mobile__icon--cart" icon="mdi:cart"/>
                    <p className="mobile__text--cart">{`${dishes.length} позиції на суму ${totalPrice}`}</p>
                </div>
            }
        </>
    )
}

export default function CreateMobileCart(){
    return(
        <RenderMobileCart/>
    )
}