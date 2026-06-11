import {FormEvent, useState} from "react";
import {Icon} from "@iconify/react";
import {useAddRestaurantMutation} from "../../../redux/api/restaurantsApi.ts";
import AdminRestaurantForm, {
    EMPTY_RESTAURANT_FORM,
    parseRestaurantCoords,
    RestaurantForm,
} from "./AdminRestaurantForm.tsx";

type AdminAddRestaurantModalProps = {
    cityUuid: string,
    cityName: string,
    onClose: () => void,
};

export default function AdminAddRestaurantModal({
    cityUuid,
    cityName,
    onClose,
}: AdminAddRestaurantModalProps) {
    const [addRestaurant, { isLoading }] = useAddRestaurantMutation();
    const [form, setForm] = useState<RestaurantForm>(EMPTY_RESTAURANT_FORM);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!form.restaurant_image) return;

        const coords = parseRestaurantCoords(form.latitude, form.longitude);
        if (!coords) {
            window.alert("Вкажіть коректні координати: широта від -90 до 90, довгота від -180 до 180.");
            return;
        }

        try {
            await addRestaurant({
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
            }).unwrap();
            onClose();
        } catch (err) {
            console.log(err);
            window.alert("Не вдалося додати локацію. Перевірте дані та спробуйте ще раз.");
        }
    };

    return (
        <div className="user__admin-modal-backdrop">
            <div
                className="user__admin-modal user__admin-modal--restaurant"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="addRestaurantModalTitle"
            >
                <div className="user__admin-modal-header">
                    <div>
                        <h2 id="addRestaurantModalTitle" className="user__admin-modal-title">
                            Нова локація
                        </h2>
                        <p className="user__admin-modal-subtitle">{cityName}</p>
                    </div>
                    <button type="button" className="user__admin-modal-close" onClick={onClose} aria-label="Закрити">
                        <Icon icon="mdi:close" width={24}/>
                    </button>
                </div>

                <form className="user__city-modal-form" onSubmit={handleSubmit}>
                    <AdminRestaurantForm
                        form={form}
                        setForm={setForm}
                        imageVariant="modal"
                        layout="vertical"
                    />
                    <div className="user__city-modal-foot">
                        <button type="button" className="user__city-cancel" onClick={onClose}>Скасувати</button>
                        <button type="submit" className="user__city-save" disabled={isLoading || !form.restaurant_image}>
                            {isLoading ? "Додавання..." : "Додати локацію"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
