import {Icon} from "@iconify/react";

export default function CreateAdditionalInformationCards(){
    const additionalInformation = [
        {title: "Доставка", icon: "material-symbols:delivery-truck-speed-outline-rounded", urlPhoto: "uploads/banners/deliveryBanner.jpg", text: "Мінімальна сума замовлення – 1000 грн. Кожне замовлення ретельно комплектується та доставляється у бездоганному стані – гарячим чи холодним, збереженим у найкращому вигляді. Якщо ви обрали заморожену страву, вона буде привезена у спеціальній термосумці, гарантуючи ідеальну якість."},
        {title: "Самовивіз", icon: "icon-park-outline:delivery", urlPhoto: "uploads/banners/selfPickupBanner.jpg", text: "Самовивіз доступний з нашого ресторану без обмежень по сумі – навіть до 1000 грн! При оформленні замовлення оберіть найближчий ресторан, де вам зручно забрати страви. Якщо виникнуть будь-які питання, ми обов’язково зателефонуємо за номером, вказаним під час замовлення."},
        {title: "Бонуси", icon: "mingcute:check-2-fill", urlPhoto: "uploads/banners/bonusBanner.jpg", text: "За кожне замовлення ви отримуєте 1% бонусів від його суми, які зможете використати для знижки на страви або покриття вартості доставки.\n Також діє наша система лояльності: чим більше ви замовляєте, тим більше ми покриваємо вартість ваших страв у процентах!"},
    ]

    return (
        <div className="contact__section-cards">
            {additionalInformation.map((info, index)  =>
                <div className="section-cards__item" key={index}>
                    <div className="section-cards__header">
                        <h2 className="section-cards__title">{info.title}</h2>
                        <Icon icon={info.icon} width={35} color="#333333"></Icon>
                    </div>
                    <div className="section-cards__content" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${info.urlPhoto})`}}>
                        <p className="section-cards__text">{info.text}</p>
                    </div>
                </div>
            )}
        </div>
    )
}