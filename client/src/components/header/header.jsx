import "./header.css"
import { Icon } from '@iconify/react'
import SupPhoto from '../../photo/Суп.png';
import { useState } from "react";
import { Link } from "react-router-dom";

function MenuBar() {
    const [isHidden, setIsHidden] = useState(false)

    return (
        <div className={`menuBar ${isHidden ? "hidden" : ""}`}>
            <div>
                <div className="position">
                    <Icon className="icon" icon="lsicon:work-order-info-filled" width={32} height={32} color="#333333"/>
                    <h1>Компанія і франшиза</h1>
                </div>
                <Link to="/dishes" className="position">
                    <Icon className="icon" icon="mingcute:sale-line" width={32} height={32} color="#333333"/>
                    <h1>Акції та бонуси</h1>
                </Link>
                <Link to="/contact" className="position">
                    <Icon className="icon" icon="material-symbols:delivery-truck-speed-outline-rounded" width={32} height={32} color="#333333"/>
                    <h1>Контакти та доставка</h1>
                </Link>
                <div className="position">
                    <Icon className="icon" icon="hugeicons:restaurant-01" width={32} height={32} color="#333333"/>
                    <h1>Наші ресторани</h1>
                </div>
                <div className="position">
                    <Icon className="icon" icon="token:sushi" width={32} height={32} color="#333333"/>
                    <h1>Створи свій рол</h1>
                </div>
            </div>
            <Icon icon={isHidden ? "solar:arrow-up-broken" : "solar:arrow-down-broken"} className="icon" onClick={() => setIsHidden(!isHidden)} width={32} height={32} color="#333333"></Icon>
        </div>
    )
}

export function RenderHeader(){
    return (
        <div className="bar">
            <div className="primaryAppBar">
                <div className="position">
                    <Icon className="icon" icon="icon-park-outline:city-gate" width={32} height={32} color="#333333"/>
                    <h1>Ваше місто</h1>
                    <select>
                        <option>Полтава</option>
                    </select>
                </div>
                <div className="position">
                    <Icon className="icon" icon="lsicon:work-order-info-filled" width={32} height={32} color="#333333"/>
                    <h1>Компанія і франшиза</h1>
                </div>
                <Link to="/dishes" className="position">
                    <Icon className="icon" icon="mingcute:sale-line" width={32} height={32} color="#333333"/>
                    <h1>Акції та бонуси</h1>
                </Link>
                <Link to="/contact" className="position">
                    <Icon className="icon" icon="material-symbols:delivery-truck-speed-outline-rounded" width={32} height={32} color="#333333"/>
                    <h1>Контакти та доставка</h1>
                </Link>
                <Link to="/">
                    <h2>
                        Umami 
                        <img src={SupPhoto} width={60} height={60} color="#333333"></img>
                        House
                    </h2>
                </Link>
                <div className="position">
                    <Icon className="icon" icon="hugeicons:restaurant-01" width={32} height={32} color="#333333"/>
                    <h1>Наші ресторани</h1>
                </div>
                <div className="position">
                    <Icon className="icon" icon="token:sushi" width={32} height={32} color="#333333"/>
                    <h1>Створи свій рол</h1>
                </div>
                <div className="position">
                    <Icon icon="line-md:heart" width={32} height={32} color="#333333"></Icon>
                    <Icon icon="mdi:cart" width={32} height={32} color="#333333"></Icon>
                    <select>
                        <option value="UA">UA</option>
                    </select>
                </div>
                <div className="user">
                    <p>Увійти</p>
                    <Icon icon="tdesign:user" width={22} height={26} color="#333333"></Icon>
                </div>
            </div>
            <MenuBar/>
        </div>
    )
}

export function CreateHeader(){
    return (
        <header>
            <RenderHeader></RenderHeader>
        </header>
    )
}