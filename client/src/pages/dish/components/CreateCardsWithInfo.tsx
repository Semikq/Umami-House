import {Icon} from "@iconify/react";

export default function CreateCardsWithInfo (){
    const infoCards = [
        {title: "Способи оплати", icon: "mynaui:credit-card", text: "Umami House пропонує зручні способи оплати: онлайн карткою під час оформлення замовлення, готівкою при отриманні або через термінал карткою на місці. Обирайте, що підходить саме вам!"},
        {title: "Швидка доставка", icon: "material-symbols:delivery-truck-speed-outline-rounded", text: "Umami House доставляє свіжі страви та заморожену продукцію у термо-сумках, зберігаючи їх свіжість і смак. Обирайте готові страви або заморожені продукти для зручного приготування вдома."},
        {title: "Система лояльності", icon: "basil:present-outline", text: "Umami House дарує знижки! Досягайте певної суми замовлень і отримуйте знижку у відсотках. Також з кожного замовлення накопичуйте 1% бонусів для майбутніх покупок — що більше замовляєте, то вигідніше!"},
        {title: "Якість страви", icon: "streamline-sharp:fork-plate", text: "Наші страви готуються з натуральних продуктів, які ми закуповуємо у фермерів та сертифікованих підприємств. Це гарантує свіжість, якість та чудовий смак у кожному шматочку!"},
    ]

    return (
        <section className="product__info-for-user">
            <div className="wrapper__product__info-for-user">
                {infoCards.map((infoCard, index)=>
                    <div className="product__info-card" key={index}>
                        <div>
                            <h2>{infoCard.title}</h2>
                            <Icon icon={infoCard.icon} width={30} color="#333333"></Icon>
                        </div>
                        <p>{infoCard.text}</p>
                    </div>
                )}
            </div>
        </section>
    )
}