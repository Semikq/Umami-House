import {logOut} from "../../redux/slices/authSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {useLogoutMutation} from "../../redux/api/usersApi.ts";
import {Icon} from "@iconify/react";
import {Link, useNavigate} from "react-router-dom";
import "./user.css"

function CreateBlocUser({ user }) {
    const arr = [
        {title: "Прізвище", value: user.surname},
        {title: "Ім'я", value: user.name},
        {title: "Номер телефону", value: user.phone},
        {title: "E-mail", value: user.email},
        {title: "Кількість бонусів", value: user.bonuses},
    ]

    return(
        <div className="user__info-details">
            {arr.map(item =>
                <div className="user__info-details--bloc">
                    <h3 className="info__details-bloc--title">{item.title}</h3>
                    <p className="info__details-bloc--value">{item.value}</p>
                </div>
            )}
        </div>
    )
}

function RenderUserPage({ user }){
    const navigator = useNavigate()
    const dispatch = useDispatch()
    const [logoutApi] = useLogoutMutation()

    const handleLogout = async () => {
        try {
            await logoutApi({}).unwrap()
            dispatch(logOut())
            navigator("/")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <main>
            <div className="user__select">
                <div className="user__select-tab">
                    <div className="user__select-block">
                        <Icon icon="solar:user-linear" width={34}/>
                        <div className="select__block-user">
                            <h2 className="select__block-title">{user.name} {user.surname}</h2>
                            <p className="select__block-mail">{user.email}</p>
                        </div>
                    </div>
                    <div className="user__select-block">
                        <Icon icon="mdi:cart-outline" width={34}/>
                        <h2 className="select__block-title">Історія замовлень</h2>
                    </div>
                    <div className="user__select-block">
                        <Icon icon="mdi:heart-outline" width={34}/>
                        <h2 className="select__block-title">Улюблені страви</h2>
                    </div>
                </div>
                <div className="user__select-exit" onClick={() => handleLogout()}>
                    <Icon icon="mingcute:exit-fill" width={30}/>
                    <h2 className="select__exit-button">Вийти</h2>
                </div>
            </div>
            <div className="user__info">
                <h1 className="user__info-role">{user.role === "user" ? "Клієнт" : "Компанія"}</h1>
                <h2 className="user__info-contactDetails">Контактні дані</h2>
                <CreateBlocUser user={user}/>
                <button className="user__info-button--edit">Редагувати профіль</button>
            </div>
            <div className="user__pastOrders">
                <h1 className="user__pastOrders-title">Ваші минулі замовлення!</h1>
                <p className="user__pastOrders-text">Ви ще нічого не замовляли.<br/>Пропонуємо прямо зараз обрати смачні та якісні страви й насолодитися улюбленими смаками!</p>
                <Link to="/">
                    <button className="user__info-button--order">Замовити смачненького!</button>
                </Link>
            </div>
            <div className="user__favorites">
                <h1 className="user__favorites-title">Ваші минулі замовлення!</h1>
                <p className="user__favorites-text">Ви ще нічого не замовляли.<br/>Пропонуємо прямо зараз обрати смачні та якісні страви й насолодитися улюбленими смаками!</p>
                <Link to="/">
                    <button className="user__info-button--favorites">Знайти улюблену страву!</button>
                </Link>
            </div>
        </main>
    )
}

export default function CreateUserPage(){
    const user = useSelector(state => state.auth.user)

    if (!user) return <p>Loading...</p>

    return (
        <RenderUserPage user={user}/>
    )
}