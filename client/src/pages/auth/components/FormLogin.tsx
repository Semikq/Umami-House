import React, {useState} from "react";
import {useLoginMutation} from "../../../redux/api.tsx";
import {logIn} from "../../../redux/reducer/authSlice.tsx";
import CreateTelLabel from "./CreateTelLabel.tsx"
import {useDispatch} from "react-redux";
import {jwtDecode} from "jwt-decode";

export default function FormLogin() {
    const [userInput, setUserInput] = useState()
    const [password, setPassword] = useState()
    const [loginApi, {isLoading}] = useLoginMutation()
    const dispatch = useDispatch()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const token = await loginApi({ userInput, password }).unwrap();
            dispatch(logIn({user: jwtDecode(token), token: token}))

        } catch (err) {
            console.log('Помилка логіну', err);
        }
    };


    return(
        <form className="form__body" onSubmit={handleLogin}>
            <CreateTelLabel setUserInput={setUserInput}/>
            <label htmlFor="password">
                <p>Пароль<span title="Обов'язкове поле">*</span></p>
                <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required/>
            </label>
            <button>Увійти</button>
        </form>
    )
}