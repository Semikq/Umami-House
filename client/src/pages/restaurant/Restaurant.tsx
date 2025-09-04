import {GoogleMap, Marker, useLoadScript, InfoWindow} from "@react-google-maps/api";
import {useCitiesQuery, useRestaurantsByCityQuery, useRestaurantsQuery} from "../../redux/api/restaurantsApi.ts";
import CreateCitiesBloc from "./components/CreateCitiesBloc.tsx";
import React, {useState, useEffect} from "react";
import {changeCity} from "../../redux/slices/userCity.ts";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import CreateCardsRestaurants from "./components/CreateCardsRestaurants.tsx"
import "./Restaurant.css"

function RenderRestaurantPage({userCityId, cities, restaurantsByCity}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {data, isLoading} = useRestaurantsQuery()
    const [selected, setSelected] = useState(null)
    const [index, setIndex] = useState(userCityId || null)
    const restaurantsToShow = index === null ? data : restaurantsByCity
    const currentCity = cities.find(item => item.id === Number(index))

    useEffect(() => {if (index !== null) dispatch(changeCity({id: currentCity.id, name: currentCity.name}))}, [currentCity])

    const handleCityClick = (cityId) => {
        const city = cities.find(item => item.id === cityId)
        setIndex(cityId)
        navigate(`/restaurants/city/${city.name}`)
    };

    return (
        <main>
            <div className="restaurant__header">
                <h1 className="restaurant__header--title">Ресторани Umami House у місті <span>{currentCity ? currentCity.name : "Усі ресторани"}</span></h1>
                <div className="restaurant__header--cities">
                    <div className={`header__cities--bloc ${index === null ? "active" : ""}`} onClick={() => setIndex(null)}>
                        <h2>Усі ресторани</h2>
                    </div>
                    <CreateCitiesBloc cities={cities} index={index} handleCityClick={handleCityClick}/>
                </div>
            </div>
            <CreateCardsRestaurants restaurantsToShow={restaurantsToShow} setSelected={setSelected}/>
            <div className="restaurant__map" id="infoWindow">
                <GoogleMap mapContainerStyle={{height: "100%", width: "100%", borderRadius: "30px 60px 30px 60px"}} center={{lat: currentCity ? Number(currentCity.latitude) : 48.68960588712109, lng: currentCity ? Number(currentCity.longitude) : 31.638236495038726}} zoom={currentCity ? 11.5 : 6}>
                    {restaurantsToShow.map((item) =>
                        <Marker key={item.id} position={{ lat: Number(item.latitude), lng: Number(item.longitude) }}/>
                    )}
                    {selected &&
                        <InfoWindow position={{ lat: Number(selected.latitude), lng: Number(selected.longitude) }} onCloseClick={() => setSelected({ latitude: null, longitude: null })}>
                            <div className="restaurant__map--infoWindow">
                                <h3>{selected.name}</h3>
                                <p>{selected.time__work}</p>
                                <p>{selected.address}</p>
                                <p>{selected.phone}</p>
                            </div>
                        </InfoWindow>
                    }
                </GoogleMap>
            </div>
        </main>
    )
}

export default function CreateRestaurantPages() {
    const { id } = useSelector(state => state.userCity)
    const {data: cities, isLoading: citiesLoading} = useCitiesQuery()
    const {data: restaurantsByCity, isLoading: restaurantsByCityLoading} = useRestaurantsByCityQuery(id)
    const { isLoaded } = useLoadScript({googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY})

    if (!restaurantsByCity || !isLoaded || citiesLoading || restaurantsByCityLoading) return <p>Loading...</p>

    return (
        <RenderRestaurantPage userCityId={id} cities={cities} restaurantsByCity={restaurantsByCity}/>
    )
}