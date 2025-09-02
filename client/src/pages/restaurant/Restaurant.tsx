import {GoogleMap, Marker, InfoBox, useLoadScript, InfoWindow} from "@react-google-maps/api";
import {useCitiesQuery, useRestaurantsByCityQuery} from "../../redux/api/restaurantsApi.ts";
import "./Restaurant.css"
import {useParams} from "react-router-dom";
import CreateCitiesBlock from "./components/CreateCitiesBlock.tsx";
import {useState, useEffect} from "react";
import {Icon} from "@iconify/react";
import {changeCity} from "../../redux/slices/userCity.ts";
import {useDispatch, useSelector} from "react-redux";

function RenderRestaurantPage({cities, restaurantsByCity}) {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [index, setIndex] = useState(Number(id) + 1)

    useEffect(() => {
        console.log(index)
        dispatch(changeCity(index))
    }, [index])

    return (
        <main>
            <div className="restaurant__header">
                <h1 className="restaurant__header--title">Ресторани Umami House у місті <span>{cities.find(item => item.id === Number(id)).name}</span></h1>
                <div className="restaurant__header--cities">
                    <div className={`header__cities--bloc ${index === 0 ? "active" : ""}`} onClick={() => setIndex(0)}>
                        <h2>Усі ресторани</h2>
                    </div>
                    <CreateCitiesBlock cities={cities} index={index} setIndex={setIndex}/>
                </div>
            </div>
            <div className="restaurant__body">
                {restaurantsByCity.map((restaurant, i) =>
                <div className="restaurant__body--card" key={i}>
                    <div className="card__restaurant--information">
                        <div className="restaurant__information--breadcrumbs">
                            <h3 className="information__breadcrumbs--address">Вул. {restaurant.address}</h3>
                            <p className="information__breadcrumbs--timeWork">{restaurant.time_work}</p>
                            <a className="information__breadcrumbs--tel" href={`tel:+38${restaurant.phone}`}><Icon icon="mynaui:telephone-call"/><span>{restaurant.phone}</span></a>
                        </div>
                        <p className="restaurant___information--description">{restaurant.description}</p>
                        <button className="restaurant___information--button">На мапі <Icon icon="majesticons:map-marker-line"/></button>
                    </div>
                    <img className="card__restaurant--image" src={restaurant.restaurant_image} alt={restaurant.name} />
                </div>)}
            </div>
            <div className="restaurant__map">
                <GoogleMap mapContainerStyle={{height: "100%", width: "100%", borderRadius: "30px 60px 30px 60px"}} center={{lat: 49.588, lng: 34.554}} zoom={12}>
                    {restaurantsByCity.map((item, i) =>
                        <Marker key={i} position={{ lat: Number(item.latitude), lng: Number(item.longitude) }}/>
                    )}
                </GoogleMap>
            </div>
        </main>
    )
}

export default function CreateRestaurantPages() {
    const { id } = useSelector(state => state.userCity)
    const {data: cities, isLoading: citiesLoading} = useCitiesQuery()
    const {data: restaurantsByCity, isLoading: restaurantsByCityLoading} = useRestaurantsByCityQuery(id)
    const { isLoaded } = useLoadScript({googleMapsApiKey: "AIzaSyCTPdYTVjD2IXVmzsHOoWrWE3MCb6cJCZQ"});

    if (!isLoaded || citiesLoading || restaurantsByCityLoading) return <p>Loading...</p>

    return (
        <RenderRestaurantPage cities={cities} restaurantsByCity={restaurantsByCity}/>
    )
}