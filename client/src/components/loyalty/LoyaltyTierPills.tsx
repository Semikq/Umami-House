import {LOYALTY_TIERS} from "../../utils/loyalty.ts"
import "./loyalty.css"

type LoyaltyTierPillsProps = {
    totalPrice?: number,
    className?: string,
    variant?: "default" | "onDark",
}

export default function LoyaltyTierPills({
    totalPrice = 0,
    className = "",
    variant = "default",
}: LoyaltyTierPillsProps) {
    return (
        <div
            className={`loyaltyTierPills${
                variant === "onDark" ? " loyaltyTierPills--onDark" : ""
            }${className ? ` ${className}` : ""}`}
        >
            {LOYALTY_TIERS.map((tier) => (
                <div
                    key={tier.minAmount}
                    className={`loyaltyTierPills__pill${
                        totalPrice >= tier.minAmount ? " loyaltyTierPills__pill--active" : ""
                    }`}
                >
                    <span className="loyaltyTierPills__value">{tier.discount}%</span>
                    <span className="loyaltyTierPills__label">від {tier.minAmount} ₴</span>
                </div>
            ))}
        </div>
    )
}
