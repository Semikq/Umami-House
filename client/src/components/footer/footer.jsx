import { Icon } from "@iconify/react/dist/iconify.js"
import "./footer.css"
import { Link } from "react-router-dom"

function RenderFooter(){
    return(
        <div className="footerBar">
            <div className="info">
                <div className="information">
                    <div>
                        <h1>Чекаємо на вас</h1>
                        <p>Наші ресторани у місті Полтава</p>
                    </div>
                    <div>
                        <h2>Головний офіс:
                            <p>
                                м. Полтава, вул. Центральна 22, 36000
                                Телефон: +38 (096) 434-43-34 <br/>
                                Email: umamiHouse@gmail.com
                            </p>
                        </h2>
                    </div>
                    <div>
                        <h2>Регіональний офіс у Полтаві:
                        <p>
                            м. Полтава, вул. Центральна 23, 36001
                            Телефон: +38 (096) 545-45-54 <br/>
                            Email: umamiHouse.poltava@gmail.com
                        </p>
                        </h2>
                    </div>
                </div>
                <div className="links">
                    <div>
                        <Link to="/">Меню</Link>
                        <Link to="/">Франшиза</Link>
                        <Link to="/">Акції та <br/> бонуси</Link>
                    </div>
                    <div>
                        <Link to="/">Профіль</Link>
                        <Link to="/">Про нас</Link>
                        <Link to="/">Контакти та доставка</Link>
                    </div>
                </div>
            </div>
            <div className="contactInfo">
                <h1>Номер для ззамовлення:</h1>
                <p>38 (096) 323-32-23</p>
                <h1>Щодня з 10:00 - 21:00</h1>
                <h1>Ми у соцмережах:</h1>
                <div className="socialNetworks">
                    <Link to="https://www.instagram.com" target="blank"><Icon className="icon" icon="mdi:instagram" width={32} height={32} color="#F1C232"></Icon></Link>
                    <Link to="https://www.facebook.com" target="blank"><Icon className="icon" icon="mingcute:facebook-line" width={32} height={32} color="#F1C232"></Icon></Link>
                    <Link to="https://web.telegram.org" target="blank"><Icon className="icon" icon="ri:telegram-line" width={32} height={32} color="#F1C232"></Icon></Link>
                    <Link to="https://www.youtube.com" target="blank"><Icon className="icon" icon="mingcute:youtube-line" width={32} height={32} color="#F1C232"></Icon></Link>
                </div>
            </div>
        </div>
    )
}

export function CreateFooter(){
    return(
        <footer>
            <RenderFooter></RenderFooter>
        </footer>
    )
}