import {Link} from "react-router-dom";
import {useGetFavoritesQuery} from "../../../redux/api/favoritesApi.ts";
import {Dish} from "../../../redux/types/dishes.ts";
import DishCardList from "../../../components/dishCard/DishCardList.tsx";

export default function UserFavorites({userUuid}: { userUuid: string }) {
    const {data: favorites = [], isLoading} = useGetFavoritesQuery(userUuid);
    const favoriteDishes = favorites
        .map((favorite) => favorite.dishes)
        .filter((dish): dish is Dish => Boolean(dish?.dish_images?.length));

    if (isLoading) return null;

    return (
        <div id="favorites" className="user__favorites">
            <h1 className="user__favorites-title">Ваші улюблені страви!</h1>

            {favoriteDishes.length === 0 ? (
                <>
                    <p className="user__favorites-text">
                        Ви ще не додали жодної страви до улюблених. Знайдіть і додайте улюблені страви прямо зараз, щоб у майбутньому замовляти їх ще швидше та зручніше!
                    </p>
                    <Link to="/">
                        <button type="button" className="user__info-button--favorites">
                            Знайти улюблену страву!
                        </button>
                    </Link>
                </>
            ) : (
                <>
                    <p className="user__favorites-text">
                        Приємного перегляду ваших улюблених страв! Сподіваємося, що ви замовите щось смачненьке знову!
                    </p>
                    <DishCardList dishes={favoriteDishes}/>
                </>
            )}
        </div>
    );
}
