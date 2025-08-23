import {useState} from "react";
import {Icon} from "@iconify/react";

export default function ChangeQuantity () {
    const [count, setCount] = useState(0)

    return (
        <div className="product__quantity">
            <Icon className="icon" icon="stash:minus-solid" onClick={() => {if (count > 0) setCount(count - 1)}}/>
            <p>{count}</p>
            <Icon className="icon" icon="stash:plus-solid" onClick={() => {if (count < 100) setCount(count + 1)}}/>
        </div>
    )
}