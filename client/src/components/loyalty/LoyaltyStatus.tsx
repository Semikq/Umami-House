import {getLoyaltyPricing} from "../../utils/loyalty.ts"
import "./loyalty.css"

type LoyaltyStatusProps = {
    totalPrice: number,
    className?: string,
}

export default function LoyaltyStatus({ totalPrice, className = "" }: LoyaltyStatusProps) {
    const { discountPercent, saved, nextTier, amountToNext } = getLoyaltyPricing(totalPrice)

    return (
        <div className={`loyaltyStatus${className ? ` ${className}` : ""}`}>
            <div className="loyaltyStatus__row">
                <span className="loyaltyStatus__text">Маєте знижку:</span>
                <span className="loyaltyStatus__badge">{discountPercent}%</span>
                <span className="loyaltyStatus__badge">Заощаджено: {saved} грн</span>
            </div>
            <div className="loyaltyStatus__row">
                <span className="loyaltyStatus__text">Сума кошику:</span>
                <span className="loyaltyStatus__badge">{totalPrice} грн</span>
                {nextTier && (
                    <span className="loyaltyStatus__hint">
                        Додайте ще на {amountToNext} грн їжу в кошик, щоб одержати {nextTier.discount}% знижку
                    </span>
                )}
            </div>
        </div>
    )
}
