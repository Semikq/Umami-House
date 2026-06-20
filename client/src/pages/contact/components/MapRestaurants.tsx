import {useEffect, useMemo, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {GoogleMap, InfoWindow} from "@react-google-maps/api";
import {Restaurants} from "../../../redux/types/restaurants.ts";
import RestaurantMarker from "../../../components/map/RestaurantMarker.tsx";
import RestaurantMapInfo from "../../../components/map/RestaurantMapInfo.tsx";
import {parseRestaurantCoords} from "../../../utils/restaurantMapMarker.ts";

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

    const mapCenter = useMemo(() => {
        if (selected) {
            const selectedCoords = parseRestaurantCoords(selected.latitude, selected.longitude);
            if (selectedCoords) return selectedCoords;
        }

        if (visibleRestaurants.length === 0) {
            return {lat: 49.588, lng: 34.554};
        }

        const coords = visibleRestaurants.map((item) =>
            parseRestaurantCoords(item.latitude, item.longitude)!,
        );

        const lat = coords.reduce((sum, point) => sum + point.lat, 0) / coords.length;
        const lng = coords.reduce((sum, point) => sum + point.lng, 0) / coords.length;

        return {lat, lng};
    }, [selected, visibleRestaurants]);

    const selectedPosition = selected
        ? parseRestaurantCoords(selected.latitude, selected.longitude)
        : null;

    const openRestaurant = (restaurant: Restaurants) => setSelected(restaurant);

    return (
        <div className="map-wrapper" id="contact-map">
            <GoogleMap
                mapContainerStyle={{width: "100%", height: "100%", borderRadius: "30px 60px 30px 60px"}}
                center={mapCenter}
                zoom={selected ? 15 : visibleRestaurants.length === 1 ? 14 : 12}
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
