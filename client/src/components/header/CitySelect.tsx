import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {createPortal} from "react-dom";
import {Icon} from "@iconify/react";
import {useDispatch, useSelector} from "react-redux";
import {useCitiesQuery} from "../../redux/api/restaurantsApi.ts";
import {useUpdateUserCityMutation} from "../../redux/api/usersApi.ts";
import {updateUserProfile} from "../../redux/slices/authSlice.ts";
import {changeCity} from "../../redux/slices/userCity.ts";
import {Cities} from "../../redux/types/restaurants.ts";
import "./citySelect.css";

export type CitySelectHandle = {
    open: () => void
}

const CitySelect = forwardRef<CitySelectHandle>(function CitySelect(_, ref) {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector((state: { auth: { user: { uuid?: string } | null } }) => state.auth.user);
    const userCity = useSelector((state: { userCity: { uuid: string | null, name: string } }) => state.userCity);
    const { data: cities = [] } = useCitiesQuery();
    const [updateUserCity, { isLoading }] = useUpdateUserCityMutation();

    useImperativeHandle(ref, () => ({
        open: () => setIsOpen(true),
    }), [])

    useEffect(() => {
        if (!isOpen) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };

        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.body.style.overflow = "";
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen]);

    const handleSelect = async (city: Cities) => {
        dispatch(changeCity({ uuid: city.uuid, name: city.name }));

        if (user?.uuid) {
            try {
                const result = await updateUserCity({ uuid: user.uuid, city_uuid: city.uuid }).unwrap();
                dispatch(updateUserProfile({
                    city_uuid: result.data.city_uuid,
                    cities: result.data.cities,
                }));
            } catch (err) {
                console.log(err);
            }
        }

        setIsOpen(false);
    };

    const modal = isOpen ? (
        <div className="cityModal-backdrop">
            <div className="cityModal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="cityModalTitle">
                <div className="cityModal__header">
                    <div className="cityModal__title-wrap">
                        <Icon icon="icon-park-outline:city-gate" width={28} height={28}/>
                        <h2 id="cityModalTitle" className="cityModal__title">Оберіть ваше місто</h2>
                    </div>
                    <button type="button" className="cityModal__close" onClick={() => setIsOpen(false)} aria-label="Закрити">
                        <Icon icon="ic:round-close"/>
                    </button>
                </div>

                <p className="cityModal__subtitle">Ми доставляємо страви лише у доступні міста</p>

                <div className="cityModal__grid">
                    {cities.map((city) => (
                        <button
                            key={city.uuid}
                            type="button"
                            className={`cityModal__item${userCity.uuid === city.uuid ? " cityModal__item--active" : ""}`}
                            onClick={() => handleSelect(city)}
                            disabled={isLoading}
                        >
                            {city.name}
                            {userCity.uuid === city.uuid && (
                                <Icon icon="mdi:check-circle" className="cityModal__item-check"/>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    ) : null;

    const displayName = userCity.uuid ? userCity.name : "Обрати місто";

    return (
        <>
            <div className="citySelect">
                <span className="citySelect__label">Ваше місто</span>
                <button
                    type="button"
                    className={`citySelect__trigger${userCity.uuid ? "" : " citySelect__trigger--empty"}`}
                    onClick={() => setIsOpen(true)}
                    aria-haspopup="dialog"
                >
                    <span className="citySelect__name">{displayName}</span>
                    {/* <Icon icon="solar:alt-arrow-down-linear" className="citySelect__arrow"/> */}
                </button>
            </div>
            {modal && createPortal(modal, document.body)}
        </>
    );
})

export default CitySelect
