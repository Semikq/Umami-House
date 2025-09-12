import {Icon} from "@iconify/react";
import React, {useState} from "react";
import CreateTelLabel from "./CreateTelLabel.tsx";
import {useDispatch, useSelector} from "react-redux";
import {logIn} from "../../../redux/slices/authSlice.ts";
import {useRegisterMutation} from "../../../redux/api/usersApi.ts";
import {showAuth} from "../../../redux/slices/uiSlice.ts";

export default function FormRegister(){
    const [role, setRole] = useState(true)
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [company_type, setCompany_type] = useState("")
    const [company_name, setCompany_name] = useState("")
    const [registerApi, {isLoading}] = useRegisterMutation()
    const dispatch = useDispatch()

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const result = await registerApi({ email, password, name, surname, phone, company_type, company_name }).unwrap()
            dispatch(logIn({ user: result.user, token: result.accessToken }))
            dispatch(showAuth())
        }catch(err){
            console.log(err)
        }
    }
    return (
        <form className="form__body" onSubmit={handleRegister}>
            <div className="body__user-selection">
                <div className={`body__user ${role ? "active" : ""}`} onClick={() => setRole(true)}>
                    <Icon icon="radix-icons:dot-filled"/>
                    <h3>Гість</h3>
                </div>
                <div className={`body__user ${!role ? "active" : ""}`} onClick={() => setRole(false)}>
                    <Icon icon="radix-icons:dot-filled"/>
                    <h3>Юридична особа</h3>
                </div>
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
                <input id="email" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="plaksiuk@gmail.com" type="email"/>
            </label>
            <label htmlFor="password">
                <p>Пароль<span title="Обов'язкове поле">*</span></p>
                <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required/>
            </label>
            {!role && <>
                <label htmlFor="select">
                    <p>Тип закладу<span title="Обов'язкове поле">*</span></p>
                    <select id="select" onChange={(e) => setCompany_type(e.target.value)}>
                        <option value="restaurant">Ресторан</option>
                        <option value="cafe">Кафе</option>
                        <option value="hotel">Готель</option>
                        <option value="coffee">Кав'ярня</option>
                        <option value="other">Інше...</option>
                    </select>
                </label>
                <label htmlFor="legalEntity">
                    <p>Назва юридичної особи<span title="Обов'язкове поле">*</span></p>
                    <input id="legalEntity" value={company_name} onChange={(e) => setCompany_name(e.target.value)} placeholder="Назва юридичної особи"/>
                </label>
            </>}
            <button>Увійти</button>
        </form>
    )
}