import useGoogleMapsLoader from "../../hooks/useGoogleMapsLoader.ts";
import {useRestaurantsQuery} from "../../redux/api/restaurantsApi.ts";
import CreateCompanyDetails from "./components/CreateCompanyDetails.tsx";
import CreateAdditionalDetails from "./components/CreateAdditionalDetails.tsx";
import CreateAdditionalInformationCards from "./components/CreateAdditionalInformationCards.tsx";
import MapRestaurants from "./components/MapRestaurants.tsx";
import PageLoader from "../../components/PageLoader/PageLoader.tsx";
import "./contact.css"

function RenderContactPage({restaurants}){
    return (
        <main>
            <h1 className="contact__title">Контакти та доставка</h1>
            <div className="contact">
                <MapRestaurants restaurants={restaurants} />
                <div className="contact__info">
                    <CreateCompanyDetails/>
                    <CreateAdditionalDetails/>
                </div>
            </div>
            <CreateAdditionalInformationCards/>
        </main>
    )
}

export default function CreateContactPage() {
    const {isLoaded, loadError} = useGoogleMapsLoader();
    const {data: restaurants, isLoading: restaurantsLoading} = useRestaurantsQuery();

    if (restaurantsLoading || !isLoaded) return <PageLoader/>;

    if (loadError) {
        return (
            <main>
                <h1 className="contact__title">Контакти та доставка</h1>
                <p className="contact__map-error">Не вдалося завантажити Google Maps. Перевірте API-ключ.</p>
            </main>
        );
    }

    return (
        <RenderContactPage restaurants={restaurants ?? []}/>
    );
}