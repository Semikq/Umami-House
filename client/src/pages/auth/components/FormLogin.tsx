import React, {useState} from "react";
import {useLoginMutation} from "../../../redux/api/usersApi.ts";
import {logIn} from "../../../redux/slices/authSlice.ts";
import {useDispatch} from "react-redux";
import {closeAuth} from "../../../redux/slices/uiSlice.ts";
import getAuthErrorMessage from "../../../utils/getAuthErrorMessage.ts";

export default function FormLogin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [formError, setFormError] = useState("")
    const [loginApi, {isLoading}] = useLoginMutation()
    const dispatch = useDispatch()

    const handleLogin = async (e) => {
        e.preventDefault()
        setFormError("")
        try {
            const result = await loginApi({ userInput: email.trim(), password }).unwrap();
            dispatch(logIn({ user: result.user, token: result.accessToken }))
            dispatch(closeAuth())
        } catch (err) {
            setFormError(getAuthErrorMessage(err, "Не вдалося увійти. Перевірте email і пароль."))
        }
    };

    return(
        <form className="form__body" onSubmit={handleLogin}>
            {formError && (
                <p className="form__error" role="alert">{formError}</p>
            )}
            <label htmlFor="email">
                <p>Email<span title="Обов'язкове поле">*</span></p>
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
                <input
                    id="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                        if (formError) setFormError("")
                    }}
                    type="password"
                    required
                    aria-invalid={Boolean(formError)}
                />
            </label>
            <button type="submit" className="form__submit" disabled={isLoading}>
                {isLoading ? "Вхід..." : "Увійти"}
            </button>
        </form>
    )
}
