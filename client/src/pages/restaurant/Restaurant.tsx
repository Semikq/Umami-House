import {GoogleMap, InfoWindow} from "@react-google-maps/api";
import {useCitiesQuery, useRestaurantsByCityQuery, useRestaurantsQuery} from "../../redux/api/restaurantsApi.ts";
import useGoogleMapsLoader, {UKRAINE_MAP_CENTER, UKRAINE_MAP_ZOOM} from "../../hooks/useGoogleMapsLoader.ts";
import CreateCitiesBloc from "./components/CreateCitiesBloc.tsx";
import {useState, useEffect} from "react";
import {changeCity} from "../../redux/slices/userCity.ts";
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import CreateCardsRestaurants from "./components/CreateCardsRestaurants.tsx"
import PageLoader from "../../components/PageLoader/PageLoader.tsx";
import RestaurantMarker from "../../components/map/RestaurantMarker.tsx";
import RestaurantMapInfo from "../../components/map/RestaurantMapInfo.tsx";
import {parseRestaurantCoords} from "../../utils/restaurantMapMarker.ts";
import "./restaurant.css"

function RestaurantMap({restaurantsToShow, currentCity, selected, setSelected, mapLoaded}) {
    const selectedPosition = selected
        ? parseRestaurantCoords(selected.latitude, selected.longitude)
        : null;

    if (!mapLoaded) {
        return (
            <div className="restaurant__map restaurant__map--placeholder" id="infoWindow">
                <p>Карта завантажується...</p>
            </div>
        )
    }

    return (
        <div className="restaurant__map" id="infoWindow">
            <GoogleMap
                mapContainerStyle={{height: "100%", width: "100%"}}
                center={{
                    lat: currentCity ? Number(currentCity.latitude) : UKRAINE_MAP_CENTER.lat,
                    lng: currentCity ? Number(currentCity.longitude) : UKRAINE_MAP_CENTER.lng,
                }}
                zoom={currentCity ? 11.5 : UKRAINE_MAP_ZOOM}
                onClick={() => setSelected(null)}
            >
                {restaurantsToShow.map((item, index) => (
                    <RestaurantMarker
                        key={item.uuid}
                        restaurant={item}
                        colorIndex={index}
                        onClick={() => setSelected(item)}
                        onMouseOver={() => setSelected(item)}
                    />
                ))}
                {selectedPosition && (
                    <InfoWindow
                        position={selectedPosition}
                        onCloseClick={() => setSelected(null)}
                        options={{maxWidth: 320}}
                    >
                        <RestaurantMapInfo restaurant={selected}/>
                    </InfoWindow>
                )}
            </GoogleMap>
        </div>
    )
}

function RenderRestaurantPage({urlCityName, cities, mapLoaded}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cityFromUrl = cities.find(item => item.name === urlCityName)
    const [index, setIndex] = useState(cityFromUrl?.uuid ?? null)
    const {data: allRestaurants, isLoading: allRestaurantsLoading, isError: allRestaurantsError} = useRestaurantsQuery()
    const {data: restaurantsByCity, isLoading: restaurantsByCityLoading, isError: restaurantsByCityError} = useRestaurantsByCityQuery(index)
    const [selected, setSelected] = useState(null)
    const restaurantsToShow = index === null ? (allRestaurants ?? []) : (restaurantsByCity ?? [])
    const currentCity = cities.find(item => item.uuid === index)

    useEffect(() => {
        const city = cities.find(item => item.name === urlCityName)
        setIndex(city?.uuid ?? null)
    }, [urlCityName, cities])

    useEffect(() => {
        if (index !== null && currentCity) {
            dispatch(changeCity({uuid: currentCity.uuid, name: currentCity.name}))
        }
    }, [currentCity, dispatch, index])

    const handleCityClick = (cityUuid) => {
        const city = cities.find(item => item.uuid === cityUuid)
        setIndex(cityUuid)
        navigate(`/restaurants/city/${city.name}`)
    }

    const handleShowAll = () => {
        setIndex(null)
    }

    if (allRestaurantsLoading || restaurantsByCityLoading) return <PageLoader/>

    return (
        <main>
            <div className="restaurant__header">
                <h1 className="restaurant__header--title">
                    Ресторани Umami House у місті <span>{currentCity ? currentCity.name : "Усі ресторани"}</span>
                </h1>
                <div className="restaurant__header--cities">
                    <div className={`header__cities--bloc ${index === null ? "active" : ""}`} onClick={handleShowAll}>
                        <h2>Усі ресторани</h2>
                    </div>
                    <CreateCitiesBloc cities={cities} index={index} handleCityClick={handleCityClick}/>
                </div>
            </div>

            {(allRestaurantsError || restaurantsByCityError) && (
                <p className="restaurant__error">Не вдалося завантажити ресторани. Перевірте, чи запущений сервер.</p>
            )}

            {!restaurantsToShow.length && !allRestaurantsError && !restaurantsByCityError && (
                <p className="restaurant__empty">Ресторани для цього міста поки не додані.</p>
            )}

            <CreateCardsRestaurants restaurantsToShow={restaurantsToShow} setSelected={setSelected}/>
            <RestaurantMap
                restaurantsToShow={restaurantsToShow}
                currentCity={currentCity}
                selected={selected}
                setSelected={setSelected}
                mapLoaded={mapLoaded}
            />
        </main>
    )
}

export default function CreateRestaurantPages() {
    const { name } = useParams()
    const {data: cities, isLoading: citiesLoading, isError: citiesError} = useCitiesQuery()
    const {isLoaded, loadError} = useGoogleMapsLoader();

    if (citiesLoading) return <PageLoader/>

    if (citiesError || !cities?.length) {
        return (
            <main className="restaurant__fallback">
                <p>Не вдалося завантажити міста. Запустіть сервер і виконайте seed:</p>
                <code>cd server && npm run prisma:seed:local</code>
            </main>
        )
    }

    return (
        <RenderRestaurantPage urlCityName={name} cities={cities} mapLoaded={isLoaded}/>
    )
}
