import {ChangeEvent, Dispatch, SetStateAction, useRef} from "react";
import {Icon} from "@iconify/react";
import {useUploadRestaurantImageMutation} from "../../../redux/api/restaurantsApi.ts";
import getImage from "../../../utils/getImage.ts";

export type RestaurantForm = {
    name: string,
    address: string,
    phone: string,
    description: string,
    time_work: string,
    latitude: string,
    longitude: string,
    active: boolean,
    restaurant_image: string,
}

export const EMPTY_RESTAURANT_FORM: RestaurantForm = {
    name: "",
    address: "",
    phone: "",
    description: "",
    time_work: "10:00 - 22:00",
    latitude: "",
    longitude: "",
    active: true,
    restaurant_image: "",
};

export function parseRestaurantCoords(
    latitudeStr: string,
    longitudeStr: string,
): { latitude: number, longitude: number } | null {
    const latitude = parseFloat(latitudeStr.trim().replace(",", "."));
    const longitude = parseFloat(longitudeStr.trim().replace(",", "."));

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
        return null;
    }

    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
        return null;
    }

    return { latitude, longitude };
}

function resolveImageSrc(imageUrl: string) {
    return imageUrl.startsWith("http") ? imageUrl : getImage(imageUrl);
}

function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            const base64 = result.split(",")[1];
            if (!base64) {
                reject(new Error("Invalid file"));
                return;
            }
            resolve(base64);
        };
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
}

function getMimeType(file: File): "image/jpeg" | "image/png" | "image/webp" | null {
    if (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/webp") {
        return file.type;
    }
    return null;
}

function RestaurantImageUpload({
    title,
    imageUrl,
    onUploaded,
    variant = "card",
}: {
    title: string,
    imageUrl: string,
    onUploaded: (url: string) => void,
    variant?: "card" | "modal",
}) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadImage, { isLoading }] = useUploadRestaurantImageMutation();

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = "";
        if (!file) return;

        const mimeType = getMimeType(file);
        if (!mimeType) {
            window.alert("Дозволені лише JPG, PNG або WEBP");
            return;
        }

        try {
            const data = await fileToBase64(file);
            const uploaded = await uploadImage({ data, mimeType, title }).unwrap();
            onUploaded(uploaded.image_url);
        } catch (err) {
            console.log(err);
        }
    };

    const openFilePicker = () => {
        if (!isLoading) fileInputRef.current?.click();
    };

    const fileInput = (
        <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            hidden
            onChange={handleFileChange}
        />
    );

    const editBadge = (
        <span className="user__rest-image-edit" aria-hidden="true">
            <Icon icon="mdi:pencil-outline" width={16}/>
        </span>
    );

    if (variant === "modal") {
        return (
            <div className="user__city-rest-image-wrap user__city-rest-image-wrap--modal">
                <button
                    type="button"
                    className="user__rest-image-picker user__rest-image-picker--modal"
                    onClick={openFilePicker}
                    disabled={isLoading}
                    aria-label={imageUrl ? "Змінити фото локації" : "Додати фото локації"}
                >
                    {imageUrl ? (
                        <img
                            src={resolveImageSrc(imageUrl)}
                            alt={title}
                            className="user__rest-image-picker__img"
                        />
                    ) : (
                        <span className="user__rest-image-picker__empty">
                            <Icon icon="mdi:camera-plus-outline" width={32}/>
                            <span>Натисніть, щоб додати фото</span>
                        </span>
                    )}
                    {editBadge}
                    {isLoading && <span className="user__rest-image-picker__loading">Завантаження...</span>}
                </button>
                {fileInput}
            </div>
        );
    }

    return (
        <aside className="user__menu-dish-gallery">
            <button
                type="button"
                className="user__rest-image-picker user__rest-image-picker--card"
                onClick={openFilePicker}
                disabled={isLoading}
                aria-label={imageUrl ? "Змінити фото локації" : "Додати фото локації"}
            >
                {imageUrl ? (
                    <img
                        src={resolveImageSrc(imageUrl)}
                        alt={title}
                        className="user__rest-image-picker__img"
                    />
                ) : (
                    <span className="user__rest-image-picker__empty">
                        <Icon icon="mdi:store-outline" width={28}/>
                        <span>Додати фото</span>
                    </span>
                )}
                {editBadge}
                {isLoading && <span className="user__rest-image-picker__loading">...</span>}
            </button>
            {fileInput}
        </aside>
    );
}

function RestaurantFormFields({
    form,
    setForm,
    large = false,
}: {
    form: RestaurantForm,
    setForm: Dispatch<SetStateAction<RestaurantForm>>,
    large?: boolean,
}) {
    const fieldClass = large ? "user__city-field user__city-field--lg" : "";
    const rowClass = large ? "user__city-field-row" : "user__menu-dish-row";

    if (!large) {
        return (
            <>
                <label>
                    Назва
                    <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required/>
                </label>
                <label>
                    Адреса
                    <input value={form.address} onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))} required/>
                </label>
                <div className="user__menu-dish-row">
                    <label>
                        Телефон
                        <input value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} required/>
                    </label>
                    <label>
                        Години роботи
                        <input value={form.time_work} onChange={(e) => setForm((p) => ({ ...p, time_work: e.target.value }))} required/>
                    </label>
                </div>
                <div className="user__menu-dish-row">
                    <label>
                        Широта
                        <input
                            type="number"
                            step="any"
                            min={-90}
                            max={90}
                            placeholder="49.5883"
                            value={form.latitude}
                            onChange={(e) => setForm((p) => ({ ...p, latitude: e.target.value }))}
                            required
                        />
                    </label>
                    <label>
                        Довгота
                        <input
                            type="number"
                            step="any"
                            min={-180}
                            max={180}
                            placeholder="34.5514"
                            value={form.longitude}
                            onChange={(e) => setForm((p) => ({ ...p, longitude: e.target.value }))}
                            required
                        />
                    </label>
                </div>
                <label>
                    Опис
                    <textarea
                        value={form.description}
                        onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                        rows={2}
                        required
                    />
                </label>
                <div className="user__menu-pills">
                    <button
                        type="button"
                        className={`user__menu-pill${form.active ? " user__menu-pill--on" : ""}`}
                        onClick={() => setForm((p) => ({ ...p, active: !p.active }))}
                    >
                        <Icon icon={form.active ? "mdi:eye-outline" : "mdi:eye-off-outline"} width={16}/>
                        {form.active ? "В меню" : "Прихований"}
                    </button>
                </div>
            </>
        );
    }

    return (
        <>
            <label className={fieldClass}>
                Назва
                <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required/>
            </label>
            <label className={fieldClass}>
                Адреса
                <input value={form.address} onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))} required/>
            </label>
            <div className={rowClass}>
                <label className={fieldClass}>
                    Телефон
                    <input value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} required/>
                </label>
                <label className={fieldClass}>
                    Години роботи
                    <input value={form.time_work} onChange={(e) => setForm((p) => ({ ...p, time_work: e.target.value }))} required/>
                </label>
            </div>
            <div className={rowClass}>
                <label className={fieldClass}>
                    Широта
                    <input
                        type="number"
                        step="any"
                        min={-90}
                        max={90}
                        placeholder="49.5883"
                        value={form.latitude}
                        onChange={(e) => setForm((p) => ({ ...p, latitude: e.target.value }))}
                        required
                    />
                </label>
                <label className={fieldClass}>
                    Довгота
                    <input
                        type="number"
                        step="any"
                        min={-180}
                        max={180}
                        placeholder="34.5514"
                        value={form.longitude}
                        onChange={(e) => setForm((p) => ({ ...p, longitude: e.target.value }))}
                        required
                    />
                </label>
            </div>
            <label className={fieldClass}>
                Опис
                <textarea
                    value={form.description}
                    onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                    rows={3}
                    required
                />
            </label>
            <button
                type="button"
                className={`user__city-pill${form.active ? " user__city-pill--on" : ""}`}
                onClick={() => setForm((p) => ({ ...p, active: !p.active }))}
            >
                <Icon icon={form.active ? "mdi:eye-outline" : "mdi:eye-off-outline"} width={14}/>
                {form.active ? "Активний" : "Прихований"}
            </button>
        </>
    );
}

export default function AdminRestaurantForm({
    form,
    setForm,
    imageVariant = "card",
    large = false,
    layout = "horizontal",
}: {
    form: RestaurantForm,
    setForm: Dispatch<SetStateAction<RestaurantForm>>,
    imageVariant?: "card" | "modal",
    large?: boolean,
    layout?: "horizontal" | "vertical",
}) {
    const image = (
        <RestaurantImageUpload
            title={form.name || "Локація"}
            imageUrl={form.restaurant_image}
            onUploaded={(url) => setForm((p) => ({ ...p, restaurant_image: url }))}
            variant={imageVariant}
        />
    );

    const fields = <RestaurantFormFields form={form} setForm={setForm} large={large}/>;

    if (layout === "vertical") {
        return (
            <div className="user__city-rest-vertical">
                {image}
                <div className={large ? "user__city-rest-fields" : "user__menu-dish-fields"}>{fields}</div>
            </div>
        );
    }

    if (large) {
        return (
            <div className="user__city-rest-inner">
                {image}
                <div className="user__city-rest-fields">{fields}</div>
            </div>
        );
    }

    return (
        <div className="user__menu-dish-body">
            {image}
            <div className="user__menu-dish-fields">{fields}</div>
        </div>
    );
}
