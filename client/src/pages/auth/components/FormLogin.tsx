import React, {useState} from "react";
import {useLoginMutation} from "../../../redux/api/usersApi.ts";
import {logIn} from "../../../redux/slices/authSlice.ts";
import {useDispatch} from "react-redux";
import {closeAuth} from "../../../redux/slices/uiSlice.ts";

export default function FormLogin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginApi, {isLoading}] = useLoginMutation()
    const dispatch = useDispatch()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const result = await loginApi({ userInput: email.trim(), password }).unwrap();
            dispatch(logIn({ user: result.user, token: result.accessToken }))
            dispatch(closeAuth())
        } catch (err) {
            console.log('Помилка логіну', err);
        }
    };

    return(
        <form className="form__body" onSubmit={handleLogin}>
            <label htmlFor="email">
                <p>Email<span title="Обов'язкове поле">*</span></p>
                <input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="plaksiuk@gmail.com"
                    type="email"
                    required
                />
            </label>
            <label htmlFor="password">
                <p>Пароль<span title="Обов'язкове поле">*</span></p>
                <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required/>
            </label>
            <button type="submit" className="form__submit">Увійти</button>
        </form>
    )
}