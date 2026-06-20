import React, {useState} from "react";
import CreateTelLabel from "./CreateTelLabel.tsx";
import {useDispatch, useSelector} from "react-redux";
import {logIn} from "../../../redux/slices/authSlice.ts";
import {useRegisterMutation} from "../../../redux/api/usersApi.ts";
import {closeAuth} from "../../../redux/slices/uiSlice.ts";
import {CORPORATE_TYPE_OPTIONS} from "../../../utils/corporateOffer.ts";
import getAuthErrorMessage from "../../../utils/getAuthErrorMessage.ts";

const DEFAULT_COMPANY_TYPE = CORPORATE_TYPE_OPTIONS[0].value;

export default function FormRegister(){
    const [role, setRole] = useState(true)
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [company_type, setCompany_type] = useState(DEFAULT_COMPANY_TYPE)
    const [company_name, setCompany_name] = useState("")
    const [formError, setFormError] = useState("")
    const [registerApi, {isLoading}] = useRegisterMutation()
    const dispatch = useDispatch()
    const userCity = useSelector((state: { userCity: { uuid: string | null } }) => state.userCity)

    const handleRegister = async (e) => {
        e.preventDefault();
        setFormError("")
        try {
            const isLegalEntity = !role;
            const result = await registerApi({
                email: email.trim(),
                password,
                name,
                surname,
                phone,
                company_type: isLegalEntity ? company_type : undefined,
                company_name: isLegalEntity ? company_name : undefined,
                city_uuid: userCity.uuid ?? undefined,
            }).unwrap()
            dispatch(logIn({ user: result.user, token: result.accessToken }))
            dispatch(closeAuth())
        } catch (err) {
            setFormError(getAuthErrorMessage(err, "Не вдалося зареєструватись. Спробуйте ще раз."))
        }
    }
    return (
        <form className="form__body" onSubmit={handleRegister}>
            {formError && (
                <p className="form__error" role="alert">{formError}</p>
            )}
            <div className="body__user-selection" role="radiogroup" aria-label="Тип користувача">
                <button
                    type="button"
                    className={`body__user-radio${role ? " active" : ""}`}
                    onClick={() => {
                        setRole(true);
                        setCompany_type(DEFAULT_COMPANY_TYPE);
                        setCompany_name("");
                    }}
                    role="radio"
                    aria-checked={role}
                >
                    Гість
                </button>
                <button
                    type="button"
                    className={`body__user-radio${!role ? " active" : ""}`}
                    onClick={() => {
                        setRole(false);
                        setCompany_type((prev) => prev || DEFAULT_COMPANY_TYPE);
                    }}
                    role="radio"
                    aria-checked={!role}
                >
                    Юридична особа
                </button>
            </div>
            <div className="body__name-surname">
                <label htmlFor="name">
                    <p>Ім'я<span title="Обов'язкове поле">*</span></p>
                    <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Yaroslav"/>
                </label>
                <label htmlFor="surname">
                    <p>Прізвище<span title="Обов'язкове поле">*</span></p>
                    <input id="surname" value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="Plaksiuk"/>
                </label>
            </div>
            <CreateTelLabel setUserInput={setPhone}/>
            <label htmlFor="email">
                <p>E-mail<span title="Обов'язкове поле">*</span></p>
                <input
                    id="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                        if (formError) setFormError("")
                    }}
                    placeholder="plaksiuk@gmail.com"
                    type="email"
                    required
                    aria-invalid={Boolean(formError)}
                />
            </label>
            <label htmlFor="password">
                <p>Пароль<span title="Обов'язкове поле">*</span></p>
                <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required/>
            </label>
            {!role && <>
                <label htmlFor="select">
                    <p>Тип закладу<span title="Обов'язкове поле">*</span></p>
                    <select
                        id="select"
                        value={company_type}
                        onChange={(e) => setCompany_type(e.target.value)}
                        required
                    >
                        {CORPORATE_TYPE_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </label>
                <label htmlFor="legalEntity">
                    <p>Назва юридичної особи<span title="Обов'язкове поле">*</span></p>
                    <input id="legalEntity" value={company_name} onChange={(e) => setCompany_name(e.target.value)} placeholder="Назва юридичної особи"/>
                </label>
            </>}
            <button type="submit" className="form__submit" disabled={isLoading}>
                {isLoading ? "Реєстрація..." : "Зареєструватись"}
            </button>
        </form>
    )
}
