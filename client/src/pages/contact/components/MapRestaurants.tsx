import React, {useState} from "react";
import {GoogleMap, InfoWindow, Marker} from "@react-google-maps/api";

export default function MapRestaurants({restaurants}) {
    const [selected, setSelected] = useState(null);

    return (
        <div className="map-wrapper">
            <GoogleMap mapContainerStyle={{width: "100%", height: "100%", borderRadius: "30px 60px 30px 60px"}} center={{lat: 49.588, lng: 34.554}} zoom={12}>
                {restaurants.map((item, index) =>
                    <Marker key={index} position={{ lat: Number(item.latitude), lng: Number(item.longitude) }} onClick={() => setSelected(item)}/>
                )}

                {selected && (
                    <InfoWindow position={{ lat: Number(selected.latitude), lng: Number(selected.longitude) }} onCloseClick={() => setSelected(null)}>
                        <div>
                            <h3>{selected.name}</h3>
                            <p>{selected.address}</p>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </div>
    );
}