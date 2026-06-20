import {useEffect, useMemo, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {GoogleMap, InfoWindow} from "@react-google-maps/api";
import {Restaurants} from "../../../redux/types/restaurants.ts";
import RestaurantMarker from "../../../components/map/RestaurantMarker.tsx";
import RestaurantMapInfo from "../../../components/map/RestaurantMapInfo.tsx";
import {parseRestaurantCoords} from "../../../utils/restaurantMapMarker.ts";

const UKRAINE_MAP_CENTER = {lat: 48.68960588712109, lng: 31.638236495038726};
const UKRAINE_MAP_ZOOM = 6;

export default function MapRestaurants({restaurants}: { restaurants: Restaurants[] }) {
    const [searchParams] = useSearchParams();
    const [selected, setSelected] = useState<Restaurants | null>(null);

    const visibleRestaurants = useMemo(
        () => restaurants.filter((item) => item.active && parseRestaurantCoords(item.latitude, item.longitude)),
        [restaurants],
    );

    const restaurantUuidFromUrl = searchParams.get("restaurant");

    useEffect(() => {
        if (!restaurantUuidFromUrl) return;

        const restaurant = visibleRestaurants.find((item) => item.uuid === restaurantUuidFromUrl);
        if (!restaurant) return;

        setSelected(restaurant);

        const timer = window.setTimeout(() => {
            document.getElementById("contact-map")?.scrollIntoView({behavior: "smooth", block: "start"});
        }, 300);

        return () => window.clearTimeout(timer);
    }, [restaurantUuidFromUrl, visibleRestaurants]);

    const selectedPosition = selected
        ? parseRestaurantCoords(selected.latitude, selected.longitude)
        : null;

    const openRestaurant = (restaurant: Restaurants) => setSelected(restaurant);

    return (
        <div className="map-wrapper" id="contact-map">
            <GoogleMap
                mapContainerStyle={{width: "100%", height: "100%", borderRadius: "30px 60px 30px 60px"}}
                defaultCenter={UKRAINE_MAP_CENTER}
                defaultZoom={UKRAINE_MAP_ZOOM}
                onClick={() => setSelected(null)}
            >
                {visibleRestaurants.map((item, index) => (
                    <RestaurantMarker
                        key={item.uuid}
                        restaurant={item}
                        colorIndex={index}
                        onClick={() => openRestaurant(item)}
                        onMouseOver={() => openRestaurant(item)}
                    />
                ))}

                {selected && selectedPosition && (
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
    );
}
