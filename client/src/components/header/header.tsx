import "./header.css"
import {Icon} from '@iconify/react'
import {useState} from "react";
import {Link} from "react-router-dom";

const navItems: {to: string, icon: string, label: string}[] = [
    {to: "/company", icon: "lsicon:work-order-info-filled", label: "Компанія і франшиза"},
    {to: "/action", icon: "mingcute:sale-line", label: "Акції та бонуси"},
    {to: "/contact", icon: "material-symbols:delivery-truck-speed-outline-rounded", label: "Контакти та доставка"},
    {to: "/restaurants", icon: "hugeicons:restaurant-01", label: "Наші ресторани"},
    {to: "/yourRoll", icon: "token:sushi", label: "Створи свій рол"}
]

function NavItem({to, icon, label}: {to: string, icon: string, label: string}) {
    return <Link to={to} className="position">
        <Icon className="icon" icon={icon} width={32} height={32} color="#333333"></Icon>
        <h1>{label}</h1>
    </Link>
}

function MenuBar() {
    const [isHidden, setIsHidden] = useState(false)
    return (
        <div className={`menuBar ${isHidden ? "hidden" : ""}`}>
            <div>
                {navItems.map((item) => <NavItem key={item.label} {...item}/>)}
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
                {navItems.slice(0, 3).map((item) => <NavItem key={item.label} {...item}/>)}
                <Link to="/">
                    <h2>
                        Umami
                        <img src="/soup.png" alt="Soup logo" />
                        House
                    </h2>
                </Link>
                {navItems.slice(3, 5).map((item) => <NavItem key={item.label} {...item}/>)}
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

export default function CreateHeader(){
    return (
        <header>
            <RenderHeader/>
        </header>
    )
}