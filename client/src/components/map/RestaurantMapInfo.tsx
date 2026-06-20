import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Restaurants} from "../../redux/types/restaurants.ts";
import {useCitiesQuery} from "../../redux/api/restaurantsApi.ts";
import {changeCity} from "../../redux/slices/userCity.ts";
import getImage from "../../utils/getImage.ts";
import "./mapInfo.css";

function resolveImageSrc(imageUrl: string) {
    return imageUrl.startsWith("http") ? imageUrl : getImage(imageUrl);
}

export default function RestaurantMapInfo({restaurant}: { restaurant: Restaurants }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {data: cities = []} = useCitiesQuery();

    const handleGoToMenu = () => {
        const city = cities.find((item) => item.uuid === restaurant.city_uuid);
        if (city) {
            dispatch(changeCity({uuid: city.uuid, name: city.name}));
        }
        navigate("/#menu");
    };

    return (
        <div className="map-info">
            {restaurant.restaurant_image && (
                <img
                    className="map-info__image"
                    src={resolveImageSrc(restaurant.restaurant_image)}
                    alt={restaurant.name}
                />
            )}
            <h3 className="map-info__title">{restaurant.name}</h3>
            <p className="map-info__row">
                <span className="map-info__label">Адреса</span>
                {restaurant.address}
            </p>
            <p className="map-info__row">
                <span className="map-info__label">Графік</span>
                {restaurant.time_work}
            </p>
            <a className="map-info__phone" href={`tel:${restaurant.phone}`}>
                {restaurant.phone}
            </a>
            <button type="button" className="map-info__btn" onClick={handleGoToMenu}>
                До меню
            </button>
        </div>
    );
}
