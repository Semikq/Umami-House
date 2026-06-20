import {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import {Icon} from "@iconify/react";
import {
    useAddPartnerMutation,
    useDeletePartnerMutation,
    usePartnersQuery,
    useUpdatePartnerMutation,
    useUploadPartnerLogoMutation,
} from "../../../redux/api/partnersApi.ts";
import {Partners} from "../../../redux/types/partners.ts";
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

function PartnerLogoUpload({
    title,
    logoUrl,
    onUploaded,
}: {
    title: string,
    logoUrl: string,
    onUploaded: (url: string) => void,
}) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadLogo, { isLoading }] = useUploadPartnerLogoMutation();

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
            const uploaded = await uploadLogo({ data, mimeType, title }).unwrap();
            onUploaded(uploaded.logo_img);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <aside className="user__menu-dish-gallery">
            <div className="user__menu-dish-images">
                {logoUrl ? (
                    <img
                        src={resolveImageSrc(logoUrl)}
                        alt={title}
                        className="user__menu-dish-image user__menu-dish-image--contain"
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

function AdminPartnerEditCard({ partner }: { partner: Partners }) {
    const [updatePartner, { isLoading }] = useUpdatePartnerMutation();
    const [deletePartner, { isLoading: isDeleting }] = useDeletePartnerMutation();
    const [name, setName] = useState(partner.name);
    const [logoUrl, setLogoUrl] = useState(partner.logo_img);
    const [linkWebsite, setLinkWebsite] = useState(partner.link_website ?? "");
    const [active, setActive] = useState(partner.active);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        setName(partner.name);
        setLogoUrl(partner.logo_img);
        setLinkWebsite(partner.link_website ?? "");
        setActive(partner.active);
        setSaved(false);
    }, [partner]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await updatePartner({
                uuid: partner.uuid,
                name: name.trim(),
                logo_img: logoUrl,
                link_website: linkWebsite.trim() || undefined,
                active,
            }).unwrap();
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm(`Видалити партнера «${name}»?`)) return;
        try {
            await deletePartner(partner.uuid).unwrap();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form className="user__menu-dish" onSubmit={handleSubmit}>
            <header className="user__menu-dish-head">
                <span className={`user__menu-dish-head-tag${active ? " user__menu-dish-head-tag--on" : " user__menu-dish-head-tag--off"}`}>
                    {active ? "Активний" : "Прихований"}
                </span>
                <div className="user__menu-dish-head-row">
                    <h4 className="user__menu-dish-head-title">{name || "Без назви"}</h4>
                    <button
                        type="button"
                        className="user__menu-dish-delete"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        aria-label="Видалити партнера"
                    >
                        <Icon icon="mdi:trash-can-outline" width={18}/>
                    </button>
                </div>
            </header>

            <div className="user__menu-dish-body">
                <PartnerLogoUpload title={name} logoUrl={logoUrl} onUploaded={setLogoUrl}/>
                <div className="user__menu-dish-fields">
                    <label>
                        Назва партнера
                        <input value={name} onChange={(e) => setName(e.target.value)} required/>
                    </label>
                    <label>
                        Посилання на сайт
                        <input
                            value={linkWebsite}
                            onChange={(e) => setLinkWebsite(e.target.value)}
                            placeholder="https://example.com"
                        />
                    </label>
                    <div className="user__menu-pills">
                        <button
                            type="button"
                            className={`user__menu-pill${active ? " user__menu-pill--on" : ""}`}
                            onClick={() => setActive((prev) => !prev)}
                        >
                            <Icon icon={active ? "mdi:eye-outline" : "mdi:eye-off-outline"} width={16}/>
                            {active ? "В меню" : "Прихований"}
                        </button>
                    </div>
                </div>
            </div>

            <footer className="user__menu-dish-foot">
                <button
                    type="submit"
                    className={`user__menu-dish-save${saved ? " user__menu-dish-save--saved" : ""}`}
                    disabled={isLoading || !logoUrl}
                >
                    {isLoading ? "Збереження..." : saved ? "Збережено ✓" : "Зберегти зміни"}
                </button>
            </footer>
        </form>
    );
}

function AdminAddPartnerModal({ onClose }: { onClose: () => void }) {
    const [addPartner, { isLoading }] = useAddPartnerMutation();
    const [uploadLogo, { isLoading: isUploading }] = useUploadPartnerLogoMutation();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [name, setName] = useState("");
    const [logoUrl, setLogoUrl] = useState("");
    const [linkWebsite, setLinkWebsite] = useState("");
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
            const uploaded = await uploadLogo({
                data,
                mimeType,
                title: name.trim() || "Партнер",
            }).unwrap();
            setLogoUrl(uploaded.logo_img);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!logoUrl) return;
        try {
            await addPartner({
                name: name.trim(),
                logo_img: logoUrl,
                link_website: linkWebsite.trim() || undefined,
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
                className="user__admin-modal user__admin-modal--partner"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="addPartnerModalTitle"
            >
                <div className="user__admin-modal-header">
                    <div>
                        <h2 id="addPartnerModalTitle" className="user__admin-modal-title">Новий партнер</h2>
                        <p className="user__admin-modal-subtitle">Логотип у блоці «Наші партнери» на головній</p>
                    </div>
                    <button type="button" className="user__admin-modal-close" onClick={onClose} aria-label="Закрити">
                        <Icon icon="mdi:close" width={24}/>
                    </button>
                </div>

                <form className="user__sale-modal-form" onSubmit={handleSubmit}>
                    <div className="user__partner-logo-wrap">
                        {logoUrl ? (
                            <img src={resolveImageSrc(logoUrl)} alt={name} className="user__partner-logo"/>
                        ) : (
                            <div className="user__partner-logo user__partner-logo--empty">
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
                            {isUploading ? "Завантаження..." : "Завантажити логотип"}
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
                        Назва партнера
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Наприклад: Lotus Stop"
                            required
                        />
                    </label>

                    <label className="user__sale-field">
                        Посилання на сайт
                        <input
                            value={linkWebsite}
                            onChange={(e) => setLinkWebsite(e.target.value)}
                            placeholder="https://example.com"
                        />
                    </label>

                    <button
                        type="button"
                        className={`user__sale-pill${active ? " user__sale-pill--on" : ""}`}
                        onClick={() => setActive((prev) => !prev)}
                    >
                        <Icon icon={active ? "mdi:eye-outline" : "mdi:eye-off-outline"} width={16}/>
                        {active ? "Показувати на сайті" : "Прихований"}
                    </button>

                    <div className="user__city-modal-foot">
                        <button type="button" className="user__sale-cancel" onClick={onClose}>Скасувати</button>
                        <button type="submit" className="user__sale-save" disabled={isLoading || !logoUrl}>
                            {isLoading ? "Додавання..." : "Додати партнера"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function UserPartnerManager() {
    const { data: partners = [], isLoading } = usePartnersQuery();
    const [showAddModal, setShowAddModal] = useState(false);

    return (
        <section className="user__partner user__partner--standalone" id="partners">
            <div className="user__city-topbar">
                <h2 className="user__menu-title">Партнери</h2>
                <button
                    type="button"
                    className="user__city-add-loc-btn"
                    onClick={() => setShowAddModal(true)}
                >
                    <Icon icon="mdi:plus" width={18}/>
                    Додати партнера
                </button>
            </div>
            <p className="user__menu-subtitle">
                Керуйте логотипами партнерів у блоці «Наші партнери» на головній сторінці
            </p>

            {isLoading && <p className="user__menu-empty">Завантаження партнерів...</p>}

            {!isLoading && (
                <div className="user__menu-dishes user__partner-grid">
                    {partners.map((partner) => (
                        <AdminPartnerEditCard key={partner.uuid} partner={partner}/>
                    ))}
                    {partners.length === 0 && (
                        <p className="user__menu-empty">Партнерів ще немає. Натисніть «Додати партнера».</p>
                    )}
                </div>
            )}

            {showAddModal && <AdminAddPartnerModal onClose={() => setShowAddModal(false)}/>}
        </section>
    );
}
