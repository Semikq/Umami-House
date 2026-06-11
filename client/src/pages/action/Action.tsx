import "./action.css";
import CreateSlider from "../main/components/CreateSlider.tsx";
import {useSaleQuery} from "../../redux/api/saleApi.ts";
import PageLoader from "../../components/PageLoader/PageLoader.tsx";
import getImage from "../../utils/getImage.ts";
const LOYALTY_DISCOUNTS = [
    { amount: 1500, discount: 5 },
    { amount: 3000, discount: 8 },
    { amount: 5000, discount: 12 },
];

const BONUS_CARDS = [
    {
        title: "Накопичуйте бонуси з кожним замовленням",
        image: "/uploads/action/bonus1.png",
        paragraphs: [
            "Ми цінуємо наших гостей і хочемо, щоб кожне ваше замовлення було ще приємнішим! Саме тому у нас діє бонусна система, яка дозволяє вам отримувати 4% від суми замовлення у вигляді бонусів.",
            "Як це працює? Дуже просто! Оформлюючи замовлення, ви автоматично накопичуєте бонуси на свій рахунок. Використовуйте їх при наступних покупках та отримуйте ще більше улюблених страв без зайвих витрат!",
            "Більше замовлень – більше накопичень!",
        ],
    },
    {
        title: "Ще більше бонусів для великих замовлень!",
        image: "/uploads/action/bonus2.png",
        paragraphs: [
            "Замовляєте для компанії чи просто вирішили потішити себе справжнім азіатським бенкетом? Тоді у нас є ще приємніший бонус!",
            "Якщо загальна сума вашого кошика перевищує 1000 грн, ви все одно отримуєте 4% від вартості замовлення бонусами. Тож чим більше ви замовляєте, тим більше вигоди отримуєте!",
            "Смакуйте, насолоджуйтесь, накопичуйте бонуси та використовуйте їх у наступних замовленнях!",
        ],
    },
    {
        title: "Ваш бонусний рахунок завжди з вами",
        image: "/uploads/action/bonus3.png",
        paragraphs: [
            "Ми подбали про те, щоб ваша бонусна система була максимально простою та зручною. Усі бонуси закріплюються за вашим номером телефону, з якого оформлюється замовлення.",
            "Це означає, що ви ніколи не втратите свої накопичені бонуси – вони завжди будуть доступні у вашому особистому кабінеті. Просто вводьте свій номер під час замовлення, і система автоматично нарахує вам бонуси або дозволить їх використати для знижки на нову покупку!",
        ],
    },
];

function RenderActionPage({sale}) {
    return (
        <main>
            <h1 className="action__title">Наші акційні пропозиції</h1>
            <CreateSlider sale={sale ?? []} />

            <section className="action__loyalty">
                <h2 className="action__sectionTitle">Про систему лояльності!</h2>
                <div
                    className="action__loyalty-banner"
                    style={{
                        backgroundImage: `url(${getImage("/uploads/action/sustemLoal.png")})`,
                    }}
                >
                    <div className="action__loyalty-inner">
                        <div className="action__loyalty-content">
                            <h3 className="action__loyalty-heading">Лояльність до гостей від Umami House</h3>
                            <p className="action__loyalty-text">
                                Ми знаємо, що справжнє задоволення – це не лише смачні роли, а й приємні бонуси. Саме тому ми створили систему лояльності, яка робить ваші замовлення ще вигіднішими!
                            </p>
                            <ul className="action__loyalty-list">
                                <li>
                                    <strong>Більше замовлень – більше вигоди!</strong> Ми хочемо, щоб кожне ваше замовлення приносило не лише смакове задоволення, а й приємні сюрпризи. Тому у нас діють автоматичні знижки, які активуються при досягненні певної суми у кошику. Чим більше ви замовляєте, тим вигідніше для вас!
                                </li>
                                <li>
                                    <strong>Смакуйте з вигодою!</strong> Ми піклуємось про ваш комфорт та раді дарувати вам не лише улюблені суші, а й чудові емоції.
                                </li>
                            </ul>
                            <p className="action__loyalty-text">
                                Просто додавайте улюблені страви в кошик, а про бонуси ми подбаємо самі!
                            </p>
                        </div>

                        <div className="action__loyalty-discounts">
                            <h4 className="action__discounts-title">Знижки котрі ми пропонуємо</h4>
                            <div className="action__discount-box">
                                {LOYALTY_DISCOUNTS.map((tier, index) => (
                                    <div className="action__discount-row" key={tier.amount}>
                                        {index > 0 && <div className="action__discount-divider" />}
                                        <p className="action__discount-amount">Від {tier.amount} грн</p>
                                        <p className="action__discount-value">{tier.discount}% на увесь кошик</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="action__bonuses">
                <h2 className="action__sectionTitle">Накопичення за покупку!</h2>
                <div className="action__bonuses-grid">
                    {BONUS_CARDS.map((card, index) => (
                        <article
                            className="action__bonus-card"
                            key={index}
                            style={{
                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(${getImage(card.image)})`,
                            }}
                        >
                            <div className="action__bonus-content">
                                <h3 className="action__bonus-title">{card.title}</h3>
                                {card.paragraphs.map((paragraph, paragraphIndex) => (
                                    <p className="action__bonus-text" key={paragraphIndex}>{paragraph}</p>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default function CreateActionPage() {
    const {data: sale, isLoading} = useSaleQuery();

    if (isLoading) return <PageLoader />;

    const activeSales = sale?.filter((item) => item.active) ?? [];

    return <RenderActionPage sale={activeSales} />;
}
