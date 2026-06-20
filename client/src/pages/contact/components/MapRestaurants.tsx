import {useMemo, useState} from "react";
import {GoogleMap, InfoWindow} from "@react-google-maps/api";
import {Restaurants} from "../../../redux/types/restaurants.ts";
import RestaurantMarker from "../../../components/map/RestaurantMarker.tsx";
import {parseRestaurantCoords} from "../../../utils/restaurantMapMarker.ts";

export default function MapRestaurants({restaurants}: { restaurants: Restaurants[] }) {
    const [selected, setSelected] = useState<Restaurants | null>(null);

    const visibleRestaurants = useMemo(
        () => restaurants.filter((item) => item.active && parseRestaurantCoords(item.latitude, item.longitude)),
        [restaurants],
    );

    const mapCenter = useMemo(() => {
        if (visibleRestaurants.length === 0) {
            return { lat: 49.588, lng: 34.554 };
        }

        const coords = visibleRestaurants.map((item) =>
            parseRestaurantCoords(item.latitude, item.longitude)!,
        );

        const lat = coords.reduce((sum, point) => sum + point.lat, 0) / coords.length;
        const lng = coords.reduce((sum, point) => sum + point.lng, 0) / coords.length;

        return { lat, lng };
    }, [visibleRestaurants]);

    const selectedPosition = selected
        ? parseRestaurantCoords(selected.latitude, selected.longitude)
        : null;

    return (
        <div className="map-wrapper">
            <GoogleMap
                mapContainerStyle={{width: "100%", height: "100%", borderRadius: "30px 60px 30px 60px"}}
                center={mapCenter}
                zoom={visibleRestaurants.length === 1 ? 14 : 12}
            >
                {visibleRestaurants.map((item, index) => (
                    <RestaurantMarker
                        key={item.uuid}
                        restaurant={item}
                        colorIndex={index}
                        onClick={() => setSelected(item)}
                    />
                ))}

                {selected && selectedPosition && (
                    <InfoWindow
                        position={selectedPosition}
                        onCloseClick={() => setSelected(null)}
                    >
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
