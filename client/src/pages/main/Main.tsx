import {useSaleQuery} from "../../redux/api/saleApi.ts";
import {useCategoriesQuery} from "../../redux/api/dishesApi.ts";
import {usePartnersQuery} from "../../redux/api/partnersApi"
import CreateSlider from "./components/CreateSlider.tsx";
import CreateMenu from "./components/CreateMenu.tsx";
import CreateOurPartners from "./components/CreateOurPartners.tsx";
import CreateFieldInformation from "./components/CreateFieldInformation.tsx";
import "./main.css"
import getImage from "../../utils/getImage.ts";

function RenderMainPage({sale, categories, partners}) {
    return (
        <main>
            <CreateSlider sale={sale}/>
            <CreateFieldInformation/>
            <CreateMenu categories={categories}/>
            <div className="restaurantInfo">
                <div>
                    <img src={getImage("/uploads/photoCompany/restaurant.jpg")}  alt="restaurant"/>
                    <div>
                        <h2>Для наших гостей</h2>
                        <p>Umami House – ваш квиток у світ гастрономічних насолод! Ми поєднуємо традиції азіатської кухні з сучасним підходом до зручності та якості. Наші продукти створені для тих, хто цінує час, але не готовий жертвувати якістю. Ми ретельно відбираємо інгредієнти, щоб кожна страва дарувала справжнє гастрономічне задоволення. Завдяки шоковому заморожуванню ми зберігаємо природний смак, свіжість та користь кожного продукту. Наша місія – зробити ваш обід чи вечерю смачними та простими. Залиште час на важливе, а про смачну їжу подбаємо ми! А ще ви можете завітати до наших ресторанів, щоб насолодитися свіжими стравами азіатської кухні, або придбати заморожені страви, які зручно приготувати вдома.</p>
                    </div>
                </div>
                <div>
                    <div>
                        <h2>Для наших партнерів</h2>
                        <p>Запрошуємо до співпраці власників магазинів, заправок, кафе та інших закладів! У нашому асортименті ви знайдете продукцію азіатської кухні, що задовольнить найвибагливіших клієнтів – як заморожені, так і свіжі страви.Ми використовуємо лише добірні інгредієнти та дотримуємося високих стандартів якості. Шокове заморожування гарантує збереження смаку, свіжості та корисних властивостей продукції. Свіжі страви також проходять суворий контроль, щоб кожен ваш клієнт насолоджувався неперевершеним смаком і ароматом.Обираючи нашу продукцію, ви отримуєте можливість розширити асортимент, збільшити прибуток і подарувати своїм клієнтам справжню гастрономічну насолоду. Ваш успіх – наша мета!</p>
                    </div>
                    <img src={getImage("/uploads/photoCompany/kitchen.jpg")} alt="kitchen" />
                </div>
            </div>
            <CreateOurPartners partners={partners}/>
        </main>
    )
}

export default function CreateMainPage(){
    const {data: categories, isLoading: categoriesLoading} = useCategoriesQuery()
    const {data: sale, isLoading: saleLoading} = useSaleQuery()
    const {data: partners, isLoading: partnersLoading} = usePartnersQuery()

    if (categoriesLoading || partnersLoading || saleLoading) return <p>Loading...</p>

    return (
        <RenderMainPage sale={sale} categories={categories} partners={partners}/>
    )
}