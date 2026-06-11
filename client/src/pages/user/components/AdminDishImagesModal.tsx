import {ChangeEvent, useEffect, useRef, useState} from "react";
import {Icon} from "@iconify/react";
import {
    useUpdateDishMutation,
    useUploadDishImageMutation,
} from "../../../redux/api/dishesApi.ts";
import getImage from "../../../utils/getImage.ts";

export type DishImageItem = {
    title: string,
    image_url: string,
}

type AdminDishImagesModalProps = {
    dishUuid: string,
    dishName: string,
    images: DishImageItem[],
    buildUpdateBody: () => {
        name: string,
        weight: string,
        price: number,
        ingredients: string,
        sub_category_uuid: string,
        active: boolean,
        frozen: boolean,
        spicy: boolean,
    },
    onClose: () => void,
    onSaved: (images: DishImageItem[]) => void,
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

function getErrorMessage(err: unknown): string {
    if (err && typeof err === "object" && "data" in err) {
        const data = (err as { data: unknown }).data;
        if (typeof data === "string") return data;
        if (data && typeof data === "object" && "message" in data) {
            return String((data as { message: unknown }).message);
        }
    }
    return "Не вдалося зберегти зображення";
}

function getMimeType(file: File): "image/jpeg" | "image/png" | "image/webp" | null {
    if (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/webp") {
        return file.type;
    }
    return null;
}

export default function AdminDishImagesModal({
    dishUuid,
    dishName,
    images,
    buildUpdateBody,
    onClose,
    onSaved,
}: AdminDishImagesModalProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [localImages, setLocalImages] = useState<DishImageItem[]>(images);
    const [uploadImage, { isLoading: isUploading }] = useUploadDishImageMutation();
    const [updateDish, { isLoading: isSaving }] = useUpdateDishMutation();
    const [newTitle, setNewTitle] = useState(dishName);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLocalImages(images);
    }, [images]);

    const handleDelete = (index: number) => {
        setLocalImages((prev) => prev.filter((_, i) => i !== index));
    };

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
            const uploaded = await uploadImage({
                data,
                mimeType,
                title: newTitle.trim() || dishName,
            }).unwrap();
            setLocalImages((prev) => [...prev, uploaded]);
        } catch (err) {
            setError(getErrorMessage(err));
        }
    };

    const handleSave = async () => {
        setError(null);
        try {
            await updateDish({
                uuid: dishUuid,
                ...buildUpdateBody(),
                images: localImages,
            }).unwrap();
            onSaved(localImages);
            onClose();
        } catch (err) {
            setError(getErrorMessage(err));
        }
    };

    return (
        <div className="user__admin-modal-backdrop">
            <div
                className="user__admin-modal user__admin-modal--images"
                role="dialog"
                aria-modal="true"
                aria-labelledby="dishImagesModalTitle"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="user__admin-modal-header">
                    <div>
                        <h2 id="dishImagesModalTitle" className="user__admin-modal-title">
                            Зображення страви
                        </h2>
                        <p className="user__admin-modal-subtitle">{dishName}</p>
                    </div>
                    <button type="button" className="user__admin-modal-close" onClick={onClose} aria-label="Закрити">
                        <Icon icon="ic:round-close" width={26}/>
                    </button>
                </div>

                <div className="user__menu-images-toolbar">
                    <label>
                        Назва для нового фото
                        <input
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            placeholder={dishName}
                        />
                    </label>
                    <button
                        type="button"
                        className="user__admin-modal-add-btn"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                    >
                        <Icon icon="mdi:image-plus-outline" width={20}/>
                        {isUploading ? "Завантаження..." : "Додати зображення"}
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        hidden
                        onChange={handleFileChange}
                    />
                </div>

                {error && (
                    <p className="user__menu-images-error" role="alert">{error}</p>
                )}

                <div className="user__menu-images-list">
                    {localImages.length === 0 && (
                        <p className="user__admin-modal-empty">Немає зображень. Додайте перше фото.</p>
                    )}

                    {localImages.map((image, index) => (
                        <article key={`${image.image_url}-${index}`} className="user__menu-images-item">
                            <img
                                src={resolveImageSrc(image.image_url)}
                                alt={image.title}
                                className="user__menu-images-preview"
                            />
                            <div className="user__menu-images-meta">
                                <p className="user__menu-images-title">{image.title}</p>
                                <p className="user__menu-images-path">{image.image_url}</p>
                            </div>
                            <button
                                type="button"
                                className="user__menu-images-delete"
                                onClick={() => handleDelete(index)}
                                aria-label="Видалити зображення"
                            >
                                <Icon icon="mdi:trash-can-outline" width={22}/>
                            </button>
                        </article>
                    ))}
                </div>

                <div className="user__menu-images-footer user__menu-modal-foot">
                    <button type="button" className="user__menu-dish-cancel" onClick={onClose}>
                        Скасувати
                    </button>
                    <button
                        type="button"
                        className="user__menu-dish-save"
                        onClick={handleSave}
                        disabled={isSaving}
                    >
                        {isSaving ? "Збереження..." : "Зберегти зображення"}
                    </button>
                </div>
            </div>
        </div>
    );
}
