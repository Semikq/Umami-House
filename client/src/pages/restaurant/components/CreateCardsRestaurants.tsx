import {Icon} from "@iconify/react";
import {useNavigate} from "react-router-dom";
import getImage from "../../../utils/getImage.ts";
import {Restaurants} from "../../../redux/types/restaurants.ts";

export default function CreateCardsRestaurants({
    restaurantsToShow,
}: {
    restaurantsToShow: Restaurants[],
    setSelected?: (restaurant: Restaurants) => void,
}) {
    const navigate = useNavigate();

    const handleInfoRestaurant = (restaurant: Restaurants) => {
        navigate(`/contact?restaurant=${restaurant.uuid}`);
    };

    return (
        <div className="restaurant__body">
            {restaurantsToShow.map((restaurant) =>
                <div className="restaurant__body--card" key={restaurant.uuid}>
                    <div className="card__restaurant--information">
                        <div className="restaurant__information--breadcrumbs">
                            <h3 className="information__breadcrumbs--address">Вул. {restaurant.address}</h3>
                            <p className="information__breadcrumbs--timeWork">{restaurant.time_work}</p>
                            <a className="information__breadcrumbs--tel" href={`tel:+38${restaurant.phone}`}><Icon icon="mynaui:telephone-call"/><span>{restaurant.phone}</span></a>
                        </div>
                        <p className="restaurant___information--description">{restaurant.description}</p>
                        <button type="button" className="restaurant___information--button" onClick={() => handleInfoRestaurant(restaurant)}>На мапі <Icon icon="majesticons:map-marker-line"/></button>
                    </div>
                    <img className="card__restaurant--image" src={getImage(restaurant.restaurant_image)} alt={restaurant.name} />
                </div>)}
        </div>
    )
}
