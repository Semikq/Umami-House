import "./dish.css"
import { dishById } from "../../api/dishes.js"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Icon } from "@iconify/react"

function RenderDishPage({dish}){
    const [count, setCount] = useState(0)

    console.log(dish)

    return (
        <main>
            <div className="blockProduct">
                <div className="blockPhoto">
                    <img src={`${dish.images[0]?.image_url}`} alt="" />
                </div>
                <div className="infoDish">
                    <h1>{dish.name}</h1>
                    <div className="infoWeight">
                        <p>Склад</p>
                        <p>({dish.weight}/10г)</p>
                    </div>
                    <p className="infoIngredients">{dish.ingredients}</p>
                    <div className="typeBuy">
                        {dish.frozen === 1 && 
                            <div className="frozen">
                                <p>Заморожена версія</p>
                                <Icon className="icon" icon="famicons:snow" width={25}/>
                            </div>
                        }
                        <div className="infoBuy">
                            <div>
                                <input type="button" onClick={() => {if (count > 0) setCount(count - 1)}} value="-" />
                                <p>{count}</p>
                                <input type="button" onClick={() => {if (count < 100) setCount(count + 1)}} value=" +" />
                            </div>
                            <input className="basket" type="button" value="У кошик" />
                        </div>
                    </div>
                    <div className="infoForUser">
                        <div className="block">
                            <div>
                                <h2>Способи оплати</h2>
                                <Icon icon="mynaui:credit-card" width={30} color="#333333"></Icon>
                            </div>
                            <p>Umami House пропонує зручні способи оплати: онлайн карткою під час оформлення замовлення, готівкою при отриманні або через термінал карткою на місці. Обирайте, що підходить саме вам!</p>
                        </div>
                        <div className="block">
                            <div>
                                <h2>Швидка доставка</h2>
                                <Icon icon="material-symbols:delivery-truck-speed-outline-rounded" width={30} color="#333333"></Icon>
                            </div>
                            <p>Umami House доставляє свіжі страви та заморожену продукцію у термо-сумках, зберігаючи їх свіжість і смак. Обирайте готові страви або заморожені продукти для зручного приготування вдома.</p>
                        </div>
                        <div className="block">
                            <div>
                                <h2>Система лояльності</h2>
                                <Icon icon="basil:present-outline" width={30} color="#333333"></Icon>
                            </div>
                            <p>Umami House дарує знижки! Досягайте певної суми замовлень і отримуйте знижку у відсотках. Також з кожного замовлення накопичуйте 1% бонусів для майбутніх покупок — що більше замовляєте, то вигідніше!</p>
                        </div>
                        <div className="block">
                            <div>
                                <h2>Якість страви</h2>
                                <Icon icon="streamline-sharp:fork-plate" width={30} color="#333333"></Icon>
                            </div>
                            <p>Наші страви готуються з натуральних продуктів, які ми закуповуємо у фермерів та сертифікованих підприємств. Це гарантує свіжість, якість та чудовий смак у кожному шматочку!</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export function CreateDishPage() {
    const [dish, setDish] = useState()
    const { id } = useParams()

    useEffect(() => {dishById(id).then(result => setDish(result.data))}, [id])

    if (!dish) return <p>Завантаження...</p>

    return (
        <RenderDishPage dish={dish} />
    )
}