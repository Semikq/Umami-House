import "./company.css"
import {Icon} from "@iconify/react";
import {useDispatch} from "react-redux";
import getImage from "../../utils/getImage.ts";
import {showAuth} from "../../redux/slices/uiSlice.ts";

const priorityCards = [
    {
        title: "Якість",
        icons: ["mingcute:check-2-fill"],
        image: "/uploads/company/prioritet1.png",
        text: "Наші страви готуються лише зі свіжих інгредієнтів: добірний рис, свіжа риба та натуральні соуси. Кожен шматочок суші чи ложка рамену – це досконалий баланс смаку та аромату. Довіртеся майстерності наших кухарів і насолоджуйтеся стравами, які дарують радість!",
    },
    {
        title: "Наша команда",
        icons: ["mdi:account-group-outline"],
        image: "/uploads/company/prioritet2.png",
        text: "Наша команда – це досвідчені кухарі та майстри своєї справи, які вкладають знання, талант і душу у кожну деталь. Кожен із нас має багаторічний досвід, завдяки чому ми знаємо, як створити страви, які тішать і смак, і очі. Ми постійно вдосконалюємо свої навички, щоб дарувати вам найкраще.",
    },
    {
        title: "Цінність смаку",
        icons: ["mdi:currency-usd", "mingcute:check-2-fill"],
        image: "/uploads/company/prioritet3.png",
        text: "Ми створюємо баланс між високою якістю та справедливою ціною. Кожен наш клієнт може бути впевнений: те, за що ви платите, повністю виправдовує очікування. Від уваги до деталей до турботи про ваш комфорт – ми прагнемо зробити кожен вибір справді вартісним.",
    },
];

const cooperationBenefits = [
    {
        icon: "mdi:file-document-outline",
        text: "Отримуєте перевірену і успішну модель, що забезпечує стабільність і швидкий старт вашого ресторанного бізнесу без великих ризиків.",
    },
    {
        icon: "mdi:account-cog-outline",
        text: "Ми надаємо всебічну підтримку на кожному етапі: від відкриття до розвитку, допомагаючи вам у всіх аспектах бізнесу.",
    },
    {
        icon: "mdi:shield-check-outline",
        text: "Співпраця з Umami House дозволяє вам працювати під вже відомим брендом, що гарантує привабливість і довіру клієнтів.",
    },
    {
        icon: "mdi:newspaper-variant-outline",
        text: "Ми надаємо рекламні матеріали та стратегії для просування вашого закладу, що допомагає залучити нових клієнтів.",
    },
    {
        icon: "mdi:cash-multiple",
        text: "Завдяки налагодженій бізнес-моделі, ви можете очікувати швидке повернення інвестицій і стабільний дохід.",
    },
    {
        icon: "mdi:arrow-expand-vertical",
        text: "Партнерство з нами дає можливість розширювати бізнес, відкриваючи нові заклади та досягаючи ще більших результатів.",
    },
];

const productBenefits = [
    {
        icon: "mdi:snowflake",
        text: "Шокове заморожування гарантує свіжість продуктів, що підвищує якість страв у вашому закладі та відповідність високим стандартам.",
    },
    {
        icon: "mdi:silverware-fork-knife",
        text: "Продукція, що вимагає мінімум часу для приготування, дозволяє зменшити навантаження на кухарів і скоротити витрати на оплату праці.",
    },
    {
        icon: "mdi:truck-delivery-outline",
        text: "Ми забезпечуємо безперебійне постачання продукції в будь-який час, що гарантує стабільність вашого бізнесу.",
    },
    {
        icon: "mdi:forum-outline",
        text: "Ми допоможемо налаштувати постачання продукції та надамо консультації з усіх питань щодо продуктів і замовлень.",
    },
    {
        icon: "icon-park-outline:certificate",
        text: "Ми гарантуємо високу якість кожної партії продукції, яка відповідає всім санітарно-гігієнічним вимогам та стандартам.",
    },
    {
        icon: "mdi:clipboard-check-outline",
        text: "Ви матимете можливість самостійно регулювати обсяги продажів, мінімізуючи списання продукції, що дозволить оптимізувати витрати.",
    },
];

const productAdvantages = [
    {
        type: "text",
        variant: "burgundy",
        title: "Наша кухня!",
        text: "На нашій кухні працюють досвідчені кухарі з багаторічним досвідом, які володіють високим рівнем професіоналізму. Завдяки їхнім навичкам, кожне приготування страви виконується з увагою до деталей та дотриманням найкращих стандартів.",
    },
    {
        type: "image",
        src: "/uploads/company/ourProduct1.png",
        alt: "Кухня Umami House",
    },
    {
        type: "text",
        variant: "burgundy",
        title: "Наші страви!",
        text: "У наших ресторанах ви завжди можете розраховувати на якісні страви, приготовані з найкращих інгредієнтів. Ми приділяємо особливу увагу кожному етапу приготування, щоб забезпечити незабутній смак і презентацію кожної страви, задовольняючи найвибагливіших гостей.",
    },
    {
        type: "image",
        src: "/uploads/company/ourProduct2.png",
        alt: "Страви Umami House",
    },
    {
        type: "image",
        src: "/uploads/company/ourProduct3.png",
        alt: "Сертифікат безпеки харчових продуктів Umami House",
    },
    {
        type: "text",
        variant: "yellow",
        title: "Усе безпечно!",
        text: "Вся продукція сертифікована та відповідає високим стандартам безпеки. Ми дотримуємося всіх вимог харчової безпеки, і наші процеси сертифіковані за стандартом ISO 20000:2025, що гарантує безпечність та якість кожної страви.",
    },
    {
        type: "image",
        src: "/uploads/company/ourProduct4.png",
        alt: "Оплата в ресторані Umami House",
    },
    {
        type: "text",
        variant: "yellow",
        title: "Доступність!",
        text: "Наші ціни є помірними, при цьому відповідають високій якості страв. Завдяки системі лояльності, гості можуть отримувати знижки, бонуси та інші вигоди, що робить кожен візит ще більш приємним і вигідним.",
    },
    {
        type: "text",
        variant: "burgundy",
        title: "Преміум упакування!",
        text: "Наша заморожена продукція поставляється в преміум упаковці, яка забезпечує надійний захист від зовнішніх факторів та зберігає свіжість продуктів. Високоякісна упаковка не тільки гарантує безпечне зберігання, але й підкреслює естетичний вигляд продукції.",
    },
    {
        type: "image",
        src: "/uploads/company/ourProduct5.png",
        alt: "Упаковка продукції Umami House Seafood",
    },
    {
        type: "text",
        variant: "burgundy",
        title: "Наша продукція!",
        text: "Ми пропонуємо лише якісну заморожену продукцію, яка зберігає всі свої корисні властивості та смакові якості завдяки шоковому заморожуванню. Це гарантує свіжість і неперевершений смак страв, що дозволяє забезпечити високий рівень обслуговування у вашому закладі.",
    },
    {
        type: "image",
        src: "/uploads/company/ourProduct6.png",
        alt: "Шокове заморожування продукції Umami House",
    },
];

function BenefitGrid({items}) {
    return (
        <div className="company__benefits-grid">
            {items.map((item, index) => (
                <div className="company__benefit-item" key={index}>
                    <Icon className="company__benefit-icon" icon={item.icon} width={36} color="#333333" />
                    <p className="company__benefit-text">{item.text}</p>
                </div>
            ))}
        </div>
    );
}

function RenderCompanyPage(){
    const dispatch = useDispatch();

    return(
        <main>
            <h1 className="company__title">Про нас</h1>
            <div className="company__aboutUs" style={{backgroundImage: `url(${getImage("/uploads/company/Umami-House_Restaurant.png")})`}}>
                <div className="company__aboutUs-content">
                    <h2 className="aboutUs__title">Ласкаво просимо до Umami House!</h2>

                    <div className="aboutUs__info">
                        <p className="aboutUs__info--text">
                            Ми – майстри азійської кухні, які пропонують справжнє задоволення смаком. У нашому асортименті ви знайдете:
                        </p>
                        <ul className="aboutUs__list">
                            <li>Вишукані азійські страви, що розкривають багатство традиційних рецептів.</li>
                            <li>Заморожені делікатеси, які зберігають свіжість та неповторний смак.</li>
                        </ul>
                        <button type="button" className="aboutUs__button">Дізнайся про нас більше!</button>
                    </div>

                    <div className="aboutUs__info">
                        <p className="aboutUs__info--text">
                            Познайомтеся з нашою історією, цінностями та тим, що робить Umami House особливим.
                        </p>
                        <ul className="aboutUs__list">
                            <li>Відкрийте власний ресторан під брендом Umami House.</li>
                            <li>Замовляйте заморожену продукцію для вашого бізнесу.</li>
                        </ul>
                        <button type="button" className="aboutUs__button">Дізнатися про співпрацю!</button>
                    </div>

                    <p className="aboutUs__footer">
                        Ми завжди готові до співпраці та відкриті для нових можливостей!
                    </p>
                </div>
            </div>

            <section className="company__aboutCompany">
                <h2 className="company__sectionTitle">Про компанію</h2>

                <div className="company__row">
                    <div className="company__row-text">
                        <p>
                            Ідея створення Umami House виникла з щирої любові до азійської кухні — суші, ролів, локшини та інших страв, які дарують справжнє гастрономічне задоволення. Ми поставили перед собою мету зробити цю кухню доступною для кожного, тому розробили унікальні заморожені версії наших страв.
                        </p>
                        <p>
                            Наша мережа виросла з перших ресторанів преміум-класу до повноцінної служби доставки, що охоплює десятки міст. Кожен заклад Umami House — це простір, де поєднуються стиль, якість та увага до деталей.
                        </p>
                        <p>
                            Ми віримо, що смачна їжа — це не лише продукти, а й сервіс, атмосфера та турбота. Наша команда прагне, щоб кожен гість відчував себе особливим і отримував справжню подорож у світ азійських смаків.
                        </p>
                    </div>
                    <img
                        className="company__row-image"
                        src={getImage("/uploads/company/rest1.png")}
                        alt="Інтер'єр ресторану Umami House"
                    />
                </div>

                <div className="company__row company__row--reverse">
                    <img
                        className="company__row-image"
                        src={getImage("/uploads/company/rest2.png")}
                        alt="Кухар Umami House"
                    />
                    <div className="company__row-text">
                        <p>
                            Umami House — це не просто ресторан або служба доставки. Ми поєднуємо найкраще з азійської кухні з інноваційними підходами, щоб дарувати нашим клієнтам неперевершений смак і комфорт. Ось що робить нас особливими:
                        </p>
                        <ul className="company__features-list">
                            <li>
                                <strong>Інноваційний підхід до заморожених страв</strong> — ми зберігаємо всі смакові якості та свіжість, щоб ви могли насолоджуватись справжньою азійською кухнею вдома, у будь-який час.
                            </li>
                            <li>
                                <strong>Преміум сервіс</strong> — кожен наш ресторан — це місце для справжніх гурманів, де ви відчуєте атмосферу розкоші, елегантності та першокласного обслуговування.
                            </li>
                            <li>
                                <strong>Досвідчені кухарі</strong> — наша команда складається з професіоналів, які знають, як створювати страви, що тішать не тільки смак, а й серце.
                            </li>
                            <li>
                                <strong>Турбота про клієнтів</strong> — ми прагнемо забезпечити максимальний комфорт, тому пропонуємо зручну доставку, щоб ви могли отримати свої улюблені страви прямо до дверей.
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="company__priorities">
                <h2 className="company__sectionTitle">Про наші пріоритети та стандарти</h2>
                <div className="company__priorities-grid">
                    {priorityCards.map((card, index) => (
                        <article className="company__priority-card" key={index}>
                            <div className="company__priority-header">
                                <h3 className="company__priority-title">{card.title}</h3>
                                <div className="company__priority-icons">
                                    {card.icons.map((icon, iconIndex) => (
                                        <Icon key={iconIndex} icon={icon} width={30} color="#333333" />
                                    ))}
                                </div>
                            </div>
                            <div
                                className="company__priority-content"
                                style={{
                                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(${getImage(card.image)})`,
                                }}
                            >
                                <p className="company__priority-text">{card.text}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="company__partnership" id="franchise">
                <h2 className="company__sectionTitle">Партнерство з нами</h2>

                <div className="company__partnership-row">
                    <img
                        className="company__partnership-image"
                        src={getImage("/uploads/company/partner1.png")}
                        alt="Співпраця з Umami House"
                    />
                    <div className="company__partnership-benefits">
                        <div className="company__partnership-subheader">
                            <h3 className="company__partnership-subtitle">Переваги співпраці з Umami House</h3>
                            <Icon icon="mdi:link-variant" width={28} color="#333333" />
                        </div>
                        <BenefitGrid items={cooperationBenefits} />
                    </div>
                </div>

                <div className="company__partnership-row">
                    <div className="company__partnership-benefits">
                        <div className="company__partnership-subheader">
                            <h3 className="company__partnership-subtitle">Переваги використання продукції Umami House</h3>
                            <Icon icon="hugeicons:noodles" width={28} color="#333333" />
                        </div>
                        <BenefitGrid items={productBenefits} />
                    </div>
                    <img
                        className="company__partnership-image"
                        src={getImage("/uploads/company/partner2.png")}
                        alt="Виробництво продукції Umami House"
                    />
                </div>
            </section>

            <section className="company__productAdvantages">
                <h2 className="company__sectionTitle">Переваги нашої продукції</h2>
                <div className="company__advantages-grid">
                    {productAdvantages.map((cell, index) =>
                        cell.type === "text" ? (
                            <div
                                className={`company__advantage-text company__advantage-text--${cell.variant}`}
                                key={index}
                            >
                                <h3 className="company__advantage-title">{cell.title}</h3>
                                <p className="company__advantage-description">{cell.text}</p>
                            </div>
                        ) : (
                            <img
                                className="company__advantage-image"
                                key={index}
                                src={getImage(cell.src)}
                                alt={cell.alt}
                            />
                        )
                    )}
                </div>
            </section>

            <section
                className="company__cooperation"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${getImage("/uploads/company/final.png")})`,
                }}
            >
                <div className="company__cooperation-content">
                    <div className="company__cooperation-logo">
                        Umami <img src="/soup.png" alt="" /> House
                    </div>
                    <h2 className="company__cooperation-title">Як почати співпрацю з нами?</h2>
                    <p className="company__cooperation-text">
                        Для того, щоб розпочати співпрацю, натисніть кнопку «Зареєструвати особистий кабінет» і створіть кабінет для юридичних осіб. Заповніть усі необхідні дані про ваш бізнес, і процес реєстрації буде завершено! Після перевірки ми зв&apos;яжемося з вами по електронній пошті або за вказаним номером телефону, щоб розпочати нашу співпрацю.
                    </p>
                    <button
                        type="button"
                        className="company__cooperation-button"
                        onClick={() => dispatch(showAuth())}
                    >
                        Зареєструвати особистий кабінет!
                    </button>
                </div>
            </section>

            {/*<div>*/}
            {/*    <h1>Про компанію</h1>*/}
            {/*    <div>*/}
            {/*        <p></p>*/}
            {/*        <img src={} alt={}/>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <img src={} alt={}/>*/}
            {/*        <p></p>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <h1>Про наші пріоритети та стандарти</h1>*/}
            {/*    <div>*/}
            {/*        <div>*/}
            {/*            <h2></h2>*/}
            {/*            <div>*/}
            {/*                <p></p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <h2>Партнерство з нами</h2>*/}
            {/*    <div>*/}
            {/*        <img src={} alt={}/>*/}
            {/*        <div>*/}
            {/*            <h3></h3>*/}
            {/*            <div>*/}
            {/*                <div>*/}
            {/*                    <p></p>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </main>
    )
}

export default function CreateCompanyPage(){
    return(
        <RenderCompanyPage/>
    )
}
