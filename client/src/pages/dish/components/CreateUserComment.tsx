import {Icon} from "@iconify/react";
import {useSelector} from "react-redux";
import {useDeleteCommentAdminMutation} from "../../../redux/api/dishesApi.ts";

function formatCommentDate(dateStr: string) {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

type CreateUserCommentProps = {
    infoComment: {
        uuid: string,
        rating: number,
        comment?: string | null,
        created_at?: string,
        users?: { name?: string } | null,
    },
    dishUuid: string,
};

export default function CreateUserComment({ infoComment, dishUuid }: CreateUserCommentProps) {
    const stars = Array(5).fill(0);
    const userName = infoComment.users?.name ?? "Гість";
    const initial = userName.trim().charAt(0).toUpperCase() || "Г";
    const isAdmin = useSelector((state: { auth: { user: { role?: string } | null } }) => state.auth.user?.role === "admin");
    const [deleteComment, { isLoading }] = useDeleteCommentAdminMutation();

    const handleDelete = async () => {
        if (!window.confirm("Видалити цей відгук?")) return;

        try {
            await deleteComment({ commentUuid: infoComment.uuid, dishUuid }).unwrap();
        } catch (err) {
            console.error(err);
            window.alert("Не вдалося видалити відгук. Спробуйте ще раз.");
        }
    };

    return (
        <article className="comment__item">
            <div className="comment__item-header">
                <span className="comment__item-avatar" aria-hidden="true">{initial}</span>
                <div className="comment__item-meta">
                    <p className="comment__item-name">{userName}</p>
                    {infoComment.created_at && (
                        <p className="comment__item-date">{formatCommentDate(infoComment.created_at)}</p>
                    )}
                </div>
                {isAdmin && (
                    <button
                        type="button"
                        className="comment__item-delete"
                        onClick={handleDelete}
                        disabled={isLoading}
                        aria-label="Видалити відгук"
                    >
                        <Icon icon="mdi:trash-can-outline" width={20}/>
                    </button>
                )}
            </div>

            <div className="comment__item-rating" aria-label={`Оцінка ${infoComment.rating} з 5`}>
                {stars.map((_, i) => (
                    <Icon
                        key={i}
                        icon={i < infoComment.rating ? "bxs:star" : "bx:star"}
                        className="comment__item-star"
                        color="#F1C232"
                    />
                ))}
            </div>

            {infoComment.comment && (
                <p className="comment__item-text">{infoComment.comment}</p>
            )}
        </article>
    );
}
