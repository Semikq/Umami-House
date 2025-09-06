import "./cart.css"
import {showCart} from "../../redux/slices/uiSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {Icon} from "@iconify/react";
import CartListDishes from "./components/CartListDishes.tsx";

function RenderCartBloc(){
    const dispatch = useDispatch()
    const cartDishes = useSelector(state => state.cart)

    return(
        <div className="cart-backdrop" onClick={() => dispatch(showCart())}>
            <div className="cart" onClick={(e) => e.stopPropagation()}>
                <div className="cart__header">
                    <h1 className="cart__header-title">Кошик</h1>
                    <Icon className="cart__header-icon" icon="ic:round-close" onClick={() => dispatch(showCart())}/>
                </div>
                <CartListDishes cartDishes={cartDishes}/>
                <div className="cart__footer">
                    <button className="footer__button-continue" onClick={() => dispatch(showCart())}>Продовжити покупки</button>
                    <div className="footer__controls">
                        <div className="controls__totalPrice-bloc">
                            <p className="controls__totalPrice-text">Разом</p>
                            <p className="footer__controls-totalPrice">{cartDishes.totalPrice.toLocaleString('uk-UA')} <Icon icon="mdi:currency-uah"/></p>
                        </div>
                        <button className="footer__controls-button">Оформити замовлення</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function CreateCartBloc(){
    return(
        <RenderCartBloc/>
    )
}