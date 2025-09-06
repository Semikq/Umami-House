import {useState} from "react";
import {Icon} from "@iconify/react";

export default function ChangeQuantity ({ IsInCart, setCount }) {
    const [countDish, setCountDish] = useState(IsInCart?.count | 1)

    const handleSetCount = (e) => {
        let newCount = Number(e.target.value)
        if (newCount < 0) newCount = 1
        if (newCount > 100) return
        setCountDish(newCount)
        setCount(newCount)
    }

    const handleIncrementCount = () => {
        if (countDish < 100) setCountDish(countDish + 1); setCount(countDish + 1)
    }

    const handleDecrementCount = () => {
        if (countDish > 1) setCountDish(countDish - 1); setCount(countDish - 1)
    }

    return (
        <div className="product__quantity">
            <Icon className="icon" icon="stash:minus-solid" onClick={handleDecrementCount}/>
            <input className="count" type="number" value={countDish || 1} onChange={handleSetCount}/>
            <Icon className="icon" icon="stash:plus-solid" onClick={handleIncrementCount}/>
        </div>
    )
}