import {Icon} from "@iconify/react";

export default function CreateAdditionalDetails(){
    const additionalDetails = [
        {icon: "solar:city-linear", text: "Доставка здійснюється лише в межах визначеної зони в Полтаві та передмісті!"},
        {icon: "flowbite:dollar-outline", text: "Мінімальна сума замовлення – 1000 грн. Доставка – 140 грн, доступна оплата бонусами на рахунку!"},
        {icon: "tdesign:money", text: "Оплата готівкою або карткою при отриманні у кур’єра, а також під час самовивозу."},
        {icon: "fluent-emoji-high-contrast:two-oclock", text: "Час очікування ~1 година. Точний час залежить від обсягу замовлення та тривалості доставки."},
    ]

    return (
        <div className="contact__additional-details">
            {additionalDetails.map((detail) =>
                <div className="additional-details">
                    <Icon icon={detail.icon} color="#333333"/>
                    <p>{detail.text}</p>
                </div>
            )}
        </div>
    )
}