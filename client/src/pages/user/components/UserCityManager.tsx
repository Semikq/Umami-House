import {FormEvent, useEffect, useMemo, useState} from "react";
import {Icon} from "@iconify/react";
import {
    useAddCityMutation,
    useCitiesQuery,
    useDeleteCityMutation,
    useDeleteRestaurantMutation,
    useRestaurantsQuery,
    useUpdateRestaurantMutation,
} from "../../../redux/api/restaurantsApi.ts";
import {Cities, Restaurants} from "../../../redux/types/restaurants.ts";
import getImage from "../../../utils/getImage.ts";
import AdminAddRestaurantModal from "./AdminAddRestaurantModal.tsx";
import AdminRestaurantForm, {parseRestaurantCoords, RestaurantForm} from "./AdminRestaurantForm.tsx";

function resolveImageSrc(imageUrl: string) {
    return imageUrl.startsWith("http") ? imageUrl : getImage(imageUrl);
}

function restaurantToForm(restaurant: Restaurants): RestaurantForm {
    return {
        name: restaurant.name,
        address: restaurant.address,
        phone: restaurant.phone,
        description: restaurant.description,
        time_work: restaurant.time_work,
        latitude: String(restaurant.latitude),
        longitude: String(restaurant.longitude),
        active: restaurant.active,
        restaurant_image: restaurant.restaurant_image,
    };
}

function AdminRestaurantCard({
    restaurant,
    cityUuid,
}: {
    restaurant: Restaurants,
    cityUuid: string,
}) {
    const [updateRestaurant, { isLoading }] = useUpdateRestaurantMutation();
    const [deleteRestaurant, { isLoading: isDeleting }] = useDeleteRestaurantMutation();
    const [form, setForm] = useState<RestaurantForm>(() => restaurantToForm(restaurant));
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        setForm(restaurantToForm(restaurant));
        setSaved(false);
    }, [restaurant]);

    const buildBody = () => {
        const coords = parseRestaurantCoords(form.latitude, form.longitude);
        if (!coords) return null;

        return {
            city_uuid: cityUuid,
            name: form.name.trim(),
            address: form.address.trim(),
            phone: form.phone.trim(),
            description: form.description.trim(),
            time_work: form.time_work.trim(),
            latitude: coords.latitude,
            longitude: coords.longitude,
            active: form.active,
            restaurant_image: form.restaurant_image,
        };
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!form.restaurant_image) return;

        const body = buildBody();
        if (!body) {
            window.alert("Вкажіть коректні координати: широта від -90 до 90, довгота від -180 до 180.");
            return;
        }

        try {
            await updateRestaurant({ uuid: restaurant.uuid, ...body }).unwrap();
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm(`Видалити локацію «${form.name}»?`)) return;
        try {
            await deleteRestaurant(restaurant.uuid).unwrap();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form className="user__menu-dish" onSubmit={handleSubmit}>
            <header className="user__menu-dish-head">
                <span className={`user__menu-dish-head-tag${form.active ? " user__menu-dish-head-tag--on" : " user__menu-dish-head-tag--off"}`}>
                    {form.active ? "Активна" : "Прихована"}
                </span>
                <div className="user__menu-dish-head-row">
                    <h4 className="user__menu-dish-head-title">{form.name || "Без назви"}</h4>
                    <button
                        type="button"
                        className="user__menu-dish-delete"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        aria-label="Видалити локацію"
                    >
                        <Icon icon="mdi:trash-can-outline" width={18}/>
                    </button>
                </div>
            </header>

            <AdminRestaurantForm form={form} setForm={setForm}/>

            <footer className="user__menu-dish-foot">
                <button
                    type="submit"
                    className={`user__menu-dish-save${saved ? " user__menu-dish-save--saved" : ""}`}
                    disabled={isLoading || !form.restaurant_image}
                >
                    {isLoading ? "Збереження..." : saved ? "Збережено ✓" : "Зберегти зміни"}
                </button>
            </footer>
        </form>
    );
}

function AdminAddCityCard({ onCancel }: { onCancel: () => void }) {
    const [addCity, { isLoading }] = useAddCityMutation();
    const [name, setName] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        try {
            await addCity({ name: name.trim() }).unwrap();
            onCancel();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form className="user__menu-category user__menu-category--form" onSubmit={handleSubmit}>
            <span className="user__city-add-badge">Нове місто</span>
            <label className="user__city-field">
                Назва міста
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Наприклад: Київ"
                    required
                    autoFocus
                />
            </label>
            <div className="user__city-add-foot">
                <button type="button" className="user__city-cancel" onClick={onCancel}>Скасувати</button>
                <button type="submit" className="user__city-save user__city-save--sm" disabled={isLoading}>
                    {isLoading ? "..." : "Додати"}
                </button>
            </div>
        </form>
    );
}

function AddCityPlaceholder({ onClick }: { onClick: () => void }) {
    return (
        <button type="button" className="user__menu-category user__menu-category--add" onClick={onClick}>
            <span className="user__menu-category-image user__menu-category-image--add">
                <Icon icon="mdi:plus" width={36}/>
            </span>
            <span className="user__menu-category-title">Додати місто</span>
            <span className="user__menu-dish-add-hint">Нова локація для ресторанів</span>
        </button>
    );
}

function CityPicker({
    cities,
    restaurantsByCity,
    showAddCity,
    onShowAddCity,
    onCancelAddCity,
    onSelect,
}: {
    cities: Cities[],
    restaurantsByCity: Map<string, Restaurants[]>,
    showAddCity: boolean,
    onShowAddCity: () => void,
    onCancelAddCity: () => void,
    onSelect: (uuid: string) => void,
}) {
    return (
        <div className="user__menu-categories">
            {showAddCity ? (
                <AdminAddCityCard onCancel={onCancelAddCity}/>
            ) : (
                <AddCityPlaceholder onClick={onShowAddCity}/>
            )}
            {cities.map((city) => {
                const cityRestaurants = restaurantsByCity.get(city.uuid) ?? [];
                const previewImage = cityRestaurants.find((r) => r.restaurant_image)?.restaurant_image;

                return (
                    <button
                        key={city.uuid}
                        type="button"
                        className="user__menu-category"
                        onClick={() => onSelect(city.uuid)}
                    >
                        {previewImage ? (
                            <img
                                src={resolveImageSrc(previewImage)}
                                alt={city.name}
                                className="user__menu-category-image"
                            />
                        ) : (
                            <div className="user__menu-category-image user__menu-category-image--placeholder">
                                <Icon icon="mdi:city-variant-outline" width={48}/>
                            </div>
                        )}
                        <span className="user__menu-category-title">{city.name}</span>
                        <span className="user__menu-dish-add-hint">
                            {cityRestaurants.length} локаці{cityRestaurants.length === 1 ? "я" : "й"}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}

function CityRestaurantsPanel({
    city,
    restaurants,
    addModalOpen,
    onCloseAddModal,
}: {
    city: Cities,
    restaurants: Restaurants[],
    addModalOpen: boolean,
    onCloseAddModal: () => void,
}) {
    return (
        <>
            <div className="user__menu-dishes user__city-restaurants">
                {restaurants.map((restaurant) => (
                    <AdminRestaurantCard
                        key={restaurant.uuid}
                        restaurant={restaurant}
                        cityUuid={city.uuid}
                    />
                ))}
                {restaurants.length === 0 && (
                    <p className="user__menu-empty">У цьому місті ще немає локацій. Натисніть «Додати локацію».</p>
                )}
            </div>

            {addModalOpen && (
                <AdminAddRestaurantModal
                    cityUuid={city.uuid}
                    cityName={city.name}
                    onClose={onCloseAddModal}
                />
            )}
        </>
    );
}

export default function UserCityManager() {
    const { data: cities = [], isLoading: citiesLoading } = useCitiesQuery();
    const { data: restaurants = [], isLoading: restaurantsLoading } = useRestaurantsQuery();
    const [deleteCity, { isLoading: isDeletingCity }] = useDeleteCityMutation();
    const [selectedCityUuid, setSelectedCityUuid] = useState<string | null>(null);
    const [showAddCity, setShowAddCity] = useState(false);
    const [addRestaurantModalOpen, setAddRestaurantModalOpen] = useState(false);

    const restaurantsByCity = useMemo(() => {
        const map = new Map<string, Restaurants[]>();
        for (const restaurant of restaurants) {
            const list = map.get(restaurant.city_uuid) ?? [];
            list.push(restaurant);
            map.set(restaurant.city_uuid, list);
        }
        return map;
    }, [restaurants]);

    const selectedCity = cities.find((city) => city.uuid === selectedCityUuid) ?? null;
    const selectedRestaurants = selectedCityUuid
        ? restaurantsByCity.get(selectedCityUuid) ?? []
        : [];

    const isLoading = citiesLoading || restaurantsLoading;

    const handleDeleteCity = async () => {
        if (!selectedCity) return;
        const count = selectedRestaurants.length;
        const message = count > 0
            ? `Видалити місто «${selectedCity.name}»? Спочатку будуть видалені всі локації (${count}).`
            : `Видалити місто «${selectedCity.name}»?`;
        if (!window.confirm(message)) return;
        try {
            await deleteCity(selectedCity.uuid).unwrap();
            setSelectedCityUuid(null);
            setAddRestaurantModalOpen(false);
        } catch (err) {
            console.log(err);
            window.alert("Не вдалося видалити місто. Можливо, до нього привʼязані користувачі.");
        }
    };

    const handleBackToCities = () => {
        setSelectedCityUuid(null);
        setAddRestaurantModalOpen(false);
    };

    return (
        <section className="user__city user__city--standalone" id="cities">
            <div className="user__city-topbar">
                <div className="user__city-topbar-left">
                    <h2 className="user__menu-title">
                        Міста
                        {selectedCity && (
                            <>
                                {" "}
                                <span className="user__city-topbar-city">{selectedCity.name}</span>
                            </>
                        )}
                    </h2>
                </div>
                {selectedCity && (
                    <div className="user__city-detail-actions">
                        <button
                            type="button"
                            className="user__menu-back user__city-topbar-back"
                            onClick={handleBackToCities}
                        >
                            <Icon icon="mdi:arrow-left" width={20}/>
                            Назад до міст
                        </button>
                        <button
                            type="button"
                            className="user__city-add-loc-btn"
                            onClick={() => setAddRestaurantModalOpen(true)}
                        >
                            <Icon icon="mdi:plus" width={18}/>
                            Додати локацію
                        </button>
                        <button
                            type="button"
                            className="user__city-delete"
                            onClick={handleDeleteCity}
                            disabled={isDeletingCity}
                            aria-label="Видалити місто"
                        >
                            <Icon icon="mdi:trash-can-outline" width={18}/>
                        </button>
                    </div>
                )}
            </div>

            <p className="user__menu-subtitle">
                {selectedCity
                    ? `Керуйте локаціями ресторанів у місті ${selectedCity.name}`
                    : "Оберіть місто та керуйте локаціями ресторанів"}
            </p>

            {isLoading && <p className="user__menu-empty">Завантаження...</p>}

            {!isLoading && !selectedCityUuid && (
                <CityPicker
                    cities={cities}
                    restaurantsByCity={restaurantsByCity}
                    showAddCity={showAddCity}
                    onShowAddCity={() => setShowAddCity(true)}
                    onCancelAddCity={() => setShowAddCity(false)}
                    onSelect={setSelectedCityUuid}
                />
            )}

            {!isLoading && selectedCity && (
                <CityRestaurantsPanel
                    city={selectedCity}
                    restaurants={selectedRestaurants}
                    addModalOpen={addRestaurantModalOpen}
                    onCloseAddModal={() => setAddRestaurantModalOpen(false)}
                />
            )}
        </section>
    );
}
