import {Icon} from "@iconify/react";

type OrderSuccessModalProps = {
    onClose: () => void,
    onGoToProfile: () => void,
}

export default function OrderSuccessModal({ onClose, onGoToProfile }: OrderSuccessModalProps) {
    return (
        <div className="cart-success">
            <div className="cart-success__card" onClick={(e) => e.stopPropagation()}>
                <div className="cart-success__icon-wrap">
                    <Icon icon="mdi:check-circle" className="cart-success__icon"/>
                </div>
                <h2 className="cart-success__title">Замовлення оформлено!</h2>
                <p className="cart-success__text">
                    Дякуємо за замовлення. Ми вже отримали його та незабаром почнемо готувати ваші страви.
                </p>
                <div className="cart-success__actions">
                    <button type="button" className="cart-success__button cart-success__button--secondary" onClick={onClose}>
                        Закрити
                    </button>
                    <button type="button" className="cart-success__button cart-success__button--primary" onClick={onGoToProfile}>
                        До профілю
                    </button>
                </div>
            </div>
        </div>
    );
}
