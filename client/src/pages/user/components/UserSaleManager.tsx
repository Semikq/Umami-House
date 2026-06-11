import {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import {Icon} from "@iconify/react";
import {
    useAddSaleMutation,
    useDeleteSaleMutation,
    useSaleQuery,
    useUpdateSaleMutation,
    useUploadSaleImageMutation,
} from "../../../redux/api/saleApi.ts";
import {Sale} from "../../../redux/types/sale.ts";
import getImage from "../../../utils/getImage.ts";

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

function SaleImageUpload({
    title,
    imageUrl,
    onUploaded,
}: {
    title: string,
    imageUrl: string,
    onUploaded: (url: string) => void,
}) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadImage, { isLoading }] = useUploadSaleImageMutation();

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = "";
        if (!file) return;

        const mimeType = getMimeType(file);
        if (!mimeType) {
            window.alert("Дозволені лише JPG, PNG або WEBP");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            window.alert("Файл занадто великий (макс. 5 МБ)");
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

    return (
        <aside className="user__menu-dish-gallery">
            <div className="user__menu-dish-images">
                {imageUrl ? (
                    <img
                        src={resolveImageSrc(imageUrl)}
                        alt={title}
                        className="user__menu-dish-image user__menu-dish-image--banner"
                    />
                ) : (
                    <div className="user__menu-dish-image user__menu-dish-image--empty">
                        <Icon icon="mdi:image-off-outline" width={28}/>
                    </div>
                )}
            </div>
            <button
                type="button"
                className="user__menu-dish-gallery-btn"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
            >
                <Icon icon="mdi:image-edit-outline" width={16}/>
                {isLoading ? "..." : "Фото"}
            </button>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                hidden
                onChange={handleFileChange}
            />
        </aside>
    );
}

function AdminSaleEditCard({ sale }: { sale: Sale }) {
    const [updateSale, { isLoading }] = useUpdateSaleMutation();
    const [deleteSale, { isLoading: isDeleting }] = useDeleteSaleMutation();
    const [title, setTitle] = useState(sale.title);
    const [imageUrl, setImageUrl] = useState(sale.image_url);
    const [active, setActive] = useState(sale.active);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        setTitle(sale.title);
        setImageUrl(sale.image_url);
        setActive(sale.active);
        setSaved(false);
    }, [sale]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await updateSale({
                uuid: sale.uuid,
                title: title.trim(),
                image_url: imageUrl,
                active,
            }).unwrap();
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm(`Видалити акцію «${title}»?`)) return;
        try {
            await deleteSale(sale.uuid).unwrap();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form className="user__menu-dish" onSubmit={handleSubmit}>
            <header className="user__menu-dish-head">
                <span className={`user__menu-dish-head-tag${active ? " user__menu-dish-head-tag--on" : " user__menu-dish-head-tag--off"}`}>
                    {active ? "Активна" : "Неактивна"}
                </span>
                <div className="user__menu-dish-head-row">
                    <h4 className="user__menu-dish-head-title">{title || "Без назви"}</h4>
                    <button
                        type="button"
                        className="user__menu-dish-delete"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        aria-label="Видалити акцію"
                    >
                        <Icon icon="mdi:trash-can-outline" width={18}/>
                    </button>
                </div>
            </header>

            <div className="user__menu-dish-body">
                <SaleImageUpload title={title} imageUrl={imageUrl} onUploaded={setImageUrl}/>
                <div className="user__menu-dish-fields">
                    <label>
                        Назва акції
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </label>
                    <div className="user__menu-pills">
                        <button
                            type="button"
                            className={`user__menu-pill${active ? " user__menu-pill--on" : ""}`}
                            onClick={() => setActive((prev) => !prev)}
                        >
                            <Icon icon={active ? "mdi:eye-outline" : "mdi:eye-off-outline"} width={16}/>
                            {active ? "В меню" : "Прихована"}
                        </button>
                    </div>
                </div>
            </div>

            <footer className="user__menu-dish-foot">
                <button
                    type="submit"
                    className={`user__menu-dish-save${saved ? " user__menu-dish-save--saved" : ""}`}
                    disabled={isLoading || !imageUrl}
                >
                    {isLoading ? "Збереження..." : saved ? "Збережено ✓" : "Зберегти зміни"}
                </button>
            </footer>
        </form>
    );
}

function AdminAddSaleModal({ onClose }: { onClose: () => void }) {
    const [addSale, { isLoading }] = useAddSaleMutation();
    const [uploadImage, { isLoading: isUploading }] = useUploadSaleImageMutation();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [title, setTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [active, setActive] = useState(true);

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
            const uploaded = await uploadImage({
                data,
                mimeType,
                title: title.trim() || "Акція",
            }).unwrap();
            setImageUrl(uploaded.image_url);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!imageUrl) return;
        try {
            await addSale({
                title: title.trim(),
                image_url: imageUrl,
                active,
            }).unwrap();
            onClose();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="user__admin-modal-backdrop">
            <div
                className="user__admin-modal user__admin-modal--sale"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="addSaleModalTitle"
            >
                <div className="user__admin-modal-header">
                    <div>
                        <h2 id="addSaleModalTitle" className="user__admin-modal-title">Нова акція</h2>
                        <p className="user__admin-modal-subtitle">Новий банер для слайдера</p>
                    </div>
                    <button type="button" className="user__admin-modal-close" onClick={onClose} aria-label="Закрити">
                        <Icon icon="mdi:close" width={24}/>
                    </button>
                </div>

                <form className="user__sale-modal-form" onSubmit={handleSubmit}>
                    <div className="user__sale-image-wrap">
                        {imageUrl ? (
                            <img src={resolveImageSrc(imageUrl)} alt={title} className="user__sale-image"/>
                        ) : (
                            <div className="user__sale-image user__sale-image--empty">
                                <Icon icon="mdi:image-plus-outline" width={36}/>
                            </div>
                        )}
                        <button
                            type="button"
                            className="user__sale-image-btn"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                        >
                            <Icon icon="mdi:upload" width={16}/>
                            {isUploading ? "Завантаження..." : "Завантажити банер"}
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            hidden
                            onChange={handleFileChange}
                        />
                    </div>

                    <label className="user__sale-field">
                        Назва акції
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Наприклад: Знижка на суші"
                            required
                        />
                    </label>

                    <button
                        type="button"
                        className={`user__sale-pill${active ? " user__sale-pill--on" : ""}`}
                        onClick={() => setActive((prev) => !prev)}
                    >
                        <Icon icon={active ? "mdi:eye-outline" : "mdi:eye-off-outline"} width={16}/>
                        {active ? "Показувати на сайті" : "Прихована"}
                    </button>

                    <div className="user__city-modal-foot">
                        <button type="button" className="user__sale-cancel" onClick={onClose}>
                            Скасувати
                        </button>
                        <button type="submit" className="user__sale-save" disabled={isLoading || !imageUrl}>
                            {isLoading ? "Додавання..." : "Додати акцію"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function UserSaleManager() {
    const { data: sales = [], isLoading } = useSaleQuery();
    const [showAddModal, setShowAddModal] = useState(false);

    return (
        <section className="user__sale user__sale--standalone" id="sales">
            <div className="user__city-topbar">
                <h2 className="user__menu-title">Акції</h2>
                <button
                    type="button"
                    className="user__city-add-loc-btn"
                    onClick={() => setShowAddModal(true)}
                >
                    <Icon icon="mdi:plus" width={18}/>
                    Додати акцію
                </button>
            </div>
            <p className="user__menu-subtitle">
                Керуйте банерами акцій на головній сторінці та в розділі «Акції»
            </p>

            {isLoading && <p className="user__menu-empty">Завантаження акцій...</p>}

            {!isLoading && (
                <div className="user__menu-dishes user__sale-grid">
                    {sales.map((sale) => (
                        <AdminSaleEditCard key={sale.uuid} sale={sale}/>
                    ))}
                </div>
            )}

            {showAddModal && <AdminAddSaleModal onClose={() => setShowAddModal(false)}/>}
        </section>
    );
}
