import {useEffect, useRef} from "react"
import {createPortal} from "react-dom"
import {Icon} from "@iconify/react"
import {Link, useLocation} from "react-router-dom"
import {useSelector} from "react-redux"
import "./mobileMenuModal.css"

type NavItem = {to: string, icon: string, label: string}

type MobileMenuModalProps = {
    isOpen: boolean
    onClose: () => void
    navItems: NavItem[]
    onOpenCity: () => void
    onOpenCart: () => void
    onOpenFavorites: () => void
}

export default function MobileMenuModal({
    isOpen,
    onClose,
    navItems,
    onOpenCity,
    onOpenCart,
    onOpenFavorites,
}: MobileMenuModalProps) {
    const {pathname} = useLocation()
    const userCity = useSelector((state: {userCity: {name: string}}) => state.userCity)
    const cityLabel = userCity.name || "Обрати місто"
    const onCloseRef = useRef(onClose)
    onCloseRef.current = onClose

    useEffect(() => {
        onCloseRef.current()
    }, [pathname])

    useEffect(() => {
        if (!isOpen) return

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }

        document.body.style.overflow = "hidden"
        document.addEventListener("keydown", handleEscape)

        return () => {
            document.body.style.overflow = ""
            document.removeEventListener("keydown", handleEscape)
        }
    }, [isOpen, onClose])

    if (!isOpen) {
        return null
    }

    return createPortal(
        <div className="mobileMenuModal-backdrop" onClick={onClose}>
            <div
                className="mobileMenuModal"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="mobileMenuModalTitle"
            >
                <div className="mobileMenuModal__header">
                    <h2 id="mobileMenuModalTitle" className="mobileMenuModal__title">Меню</h2>
                    <button
                        type="button"
                        className="mobileMenuModal__close"
                        onClick={onClose}
                        aria-label="Закрити меню"
                    >
                        <Icon icon="ic:round-close" width={24} height={24}/>
                    </button>
                </div>

                <nav className="mobileMenuModal__list" aria-label="Навігація">
                    <button
                        type="button"
                        className="mobileMenuModal__link"
                        onClick={() => {
                            onOpenCity()
                            onClose()
                        }}
                    >
                        <Icon icon="icon-park-outline:city-gate" width={24} height={24} color="#B75F6D"/>
                        <span>Ваше місто: {cityLabel}</span>
                    </button>

                    <button
                        type="button"
                        className="mobileMenuModal__link"
                        onClick={() => {
                            onOpenFavorites()
                            onClose()
                        }}
                    >
                        <Icon icon="line-md:heart" width={24} height={24} color="#B75F6D"/>
                        <span>Улюблені</span>
                    </button>

                    <button
                        type="button"
                        className="mobileMenuModal__link"
                        onClick={() => {
                            onOpenCart()
                            onClose()
                        }}
                    >
                        <Icon icon="mdi:cart" width={24} height={24} color="#B75F6D"/>
                        <span>Оформлення замовлення</span>
                    </button>

                    <div className="mobileMenuModal__divider" role="presentation"/>

                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.to}
                            className="mobileMenuModal__link"
                            onClick={onClose}
                        >
                            <Icon icon={item.icon} width={24} height={24} color="#B75F6D"/>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
            </div>
        </div>,
        document.body
    )
}
