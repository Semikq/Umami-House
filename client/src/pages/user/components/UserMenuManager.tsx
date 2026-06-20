import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState} from "react";

import {Icon} from "@iconify/react";

import {

    useAddDishMutation,

    useCategoriesQuery,

    useCategoryWithDishesQuery,

    useDeleteDishMutation,

    useUpdateDishMutation,

    useUploadDishImageMutation,

    useUpdateCategoryMutation,

} from "../../../redux/api/dishesApi.ts";

import {Categories, Dish, SubCategory} from "../../../redux/types/dishes.ts";

import getImage from "../../../utils/getImage.ts";

import AdminDishImagesModal, {DishImageItem} from "./AdminDishImagesModal.tsx";

import AdminSubCategoryPanel from "./AdminSubCategoryPanel.tsx";
import {CORPORATE_TYPE_OPTIONS} from "../../../utils/corporateOffer.ts";



type DishForm = {

    name: string,

    weight: string,

    price: string,

    ingredients: string,

    active: boolean,

    frozen: boolean,

    spicy: boolean,

    corporate_type: string,

    wholesale_min_qty: string,

    wholesale_price: string,

}



type SubCategoryOption = {

    uuid: string,

    name: string,

}



function dishToForm(dish: Dish): DishForm {

    return {

        name: dish.name,

        weight: String(dish.weight),

        price: String(dish.price),

        ingredients: dish.ingredients,

        active: dish.active,

        frozen: dish.frozen,

        spicy: dish.spicy,

        corporate_type: dish.corporate_type ?? "",

        wholesale_min_qty: dish.wholesale_min_qty != null ? String(dish.wholesale_min_qty) : "",

        wholesale_price: dish.wholesale_price != null ? String(dish.wholesale_price) : "",

    };

}



function dishToImages(dish: Dish): DishImageItem[] {

    return dish.dish_images.map((image) => ({

        title: image.title,

        image_url: image.image_url,

    }));

}



function resolveImageSrc(imageUrl: string) {

    return imageUrl.startsWith("http") ? imageUrl : getImage(imageUrl);

}



function DishFormFields({

    form,

    setForm,

    subCategories,

    subCategoryUuid,

    onSubCategoryChange,

    showSubCategory = true,

}: {

    form: DishForm,

    setForm: Dispatch<SetStateAction<DishForm>>,

    subCategories: SubCategoryOption[],

    subCategoryUuid: string,

    onSubCategoryChange: (uuid: string) => void,

    showSubCategory?: boolean,

}) {

    return (

        <>

            <div className="user__menu-dish-row user__menu-dish-row--name">
                {showSubCategory && (
                    <label>
                        Підкатегорія
                        <select
                            value={subCategoryUuid}
                            onChange={(e) => onSubCategoryChange(e.target.value)}
                            required
                        >
                            {subCategories.map((sub) => (
                                <option key={sub.uuid} value={sub.uuid}>{sub.name}</option>
                            ))}
                        </select>
                    </label>
                )}
                <label className={showSubCategory ? "" : "user__menu-dish-name-full"}>
                    Назва
                    <input
                        value={form.name}
                        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                        required
                    />
                </label>
            </div>

            <div className="user__menu-dish-row">

                <label>

                    Вага

                    <input

                        type="number"

                        min={1}

                        value={form.weight}

                        onChange={(e) => setForm((p) => ({ ...p, weight: e.target.value }))}

                        required

                    />

                </label>

                <label>

                    Ціна (₴)

                    <input

                        type="number"

                        min={1}

                        value={form.price}

                        onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}

                        required

                    />

                </label>

            </div>

            <div className="user__menu-dish-row user__menu-dish-row--corporate">
                <label>
                    Тип закладу для акції
                    <select
                        value={form.corporate_type}
                        onChange={(e) => setForm((p) => ({
                            ...p,
                            corporate_type: e.target.value,
                            wholesale_min_qty: e.target.value ? p.wholesale_min_qty : "",
                            wholesale_price: e.target.value ? p.wholesale_price : "",
                        }))}
                    >
                        <option value="">Без корп. акції</option>
                        {CORPORATE_TYPE_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Спец. ціна для типу закладу (₴)
                    <input
                        type="number"
                        min={1}
                        value={form.wholesale_price}
                        disabled={!form.corporate_type}
                        onChange={(e) => setForm((p) => ({ ...p, wholesale_price: e.target.value }))}
                    />
                </label>
                <label>
                    Мін. кількість для опту (необов&apos;язково)
                    <input
                        type="number"
                        min={1}
                        placeholder="1"
                        value={form.wholesale_min_qty}
                        disabled={!form.corporate_type}
                        onChange={(e) => setForm((p) => ({ ...p, wholesale_min_qty: e.target.value }))}
                    />
                </label>
            </div>

            <label>

                Інгредієнти

                <textarea

                    value={form.ingredients}

                    onChange={(e) => setForm((p) => ({ ...p, ingredients: e.target.value }))}

                    rows={3}

                    required

                />

            </label>

            <div className="user__menu-pills">
                <button
                    type="button"
                    className={`user__menu-pill${form.active ? " user__menu-pill--on" : ""}`}
                    onClick={() => setForm((p) => ({ ...p, active: !p.active }))}
                >
                    <Icon icon="mdi:check-circle-outline" width={16}/>
                    В меню
                </button>
                <button
                    type="button"
                    className={`user__menu-pill user__menu-pill--spicy${form.spicy ? " user__menu-pill--on" : ""}`}
                    onClick={() => setForm((p) => ({ ...p, spicy: !p.spicy }))}
                >
                    <Icon icon="mdi:chili-hot" width={16}/>
                    Гостра
                </button>
            </div>

        </>

    );

}



function AdminDishEditCard({

    dish,

    subCategories,

}: {

    dish: Dish,

    subCategories: SubCategoryOption[],

}) {

    const [updateDish, { isLoading }] = useUpdateDishMutation();

    const [deleteDish, { isLoading: isDeleting }] = useDeleteDishMutation();

    const [form, setForm] = useState<DishForm>(() => dishToForm(dish));

    const [images, setImages] = useState<DishImageItem[]>(() => dishToImages(dish));

    const [subCategoryUuid, setSubCategoryUuid] = useState(dish.sub_category_uuid);

    const [saved, setSaved] = useState(false);

    const [imagesModalOpen, setImagesModalOpen] = useState(false);



    useEffect(() => {

        setForm(dishToForm(dish));

        setImages(dishToImages(dish));

        setSubCategoryUuid(dish.sub_category_uuid);

        setSaved(false);

    }, [dish]);



    const buildUpdateBody = () => ({

        name: form.name.trim(),

        weight: form.weight,

        price: Number(form.price),

        ingredients: form.ingredients.trim(),

        sub_category_uuid: subCategoryUuid,

        active: form.active,

        frozen: form.frozen,

        spicy: form.spicy,

        corporate_type: form.corporate_type || null,

        wholesale_min_qty: form.corporate_type && form.wholesale_min_qty ? Number(form.wholesale_min_qty) : null,

        wholesale_price: form.corporate_type && form.wholesale_price ? Number(form.wholesale_price) : null,

    });



    const handleSubmit = async (e: FormEvent) => {

        e.preventDefault();

        try {

            await updateDish({

                uuid: dish.uuid,

                ...buildUpdateBody(),

                images,

            }).unwrap();

            setSaved(true);

            setTimeout(() => setSaved(false), 2000);

        } catch (err) {

            console.log(err);

        }

    };



    const handleDelete = async () => {

        if (!window.confirm(`Видалити страву «${form.name}»?`)) return;

        try {

            await deleteDish(dish.uuid).unwrap();

        } catch (err) {

            console.log(err);

        }

    };



    const subCategoryName = subCategories.find((s) => s.uuid === subCategoryUuid)?.name ?? "";

    return (

        <>

            <form className="user__menu-dish" onSubmit={handleSubmit}>

                <header className="user__menu-dish-head">
                    <span className="user__menu-dish-head-tag">{subCategoryName}</span>
                    <div className="user__menu-dish-head-row">
                        <h4 className="user__menu-dish-head-title">{form.name || "Без назви"}</h4>
                        <span className="user__menu-dish-price">{form.price || "0"} ₴</span>
                        <button
                            type="button"
                            className="user__menu-dish-delete"
                            onClick={handleDelete}
                            disabled={isDeleting}
                            aria-label="Видалити страву"
                        >
                            <Icon icon="mdi:trash-can-outline" width={18}/>
                        </button>
                    </div>
                </header>

                <div className="user__menu-dish-body">
                    <aside className="user__menu-dish-gallery">
                        <div className="user__menu-dish-images">
                            {images.length > 0 ? (
                                images.map((image, index) => (
                                    <img
                                        key={`${image.image_url}-${index}`}
                                        src={resolveImageSrc(image.image_url)}
                                        alt={image.title || form.name}
                                        className="user__menu-dish-image"
                                    />
                                ))
                            ) : (
                                <div className="user__menu-dish-image user__menu-dish-image--empty">
                                    <Icon icon="mdi:image-off-outline" width={28}/>
                                </div>
                            )}
                        </div>
                        <button
                            type="button"
                            className="user__menu-dish-gallery-btn"
                            onClick={() => setImagesModalOpen(true)}
                        >
                            <Icon icon="mdi:image-edit-outline" width={16}/>
                            Фото
                        </button>
                    </aside>

                    <div className="user__menu-dish-fields">
                        <DishFormFields
                            form={form}
                            setForm={setForm}
                            subCategories={subCategories}
                            subCategoryUuid={subCategoryUuid}
                            onSubCategoryChange={setSubCategoryUuid}
                        />
                    </div>
                </div>

                <footer className="user__menu-dish-foot">
                    <button
                        type="submit"
                        className={`user__menu-dish-save${saved ? " user__menu-dish-save--saved" : ""}`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Збереження..." : saved ? "Збережено ✓" : "Зберегти зміни"}
                    </button>
                </footer>

            </form>



            {imagesModalOpen && (

                <AdminDishImagesModal

                    dishUuid={dish.uuid}

                    dishName={form.name}

                    images={images}

                    buildUpdateBody={buildUpdateBody}

                    onClose={() => setImagesModalOpen(false)}

                    onSaved={setImages}

                />

            )}

        </>

    );

}



function AdminAddDishModal({

    subCategories,

    categoryTitle,

    onClose,

}: {

    subCategories: SubCategoryOption[],

    categoryTitle: string,

    onClose: () => void,

}) {

    const [addDish, { isLoading }] = useAddDishMutation();

    const [form, setForm] = useState<DishForm>({

        name: "",

        weight: "",

        price: "",

        ingredients: "",

        active: true,

        frozen: false,

        spicy: false,

        corporate_type: "",

        wholesale_min_qty: "",

        wholesale_price: "",

    });

    const [subCategoryUuid, setSubCategoryUuid] = useState(subCategories[0]?.uuid ?? "");



    useEffect(() => {

        if (!subCategoryUuid && subCategories[0]) {

            setSubCategoryUuid(subCategories[0].uuid);

        }

    }, [subCategories, subCategoryUuid]);



    const handleSubmit = async (e: FormEvent) => {

        e.preventDefault();

        if (!subCategoryUuid) return;

        try {

            await addDish({

                name: form.name.trim(),

                weight: form.weight,

                price: Number(form.price),

                ingredients: form.ingredients.trim(),

                sub_category_uuid: subCategoryUuid,

                active: form.active,

                frozen: form.frozen,

                spicy: form.spicy,

                corporate_type: form.corporate_type || null,

                wholesale_min_qty: form.corporate_type && form.wholesale_min_qty ? Number(form.wholesale_min_qty) : null,

                wholesale_price: form.corporate_type && form.wholesale_price ? Number(form.wholesale_price) : null,

                images: [],

            }).unwrap();

            onClose();

        } catch (err) {

            console.log(err);

        }

    };



    return (

        <div className="user__admin-modal-backdrop">

            <div

                className="user__admin-modal user__admin-modal--dish"

                onClick={(e) => e.stopPropagation()}

                role="dialog"

                aria-modal="true"

                aria-labelledby="addDishModalTitle"

            >

                <div className="user__admin-modal-header">

                    <div>

                        <h2 id="addDishModalTitle" className="user__admin-modal-title">Нова страва</h2>

                        <p className="user__admin-modal-subtitle">{categoryTitle}</p>

                    </div>

                    <button type="button" className="user__admin-modal-close" onClick={onClose} aria-label="Закрити">

                        <Icon icon="mdi:close" width={24}/>

                    </button>

                </div>

                {subCategories.length === 0 ? (

                    <div className="user__menu-modal-empty">

                        <p>Спочатку додайте підкатегорію</p>

                        <button type="button" className="user__menu-dish-cancel" onClick={onClose}>Закрити</button>

                    </div>

                ) : (

                    <form className="user__menu-modal-form" onSubmit={handleSubmit}>

                        <p className="user__menu-dish-new-hint">Фото можна додати після створення страви</p>

                        <div className="user__menu-dish-fields">
                            <DishFormFields
                                form={form}
                                setForm={setForm}
                                subCategories={subCategories}
                                subCategoryUuid={subCategoryUuid}
                                onSubCategoryChange={setSubCategoryUuid}
                            />
                        </div>

                        <div className="user__menu-modal-foot">

                            <button type="button" className="user__menu-dish-cancel" onClick={onClose}>

                                Скасувати

                            </button>

                            <button type="submit" className="user__menu-dish-save" disabled={isLoading}>

                                {isLoading ? "Додавання..." : "Додати страву"}

                            </button>

                        </div>

                    </form>

                )}

            </div>

        </div>

    );

}

function CategorySidebar({

    categories,

    selectedCategoryUuid,

    onSelect,

}: {

    categories: Categories[],

    selectedCategoryUuid: string | null,

    onSelect: (uuid: string) => void,

}) {

    return (

        <nav className="user__menu-sidebar-nav" aria-label="Категорії меню">

            {categories.map((category) => {

                const imageSrc = category.image_url.startsWith("http")

                    ? category.image_url

                    : getImage(category.image_url);

                const isActive = category.uuid === selectedCategoryUuid;



                return (

                    <button

                        key={category.uuid}

                        type="button"

                        className={`user__menu-sidebar-item${isActive ? " user__menu-sidebar-item--active" : ""}`}

                        onClick={() => onSelect(category.uuid)}

                        aria-current={isActive ? "true" : undefined}

                    >

                        <img src={imageSrc} alt="" className="user__menu-sidebar-thumb"/>

                        <span className="user__menu-sidebar-title">{category.title}</span>

                    </button>

                );

            })}

        </nav>

    );

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



function CategoryImageEditor({

    categoryUuid,

    title,

    imageUrl,

}: {

    categoryUuid: string,

    title: string,

    imageUrl: string,

}) {

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [uploadImage, { isLoading: isUploading }] = useUploadDishImageMutation();

    const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();

    const isLoading = isUploading || isUpdating;

    const imageSrc = imageUrl.startsWith("http") ? imageUrl : getImage(imageUrl);



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

            const uploaded = await uploadImage({ data, mimeType, title, folder: "menu" }).unwrap();

            await updateCategory({ uuid: categoryUuid, image_url: uploaded.image_url }).unwrap();

        } catch (err) {

            console.log(err);

            window.alert("Не вдалося завантажити фото");

        }

    };



    const openFilePicker = () => {

        if (!isLoading) fileInputRef.current?.click();

    };



    return (

        <div className="user__menu-category-cover">

            <input

                ref={fileInputRef}

                type="file"

                accept="image/jpeg,image/png,image/webp"

                hidden

                onChange={handleFileChange}

            />

            <button

                type="button"

                className="user__rest-image-picker user__rest-image-picker--card user__menu-category-cover-btn"

                onClick={openFilePicker}

                disabled={isLoading}

                aria-label={`Змінити фото категорії ${title}`}

            >

                <img src={imageSrc} alt="" className="user__rest-image-picker__img"/>

                <span className="user__rest-image-edit" aria-hidden="true">

                    <Icon icon="mdi:pencil" width={16}/>

                </span>

                {isLoading && (

                    <span className="user__rest-image-picker__loading">...</span>

                )}

            </button>

            <p className="user__menu-category-cover-hint">Натисніть, щоб змінити фото категорії</p>

        </div>

    );

}



export default function UserMenuManager() {

    const { data: categories = [], isLoading: categoriesLoading } = useCategoriesQuery();

    const [selectedCategoryUuid, setSelectedCategoryUuid] = useState<string | null>(null);

    const [showAddDish, setShowAddDish] = useState(false);

    const { data: category, isLoading: categoryLoading, isFetching } = useCategoryWithDishesQuery(

        selectedCategoryUuid ?? "",

        { skip: !selectedCategoryUuid },

    );



    const subCategories: SubCategory[] = category?.sub_categories ?? [];

    const subCategoryOptions: SubCategoryOption[] = subCategories.map((sub) => ({

        uuid: sub.uuid,

        name: sub.name,

    }));



    const dishes = subCategories.flatMap((sub) =>

        sub.dishes.map((dish) => ({ dish })),

    );

    const selectedCategoryMeta = categories.find((c) => c.uuid === selectedCategoryUuid);



    useEffect(() => {

        if (!selectedCategoryUuid && categories[0]) {

            setSelectedCategoryUuid(categories[0].uuid);

        }

    }, [categories, selectedCategoryUuid]);



    return (

        <section className="user__menu user__menu--standalone" id="menu">

            <div className="user__city-topbar">

                <h2 className="user__menu-title">

                    Меню

                    {category && (

                        <>

                            {" "}

                            <span className="user__city-topbar-city">{category.title}</span>

                        </>

                    )}

                </h2>

                {selectedCategoryUuid && category && (

                    <div className="user__city-detail-actions">

                        <button

                            type="button"

                            className="user__city-add-loc-btn"

                            onClick={() => setShowAddDish(true)}

                            disabled={subCategories.length === 0}

                        >

                            <Icon icon="mdi:plus" width={18}/>

                            Додати страву

                        </button>

                    </div>

                )}

            </div>

            <p className="user__menu-subtitle">

                {category

                    ? `Керуйте підкатегоріями та стравами в категорії «${category.title}»`

                    : "Оберіть категорію зліва, керуйте підкатегоріями та стравами"}

            </p>



            <div className="user__menu-layout">

                <aside className="user__menu-sidebar">

                    <p className="user__menu-sidebar-label">Категорії</p>

                    {categoriesLoading ? (

                        <p className="user__menu-empty user__menu-empty--sidebar">Завантаження...</p>

                    ) : (

                        <CategorySidebar

                            categories={categories}

                            selectedCategoryUuid={selectedCategoryUuid}

                            onSelect={setSelectedCategoryUuid}

                        />

                    )}

                </aside>



                <div className="user__menu-main">

                    {selectedCategoryUuid && (categoryLoading || isFetching) && (

                        <p className="user__menu-empty">Завантаження...</p>

                    )}



                    {!selectedCategoryUuid && !categoriesLoading && (

                        <p className="user__menu-empty">Оберіть категорію зліва</p>

                    )}



                    {selectedCategoryUuid && category && !categoryLoading && (

                        <>

                            {selectedCategoryMeta && (

                                <CategoryImageEditor

                                    categoryUuid={selectedCategoryUuid}

                                    title={category.title}

                                    imageUrl={selectedCategoryMeta.image_url}

                                />

                            )}



                            <AdminSubCategoryPanel

                                categoryUuid={selectedCategoryUuid}

                                subCategories={subCategories}

                            />



                            <div className="user__menu-dishes user__menu-dishes--grid">

                                {dishes.map(({ dish }) => (

                                    <AdminDishEditCard

                                        key={dish.uuid}

                                        dish={dish}

                                        subCategories={subCategoryOptions}

                                    />

                                ))}

                            </div>



                            {subCategories.length === 0 && (

                                <p className="user__menu-empty">Додайте підкатегорію, щоб створювати страви</p>

                            )}



                            {showAddDish && (

                                <AdminAddDishModal

                                    subCategories={subCategoryOptions}

                                    categoryTitle={category.title}

                                    onClose={() => setShowAddDish(false)}

                                />

                            )}

                        </>

                    )}

                </div>

            </div>

        </section>

    );

}

