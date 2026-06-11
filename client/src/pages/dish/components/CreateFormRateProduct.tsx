import {FormEvent, useState} from "react";
import {Icon} from "@iconify/react";
import {useDispatch, useSelector} from "react-redux";
import {showAuth} from "../../../redux/slices/uiSlice.ts";
import {useAddCommentMutation} from "../../../redux/api/dishesApi.ts";

type CreateFormRateProductProps = {
    dishUuid: string,
}

export default function CreateFormRateProduct({ dishUuid }: CreateFormRateProductProps) {
    const stars = Array(5).fill(0);
    const dispatch = useDispatch();
    const user = useSelector((state: { auth: { user: { uuid: string } | null } }) => state.auth.user);
    const [addComment, { isLoading }] = useAddCommentMutation();
    const [hoverRating, setHoverRating] = useState(0);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");

    const requireAuth = () => {
        if (!user?.uuid) {
            dispatch(showAuth());
            return false;
        }
        return true;
    };

    const handleRatingClick = (value: number) => {
        if (!requireAuth()) return;
        setRating(value);
        setError("");
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!requireAuth()) return;

        if (rating === 0) {
            setError("Оберіть оцінку від 1 до 5 зірок");
            return;
        }

        if (!comment.trim()) {
            setError("Напишіть коментар");
            return;
        }

        try {
            await addComment({
                dish_uuid: dishUuid,
                user_uuid: user.uuid,
                comment: comment.trim(),
                rating,
            }).unwrap();

            setComment("");
            setRating(0);
            setHoverRating(0);
            setError("");
        } catch (err) {
            console.error(err);
            setError("Не вдалося надіслати коментар. Спробуйте ще раз.");
        }
    };

    const displayRating = hoverRating || rating;

    return (
        <section className="comment__form-card">
            <div className="comment__form-header">
                <Icon icon="mdi:message-star-outline" width={28} height={28}/>
                <h2 className="comment__form-title">Залиши свою оцінку та коментар</h2>
            </div>

            <form className="comment__form" onSubmit={handleSubmit}>
                <div className="comment__form-rating-wrap">
                    <p className="comment__form-label">Ваша оцінка</p>
                    <div className="comment__form-rating">
                        {stars.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                className="comment__form-star-btn"
                                onClick={() => handleRatingClick(i + 1)}
                                onMouseEnter={() => user?.uuid && setHoverRating(i + 1)}
                                onMouseLeave={() => setHoverRating(0)}
                                aria-label={`Оцінка ${i + 1}`}
                            >
                                <Icon
                                    icon={i + 1 <= displayRating ? "bxs:star" : "bx:star"}
                                    width={32}
                                    height={32}
                                    color="#F1C232"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="comment__form-field">
                    <label className="comment__form-label" htmlFor="dishComment">Коментар</label>
                    <textarea
                        id="dishComment"
                        className="comment__form-textarea"
                        placeholder={user?.uuid ? "Поділіться враженнями про страву..." : "Увійдіть, щоб залишити коментар"}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        onFocus={() => { if (!user?.uuid) dispatch(showAuth()); }}
                        rows={3}
                        readOnly={!user?.uuid}
                    />
                </div>

                {error && <p className="comment__form-error">{error}</p>}

                <button
                    type="submit"
                    className="comment__form-submit"
                    disabled={isLoading}
                    onClick={(e) => {
                        if (!user?.uuid) {
                            e.preventDefault();
                            dispatch(showAuth());
                        }
                    }}
                >
                    <Icon icon="mdi:send" width={20} height={20}/>
                    {isLoading ? "Надсилання..." : "Надіслати відгук"}
                </button>
            </form>
        </section>
    );
}
