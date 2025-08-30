import React, {useEffect, useState} from "react";
import {useLoadScript} from "@react-google-maps/api";
import {useRestaurantsQuery} from "../../redux/api/restaurantsApi.ts";
import {useCitiesQuery} from "../../redux/api/restaurantsApi.ts";
import CreateCompanyDetails from "./components/CreateCompanyDetails.tsx";
import CreateAdditionalDetails from "./components/CreateAdditionalDetails.tsx";
import CreateAdditionalInformationCards from "./components/CreateAdditionalInformationCards.tsx";
import MapRestaurants from "./components/MapRestaurants.tsx";
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
    const { isLoaded } = useLoadScript({googleMapsApiKey: "AIzaSyCTPdYTVjD2IXVmzsHOoWrWE3MCb6cJCZQ"});
    const { data: restaurants, isLoading: restaurantsLoading } = useRestaurantsQuery()

    if (restaurantsLoading || !isLoaded) return <p>Loading...</p>;

    return(
        <RenderContactPage restaurants={restaurants}/>
    )
}