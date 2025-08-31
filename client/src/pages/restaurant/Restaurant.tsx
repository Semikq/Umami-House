// import {GoogleMap, Marker, InfoBox, useLoadScript} from "@react-google-maps/api";
// import {useState, useEffect} from "react";
// import {useParams} from "react-router-dom";
import {useCitiesQuery, useRestaurantsByCityQuery} from "../../redux/api/restaurantsApi.ts";
import "./Restaurant.css"
import {useParams} from "react-router-dom";
import CreateCitiesBlock from "./components/CreateCitiesBlock.tsx";
import {useState} from "react";

function RenderRestaurantPage({cities, restaurantsByCity}) {
    const { id } = useParams()
    const [index, setIndex] = useState(Number(id) + 1)

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
                        <div>
                            <h3>Вул. {restaurant.address}</h3>
                            <p>Рн-нд</p>
                            <input type={"tel"}></input>
                        </div>
                        <p></p>
                        <button></button>
                    </div>
                    <img className="card__restaurant--image" src={restaurant.image} alt={restaurant.name} />
                </div>)}
            </div>
            {/*<GoogleMap center={{ lat: 5, lng: 15 }} zoom={12}>*/}
            {/*    {restaurants.map((restaurant, i) =>*/}
            {/*        <Marker position={{ lat: 5, lng: 15 }} key={i}>*/}

            {/*        </Marker>*/}
            {/*        */}
            {/*        */}
            {/*    )}*/}
            {/*</GoogleMap>*/}
        </main>
    )
}

export default function CreateRestaurantPages() {
    const {data: cities, isLoading: citiesLoading} = useCitiesQuery()
    const {data: restaurantsByCity, isLoading: restaurantsByCityLoading} = useRestaurantsByCityQuery(1)

    if (citiesLoading && restaurantsByCityLoading) return <p>Loading...</p>

    return (
        <RenderRestaurantPage cities={cities} restaurantsByCity={restaurantsByCity}/>
    )
}