import {useSelector} from "react-redux"
import LoyaltyStatus from "../loyalty/LoyaltyStatus.tsx"
import LoyaltyTierPills from "../loyalty/LoyaltyTierPills.tsx"

export default function LoyaltyBanner() {
    const totalPrice = useSelector((state) => state.cart.totalPrice)

    return (
        <div className="loyaltyBanner">
            <LoyaltyStatus totalPrice={totalPrice} />
            <LoyaltyTierPills totalPrice={totalPrice} />
        </div>
    )
}
