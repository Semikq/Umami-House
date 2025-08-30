import React from "react";
import {Icon} from "@iconify/react";
import {useState} from "react";
import FormLogin from "./components/FormLogin.tsx";
import FormRegister from "./components/FormRegister.tsx"
import {useDispatch} from "react-redux";
import {changeShow} from "../../redux/slices/uiSlice.ts";
import "./auth.css"

function RenderAuthForm(){
    const [isRegister, setIsRegister] = useState(false)
    const dispatch = useDispatch()

    return (
        <div className="auth-backdrop" onClick={() => dispatch(changeShow())}>
            <div className="form" onClick={(e) => e.stopPropagation()}>
                <Icon className="form__icon-close" icon="mingcute:close-fill" onClick={() => dispatch(changeShow())}/>
                <div className="form__header">
                    <h1 className="header__title">Вас вітає Umami House!</h1>
                    <div className="header__exit">
                        <h2 className={!isRegister ? "active" : ""} onClick={() => setIsRegister(false)}>Вхід</h2>
                        <h2 className={isRegister ? "active" : ""} onClick={() => setIsRegister(true)}>Реєстрація</h2>
                    </div>
                </div>
                {isRegister ? <FormRegister/> : <FormLogin/>}
                <p className="form__if">або</p>
                <div className="form__login-selection">
                    <button>
                        <Icon icon="logos:facebook"/>
                        Facebook
                    </button>
                    <button>
                        <Icon icon="logos:google-icon"/>
                        Google
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function CreateAuthFrom(){
    return (
        <RenderAuthForm/>
    )
}