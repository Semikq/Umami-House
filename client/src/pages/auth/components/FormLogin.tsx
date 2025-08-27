import React, {useState} from "react";
import {login} from "../../../api/user.tsx";
import CreateTelLabel from "./CreateTelLabel.tsx"

export default function FormLogin() {
    const [userInput, setUserInput] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const res = await login({userInput, password})
            console.log(res)
        }catch (err){
            console.log(err)
        }
    }

    return(
        <form className="form__body" onSubmit={handleSubmit}>
            <CreateTelLabel setUserInput={setUserInput}/>
            <label htmlFor="password">
                <p>Пароль<span title="Обов'язкове поле">*</span></p>
                <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required/>
            </label>
            <button>Увійти</button>
        </form>
    )
}