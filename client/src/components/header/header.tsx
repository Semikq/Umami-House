import "./header.css"
import {Icon} from '@iconify/react'
import {useRef, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import {showAuth, showCart} from "../../redux/slices/uiSlice.ts"
import LoyaltyBanner from "./LoyaltyBanner.tsx"
import CitySelect, {type CitySelectHandle} from "./CitySelect.tsx"
import MobileMenuModal from "./MobileMenuModal.tsx"
import {isCorporateClient} from "../../utils/corporateOffer.ts"

const PRIMARY_ICON_COLOR = "#333333"

function NavItem({to, icon, label}: {to: string, icon: string, label: string}) {
    return <Link to={to} className="position">
        <Icon className="icon" icon={icon} width={32} height={32} color={PRIMARY_ICON_COLOR}></Icon>
        <h1>{label}</h1>
    </Link>
}

function isMenuOrDishPage(pathname: string) {
    return pathname.startsWith("/category/") || pathname.startsWith("/dish/")
}

export function RenderHeader(){
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)
    const userCity = useSelector((state) => state.userCity)
    const navigator = useNavigate()
    const { pathname } = useLocation()
    const showLoyaltyBanner = isMenuOrDishPage(pathname) && !isCorporateClient(user)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const citySelectRef = useRef<CitySelectHandle>(null)

    const navItems: { to: string, icon: string, label: string}[] = [
        {to: "/company", icon: "lsicon:work-order-info-filled", label: "Компанія і франшиза"},
        {to: "/action", icon: "mingcute:sale-line", label: "Акції та бонуси"},
        {to: "/contact", icon: "material-symbols:delivery-truck-speed-outline-rounded", label: "Контакти та доставка"},
        {to: `/restaurants/city/${userCity.name}`, icon: "hugeicons:restaurant-01", label: "Наші ресторани"},
        {to: "/yourRoll", icon: "token:sushi", label: "Створи свій рол"}
    ]

    return (
        <div className={`bar${showLoyaltyBanner ? " bar--with-loyalty" : ""}`}>
            <div className="primaryAppBar">
                <div className="position city-block">
                    <span className="city-block__btn" aria-hidden="true">
                        <Icon className="city-block__glyph" icon="icon-park-outline:city-gate" width={20} height={20} color="#2D2D2D"/>
                    </span>
                    <Icon className="icon city-block__icon--desktop" icon="icon-park-outline:city-gate" width={32} height={32} color={PRIMARY_ICON_COLOR}/>
                    <CitySelect ref={citySelectRef}/>
                </div>
                {navItems.slice(0, 3).map((item) => <NavItem key={item.label} {...item}/>)}
                <Link to="/" className="primaryAppBar__logo">
                    <h2>
                        Umami <img src="/soup.png" alt="Soup logo"/> House
                    </h2>
                </Link>
                {navItems.slice(3, 5).map((item) => <NavItem key={item.label} {...item}/>)}
                <div className="position primaryAppBar__actions">
                    <Icon
                        className="icon icon_heart"
                        icon="line-md:heart"
                        width={32}
                        height={32}
                        color={PRIMARY_ICON_COLOR}
                        onClick={() => user ? navigator("/user#favorites") : dispatch(showAuth())}
                    />
                    <Icon className="icon_cart" onClick={() => dispatch(showCart())} icon="mdi:cart" width={32} height={32} color={PRIMARY_ICON_COLOR}></Icon>
                    {/* <select>
                        <option value="UA">UA</option>
                    </select> */}
                </div>
                <button
                    type="button"
                    className={`user${user ? " user--logged" : ""}`}
                    onClick={() => {user ? navigator("/user#profile") : dispatch(showAuth())}}
                    aria-label={user ? "Профіль" : "Увійти"}
                >
                    {user ? (
                        <>
                            <span className="user__avatar" aria-hidden="true">
                                {user.name?.trim().charAt(0).toUpperCase() || "U"}
                            </span>
                            <span className="user__name">{user.name}</span>
                        </>
                    ) : (
                        <>
                            <span className="user__avatar user__avatar--guest" aria-hidden="true">
                                <Icon icon="tdesign:user" width={18} height={18} color="#B75F6D"/>
                            </span>
                            <span className="user__name">Увійти</span>
                        </>
                    )}
                </button>
                <button
                    type="button"
                    className="headerBurger"
                    onClick={() => setMobileMenuOpen((open) => !open)}
                    aria-label={mobileMenuOpen ? "Закрити меню" : "Відкрити меню"}
                    aria-expanded={mobileMenuOpen}
                >
                    <Icon
                        icon={mobileMenuOpen ? "mdi:close" : "mdi:menu"}
                        width={22}
                        height={22}
                        color="#FFFFFF"
                    />
                </button>
            </div>
            {showLoyaltyBanner && <LoyaltyBanner/>}
            <MobileMenuModal
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                navItems={navItems}
                onOpenCity={() => citySelectRef.current?.open()}
                onOpenCart={() => dispatch(showCart())}
                onOpenFavorites={() => user ? navigator("/user#favorites") : dispatch(showAuth())}
            />
        </div>
    )
}

export default function CreateHeader(){
    const user = useSelector((state) => state.auth.user)
    const { pathname } = useLocation()
    const showLoyaltyBanner = isMenuOrDishPage(pathname) && !isCorporateClient(user)

    return (
        <header className={showLoyaltyBanner ? "header--with-loyalty" : ""}>
            <RenderHeader/>
        </header>
    )
}