import {useEffect, useState} from "react"
import {fetchAllSale} from "../../api/dish"
import {fetchAllCategories} from "../../api/dish";
import {fetchAllPartners} from "../../api/dish"
import {Link} from "react-router-dom"
import "./main.css"
import {Icon} from "@iconify/react"


function CreateSlider () {
    const [sale, setSale] = useState([])
    const [index, setIndex] = useState(0)

    useEffect(() => {fetchAllSale().then(result => setSale(result.data))}, [])

    const nextSlide = () => setIndex((prevIndex) => (prevIndex + 1) % sale.length)

    const prevSlide = () => setIndex((prevIndex) => (prevIndex - 1 + sale.length) % sale.length)

    console.log('index:', index);
    console.log('sale length:', sale.length);
    console.log('prev item:', sale[((index - 1) + sale.length) % sale.length]);
    console.log('current item:', sale[index]);
    console.log('next item:', sale[(index + 1) % sale.length]);

    return (
        <div className="saleSlider">
            <div onClick={() => prevSlide()}>
                <Icon icon="solar:round-arrow-left-broken" width={50} height={50} color="#F1C232"></Icon>
            </div>
            <div onClick={() => nextSlide()}>
                <Icon icon="solar:round-arrow-right-broken" width={50} height={50} color="#F1C232"></Icon>
            </div>
            {sale.length > 0 && (
                <>
                    <img className="afisha" src={`${sale[((index - 1) + sale.length) % sale.length].image_url}`} title="1"/>
                    <img className="afisha" src={`${sale[index].image_url}`} title="2"/>
                    <img className="afisha" src={`${sale[(index + 1) % sale.length].image_url}`} title="3"/>
                </>
            )}
        </div>
    )
}

const newItem: {title: string, icon: string}[] = [
    {title: "Розумні ціни для гостей за найкращу якість", icon: "material-symbols:price-check-rounded"},
    {title: "Справжня азійська кухня - смачно, безпечно, автентично", icon: "hugeicons:noodles"},
    {title: "Оптові пропозиції для компаній", icon: "icon-park-outline:delivery"},
    {title: "Працюємо щодня з 10:00 до 21:00", icon: "fluent-emoji-high-contrast:two-oclock"},
    {title: "Швидка доставка та сезонні оновлення меню", icon: "material-symbols:delivery-truck-speed-outline-rounded"},
    {title: "Сертифіковане виробництво та високі стандарти якості", icon: "icon-park-outline:certificate"},
]

function NewItems ({title, icon}: {title: string; icon: string}) {
    return <div title={title}>
        <Icon className="icon" icon={icon} width={55} height={50} color="#333333"></Icon>
        <p>{title}</p>
    </div>
}

function CreateMenu() {
    const [categories, setCategories] = useState([])

    useEffect(() => {fetchAllCategories().then(result => {setCategories(result.data); console.log(result)})}, [])

    return (
        <div className="menu" id="menu">
            {categories.map((category) => {
                return (
                    <Link to={`/dishes/${category.id}`} key={category.id} className="menu-item">
                        <div className="shadow"></div>
                        <p>{category.title}</p>
                    </Link>
                )
            })}
        </div>
    )
}

export function CreateOurPartners() {
    const [partners, setPartners] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const visibleCount = 5;

    useEffect(() => {fetchAllPartners().then(result => {setPartners(result.data); console.log(result)})}, []);

    const nextSlide = () => {
        setStartIndex((prevIndex) => (prevIndex + 1) % partners.length);
    };

    const prevSlide = () => {
        setStartIndex((prevIndex) => (prevIndex - 1 + partners.length) % partners.length);
    };

    const getVisiblePartners = () => {
        const extended = [...partners, ...partners];
        return extended.slice(startIndex, startIndex + visibleCount);
    };

    return (
        <div className="partners">
            <div className="slider-header">
                <Icon className="icon" onClick={prevSlide} icon="solar:round-arrow-left-linear" width={45} height={55} color="#333333" />
                <h1>Наші партнери</h1>
                <Icon className="icon" onClick={nextSlide} icon="solar:round-arrow-right-linear" width={45} height={55} color="#333333" />
            </div>

            {/*<div className="slider-track">*/}
            {/*    {getVisiblePartners().map((partner, index) => (*/}
            {/*        <img key={index} src={`${partner.logo}`} alt={partner.name} />*/}
            {/*    ))}*/}
            {/*</div>*/}
        </div>
    );
}

export default function CreateMainPage() {
    return (
        <main>
            <CreateSlider/>
            <div className="fieldInformation">
                {newItem.slice(0, 3).map((item) => <NewItems {...item}/>)}
                <a href="#menu" className="link">
                    <Icon className="icon" icon="radix-icons:double-arrow-down" width={60} height={60} color="#333333" />
                </a>
                {newItem.slice(3, 6).map((item) => <NewItems {...item}/>)}
            </div>
            {/*<CreateMenu/>*/}
            {/*<div className="restaurantInfo">*/}
            {/*    <div>*/}
            {/*        /!*<img src="/uploads/photoCompany/restaurant.jpg" alt="restaurant"/>*!/*/}
            {/*        <div>*/}
            {/*            <h2>Для наших гостей</h2>*/}
            {/*            <p>Umami House – ваш квиток у світ гастрономічних насолод! Ми поєднуємо традиції азіатської кухні з сучасним підходом до зручності та якості. Наші продукти створені для тих, хто цінує час, але не готовий жертвувати якістю. Ми ретельно відбираємо інгредієнти, щоб кожна страва дарувала справжнє гастрономічне задоволення. Завдяки шоковому заморожуванню ми зберігаємо природний смак, свіжість та користь кожного продукту. Наша місія – зробити ваш обід чи вечерю смачними та простими. Залиште час на важливе, а про смачну їжу подбаємо ми! А ще ви можете завітати до наших ресторанів, щоб насолодитися свіжими стравами азіатської кухні, або придбати заморожені страви, які зручно приготувати вдома.</p>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <div>*/}
            {/*            <h2>Для наших партнерів</h2>*/}
            {/*            <p>Запрошуємо до співпраці власників магазинів, заправок, кафе та інших закладів! У нашому асортименті ви знайдете продукцію азіатської кухні, що задовольнить найвибагливіших клієнтів – як заморожені, так і свіжі страви.Ми використовуємо лише добірні інгредієнти та дотримуємося високих стандартів якості. Шокове заморожування гарантує збереження смаку, свіжості та корисних властивостей продукції. Свіжі страви також проходять суворий контроль, щоб кожен ваш клієнт насолоджувався неперевершеним смаком і ароматом.Обираючи нашу продукцію, ви отримуєте можливість розширити асортимент, збільшити прибуток і подарувати своїм клієнтам справжню гастрономічну насолоду. Ваш успіх – наша мета!</p>*/}
            {/*        </div>*/}
            {/*        /!*<img src="/uploads/photoCompany/kitchen.jpg" alt="kitchen" />*!/*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<CreateOurPartners/>*/}
        </main>
    )
}