import { Icon } from "@iconify/react"
import "./contact.css"

export function CreateContactPage() {
    return (
        <main>
            <h1>Контакти та доставка</h1>
            <div className="contact">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d99548.49482489104!2d34.47466703983075!3d49.603874383949865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d825e425e6ba6b%3A0xcf3e6bdfb9e4ca82!2z0J_QvtC70YLQsNCy0LAsINCf0L7Qu9GC0LDQstGB0YzQutCwINC-0LHQu9Cw0YHRgtGMLCAzNjAwMA!5e1!3m2!1suk!2sua!4v1750074314073!5m2!1suk!2sua" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                <div className="infoForUser">
                    <h2>Доставка</h2>
                    <div className="contactInfo">
                        <div>
                            <Icon icon="icon-park-outline:delivery" width={40} height={40} color="#333333"></Icon>
                            <p>Самовивіз -5%</p>
                        </div>
                        <div>
                            <Icon icon="fluent:phone-vibrate-20-regular" width={40} height={40} color="#333333"></Icon>
                            <p>(096) 323-32-23</p>
                            <p>(099) 343-23-43</p>
                        </div>
                        <div>
                            <Icon icon="streamline-ultimate:shop-like" width={40} height={40} color="#333333"></Icon>
                            <p>Щодня 10:00 - 21:00</p>
                        </div>
                    </div>
                    <div className="additionalInfo">
                        <div>
                            <Icon className="icon" icon="solar:city-linear" width={50} height={40} color="#333333"></Icon>
                            <p>Доставка здійснюється лише в межах визначеної зони в Полтаві та передмісті!</p>
                        </div>
                        <div>
                            <Icon className="icon" icon="flowbite:dollar-outline" width={50} height={40}  color="#333333"></Icon>
                            <p>Мінімальна сума замовлення – 1000 грн. Доставка – 140 грн, доступна оплата бонусами на рахунку!</p>
                        </div>
                        <div>
                            <Icon className="icon" icon="tdesign:money" width={50} height={40}  color="#333333"></Icon>
                            <p>Оплата готівкою або карткою при отриманні у кур’єра, а також під час самовивозу.</p>
                        </div>
                        <div>
                            <Icon className="icon" icon="fluent-emoji-high-contrast:two-oclock" width={50} height={40}  color="#333333"></Icon>
                            <p>Час очікування ~1 година. Точний час залежить від обсягу замовлення та тривалості доставки.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="additionalInformationCards">
                <div>
                    <div className="infoCard">
                        <h2>Доставка</h2>
                        <Icon width={35} icon="material-symbols:delivery-truck-speed-outline-rounded" color="#333333"></Icon>
                    </div>
                    <div className="card" style={{backgroundImage: 'url("http://localhost:3001/uploads/banner/deliveryBanner.jpg")'}}>
                        <p>Мінімальна сума замовлення – 1000 грн. Кожне замовлення ретельно комплектується та доставляється у бездоганному стані – гарячим чи холодним, збереженим у найкращому вигляді. Якщо ви обрали заморожену страву, вона буде привезена у спеціальній термосумці, гарантуючи ідеальну якість.</p>
                    </div>
                </div>
                <div>
                    <div className="infoCard">
                        <h2>Самовивіз</h2>
                        <Icon width={35} icon="icon-park-outline:delivery" color="#333333"></Icon>
                    </div>
                    <div className="card" style={{backgroundImage: 'url("http://localhost:3001/uploads/banner/selfPickupBanner.jpg")',}}>
                        <p>Самовивіз доступний з нашого ресторану без обмежень по сумі – навіть до 1000 грн! При оформленні замовлення оберіть найближчий ресторан, де вам зручно забрати страви. Якщо виникнуть будь-які питання, ми обов’язково зателефонуємо за номером, вказаним під час замовлення.</p>
                    </div>
                </div>
                <div>
                    <div className="infoCard">
                        <h2>Бонуси</h2>
                        <Icon width={35} icon="mingcute:check-2-fill" color="#333333"></Icon>
                    </div>
                    <div className="card" style={{backgroundImage: 'url("http://localhost:3001/uploads/banner/bonusBanner.jpg")',}}>
                        <p>За кожне замовлення ви отримуєте 1% бонусів від його суми, які зможете використати для знижки на страви або покриття вартості доставки.
                            Також діє наша система лояльності: чим більше ви замовляєте, тим більше ми покриваємо вартість ваших страв у процентах! </p>
                    </div>
                </div>
            </div>
        </main>
    )
}