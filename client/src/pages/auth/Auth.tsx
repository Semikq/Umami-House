import React from "react";
import {Icon} from "@iconify/react";
import {useState} from "react";
import FormLogin from "./components/FormLogin.tsx";
import FormRegister from "./components/FormRegister.tsx"
import {useDispatch} from "react-redux";
import {closeAuth} from "../../redux/slices/uiSlice.ts";
import "./auth.css"

function RenderAuthForm(){
    const [isRegister, setIsRegister] = useState(false)
    const dispatch = useDispatch()

    return (
        <div className="auth-backdrop">
            <div className="form" onClick={(e) => e.stopPropagation()}>
                <button type="button" className="form__icon-close" onClick={() => dispatch(closeAuth())} aria-label="Закрити">
                    <Icon icon="mingcute:close-fill"/>
                </button>
                <div className="form__header">
                    <h1 className="header__title">Вас вітає Umami House!</h1>
                    <div className="header__exit">
                        <h2 className={!isRegister ? "active" : ""} onClick={() => setIsRegister(false)}>Вхід</h2>
                        <h2 className={isRegister ? "active" : ""} onClick={() => setIsRegister(true)}>Реєстрація</h2>
                    </div>
                </div>
                {isRegister ? <FormRegister/> : <FormLogin/>}
            </div>
        </div>
    )
}

export default function CreateAuthFrom(){
    return (
        <RenderAuthForm/>
    )
}