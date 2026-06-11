import { Icon } from "@iconify/react/dist/iconify.js"
import "./footer.css"
import { Link, useNavigate } from "react-router-dom"

function FooterNavLink({ to, children }) {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate(to);
        window.setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 80);
    };

    return (
        <Link to={to} onClick={handleClick}>
            {children}
        </Link>
    );
}

function RenderFooter(){
    return(
        <div className="footerBar">
            <div className="info">
                <div className="information">
                    <div className="information__intro">
                        <h1>Чекаємо на вас</h1>
                        <p>Наші ресторани у місті Полтава</p>
                    </div>
                    <div className="information__office">
                        <h2>Головний офіс:</h2>
                        <p>
                            м. Полтава, вул. Центральна 22, 36000<br/>
                            Телефон: +38 (096) 434-43-34<br/>
                            Email: umamiHouse@gmail.com
                        </p>
                    </div>
                    <div className="information__office">
                        <h2>Регіональний офіс у Полтаві:</h2>
                        <p>
                            м. Полтава, вул. Центральна 23, 36001<br/>
                            Телефон: +38 (096) 545-45-54<br/>
                            Email: umamiHouse.poltava@gmail.com
                        </p>
                    </div>
                </div>
                <div className="links">
                    <div>
                        <FooterNavLink to="/">Меню</FooterNavLink>
                        <FooterNavLink to="/company#franchise">Франшиза</FooterNavLink>
                        <FooterNavLink to="/action">Акції та <br/> бонуси</FooterNavLink>
                    </div>
                    <div>
                        <FooterNavLink to="/user#profile">Профіль</FooterNavLink>
                        <FooterNavLink to="/company">Про нас</FooterNavLink>
                        <FooterNavLink to="/contact">Контакти та доставка</FooterNavLink>
                    </div>
                </div>
            </div>
            <div className="contactInfo">
                <h2>Номер для замовлення:</h2>
                <p className="contactInfo__phone">38 (096) 323-32-23</p>
                <p className="contactInfo__hours">Щодня з 10:00 - 21:00</p>
                <h2>Ми у соцмережах:</h2>
                <div className="socialNetworks">
                    <Link to="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                        <Icon className="icon" icon="mdi:instagram" width={32} height={32} color="#F1C232"/>
                    </Link>
                    <Link to="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                        <Icon className="icon" icon="mingcute:facebook-line" width={32} height={32} color="#F1C232"/>
                    </Link>
                    <Link to="https://web.telegram.org" target="_blank" rel="noreferrer" aria-label="Telegram">
                        <Icon className="icon" icon="ri:telegram-line" width={32} height={32} color="#F1C232"/>
                    </Link>
                    <Link to="https://www.youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                        <Icon className="icon" icon="mingcute:youtube-line" width={32} height={32} color="#F1C232"/>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default function CreateFooter(){
    return(
        <footer>
            <RenderFooter/>
        </footer>
    )
}
