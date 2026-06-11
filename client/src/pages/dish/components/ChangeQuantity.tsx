import {useState} from "react";
import {Icon} from "@iconify/react";

export default function ChangeQuantity ({ IsInCart, setCount }) {
    const [countDish, setCountDish] = useState(IsInCart?.count ?? 1)
    const [countPulse, setCountPulse] = useState(false)

    const updateCount = (next: number) => {
        const safeCount = Math.min(100, Math.max(1, next))
        setCountDish(safeCount)
        setCount(safeCount)
        setCountPulse(true)
        window.setTimeout(() => setCountPulse(false), 280)
    }

    const handleSetCount = (e) => {
        const newCount = Number(e.target.value)
        if (Number.isNaN(newCount)) return
        updateCount(newCount)
    }

    const handleIncrementCount = () => {
        updateCount(countDish + 1)
    }

    const handleDecrementCount = () => {
        updateCount(countDish - 1)
    }

    return (
        <div className="product__quantity">
            <button
                type="button"
                className="product__quantity-btn"
                onClick={handleDecrementCount}
                aria-label="Зменшити кількість"
            >
                <Icon className="icon" icon="stash:minus-solid"/>
            </button>
            <input
                className={`count${countPulse ? " is-pulsing" : ""}`}
                type="number"
                min={1}
                max={100}
                value={countDish}
                onChange={handleSetCount}
                aria-label="Кількість"
            />
            <button
                type="button"
                className="product__quantity-btn"
                onClick={handleIncrementCount}
                aria-label="Збільшити кількість"
            >
                <Icon className="icon" icon="stash:plus-solid"/>
            </button>
        </div>
    )
}
