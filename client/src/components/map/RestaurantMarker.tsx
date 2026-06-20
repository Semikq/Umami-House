import {Marker} from "@react-google-maps/api";
import {Restaurants} from "../../redux/types/restaurants.ts";
import {
    createRestaurantMarkerIcon,
    getRestaurantMarkerColor,
    parseRestaurantCoords,
} from "../../utils/restaurantMapMarker.ts";

export default function RestaurantMarker({
    restaurant,
    colorIndex,
    onClick,
    onMouseOver,
}: {
    restaurant: Restaurants,
    colorIndex: number,
    onClick?: () => void,
    onMouseOver?: () => void,
}) {
    const position = parseRestaurantCoords(restaurant.latitude, restaurant.longitude);
    if (!position) return null;

    return (
        <Marker
            position={position}
            icon={createRestaurantMarkerIcon(getRestaurantMarkerColor(colorIndex, restaurant.active))}
            onClick={onClick}
            onMouseOver={onMouseOver}
        />
    );
}
