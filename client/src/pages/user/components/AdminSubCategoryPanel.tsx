import {FormEvent, useState} from "react";
import {Icon} from "@iconify/react";
import {
    useAddSubCategoryMutation,
    useDeleteSubCategoryMutation,
    useUpdateSubCategoryMutation,
} from "../../../redux/api/dishesApi.ts";
import {SubCategory} from "../../../redux/types/dishes.ts";

type AdminSubCategoryPanelProps = {
    categoryUuid: string,
    subCategories: SubCategory[],
}

export default function AdminSubCategoryPanel({
    categoryUuid,
    subCategories,
}: AdminSubCategoryPanelProps) {
    const [addSubCategory, { isLoading: isAdding }] = useAddSubCategoryMutation();
    const [updateSubCategory, { isLoading: isUpdating }] = useUpdateSubCategoryMutation();
    const [deleteSubCategory, { isLoading: isDeleting }] = useDeleteSubCategoryMutation();
    const [newName, setNewName] = useState("");
    const [editingUuid, setEditingUuid] = useState<string | null>(null);
    const [editName, setEditName] = useState("");

    const handleAdd = async (e: FormEvent) => {
        e.preventDefault();
        if (!newName.trim()) return;
        try {
            await addSubCategory({ name: newName.trim(), category_uuid: categoryUuid }).unwrap();
            setNewName("");
        } catch (err) {
            console.log(err);
        }
    };

    const startEdit = (sub: SubCategory) => {
        setEditingUuid(sub.uuid);
        setEditName(sub.name);
    };

    const cancelEdit = () => {
        setEditingUuid(null);
        setEditName("");
    };

    const handleSaveEdit = async (uuid: string) => {
        if (!editName.trim()) return;
        try {
            await updateSubCategory({ uuid, name: editName.trim() }).unwrap();
            cancelEdit();
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (sub: SubCategory) => {
        const dishesCount = sub.dishes?.length ?? 0;
        const message = dishesCount > 0
            ? `Видалити підкатегорію «${sub.name}» та ${dishesCount} страв(и)?`
            : `Видалити підкатегорію «${sub.name}»?`;
        if (!window.confirm(message)) return;
        try {
            await deleteSubCategory(sub.uuid).unwrap();
            if (editingUuid === sub.uuid) cancelEdit();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <section className="user__menu-subcats">
            <h4 className="user__menu-subcats-title">Підкатегорії</h4>
            <div className="user__menu-subcats-list">
                {subCategories.map((sub) => (
                    <article key={sub.uuid} className="user__menu-subcat">
                        {editingUuid === sub.uuid ? (
                            <div className="user__menu-subcat-edit">
                                <input
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    autoFocus
                                />
                                <button
                                    type="button"
                                    className="user__menu-subcat-btn user__menu-subcat-btn--save"
                                    onClick={() => handleSaveEdit(sub.uuid)}
                                    disabled={isUpdating}
                                >
                                    <Icon icon="mdi:check" width={18}/>
                                </button>
                                <button
                                    type="button"
                                    className="user__menu-subcat-btn"
                                    onClick={cancelEdit}
                                >
                                    <Icon icon="mdi:close" width={18}/>
                                </button>
                            </div>
                        ) : (
                            <>
                                <span className="user__menu-subcat-name">{sub.name}</span>
                                <span className="user__menu-subcat-count">{sub.dishes.length} страв</span>
                                <button
                                    type="button"
                                    className="user__menu-subcat-btn"
                                    onClick={() => startEdit(sub)}
                                    aria-label="Редагувати підкатегорію"
                                >
                                    <Icon icon="mdi:pencil-outline" width={18}/>
                                </button>
                                <button
                                    type="button"
                                    className="user__menu-subcat-btn user__menu-subcat-btn--delete"
                                    onClick={() => handleDelete(sub)}
                                    disabled={isDeleting}
                                    aria-label="Видалити підкатегорію"
                                >
                                    <Icon icon="mdi:trash-can-outline" width={18}/>
                                </button>
                            </>
                        )}
                    </article>
                ))}
            </div>
            <form className="user__menu-subcats-add" onSubmit={handleAdd}>
                <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Нова підкатегорія"
                />
                <button type="submit" className="user__menu-subcats-add-btn" disabled={isAdding}>
                    <Icon icon="mdi:plus" width={18}/>
                    Додати
                </button>
            </form>
        </section>
    );
}
