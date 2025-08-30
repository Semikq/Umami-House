import {GoogleMap, Marker, InfoBox, useLoadScript} from "@react-google-maps/api";
import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

function RenderRestaurantPage({cities, restaurants}) {

    return (
        <main>
            <div>
                <h1></h1>
                {/*<div>*/}
                {/*    {cities.map((city, i) =>*/}
                {/*       <div key={i}>*/}
                {/*           <h2>{city.name}</h2>*/}
                {/*       </div>*/}
                {/*    )}*/}
                {/*</div>*/}
            </div>
            {/*<div>*/}
            {/*    {restaurants.map((restaurant, i) =>*/}
            {/*    <div key={i}>*/}
            {/*        <div>*/}
            {/*            <div>*/}
            {/*                <h3></h3>*/}
            {/*                <p></p>*/}
            {/*                <input type={"tel"}></input>*/}
            {/*            </div>*/}
            {/*            <p></p>*/}
            {/*            <button></button>*/}
            {/*        </div>*/}
            {/*        <img src={restaurant.image} alt={restaurant.name} />*/}
            {/*    </div>)}*/}
            {/*</div>*/}
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

    return (
        <RenderRestaurantPage cities={cities} restaurants={restaurants}/>
    )
}