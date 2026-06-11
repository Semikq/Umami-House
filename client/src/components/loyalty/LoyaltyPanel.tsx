import LoyaltyStatus from "./LoyaltyStatus.tsx"
import LoyaltyTierPills from "./LoyaltyTierPills.tsx"
import "./loyalty.css"

type LoyaltyPanelProps = {
    totalPrice: number,
    className?: string,
    tierVariant?: "default" | "onDark",
}

export default function LoyaltyPanel({
    totalPrice,
    className = "",
    tierVariant = "default",
}: LoyaltyPanelProps) {
    return (
        <div className={`loyaltyPanel${className ? ` ${className}` : ""}`}>
            <LoyaltyStatus totalPrice={totalPrice} />
            <LoyaltyTierPills totalPrice={totalPrice} variant={tierVariant} />
        </div>
    )
}
