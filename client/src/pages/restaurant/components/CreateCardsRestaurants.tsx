import {Icon} from "@iconify/react";

export default function CreateCardsRestaurants({ restaurantsToShow, setSelected }){
    const handleInfoRestaurant = (restaurant) => {
        const element = document.getElementById("infoWindow");
        if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
        setSelected(restaurant)
    }

    return (
        <div className="restaurant__body">
            {restaurantsToShow.map((restaurant) =>
                <div className="restaurant__body--card" key={restaurant.id}>
                    <div className="card__restaurant--information">
                        <div className="restaurant__information--breadcrumbs">
                            <h3 className="information__breadcrumbs--address">Вул. {restaurant.address}</h3>
                            <p className="information__breadcrumbs--timeWork">{restaurant.time_work}</p>
                            <a className="information__breadcrumbs--tel" href={`tel:+38${restaurant.phone}`}><Icon icon="mynaui:telephone-call"/><span>{restaurant.phone}</span></a>
                        </div>
                        <p className="restaurant___information--description">{restaurant.description}</p>
                        <button className="restaurant___information--button" onClick={() => handleInfoRestaurant(restaurant)}>На мапі <Icon icon="majesticons:map-marker-line"/></button>
                    </div>
                    <img className="card__restaurant--image" src={restaurant.restaurant_image} alt={restaurant.name} />
                </div>)}
        </div>
    )
}