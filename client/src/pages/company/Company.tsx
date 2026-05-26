import "./company.css"
import * as url from "node:url";
import getImage from "../../utils/getImage.ts";

function RenderCompanyPage(){
    return(
        <main>
            <h1 className="company__title">Про нас</h1>
            <div className="company__aboutUs" style={{backgroundImage: `url(${getImage("/uploads/company/Umami-House_Restaurant.png")})`}}>
                <h2 className="aboutUs__title">Ласкаво просимо до Umami House!</h2>
                <div className="aboutUs__info">
                    <p className="aboutUs__info--text"></p>
                    <ul>
                        <li></li>
                        <li></li>
                    </ul>
                    <input type="button"/>
                </div>
                <div className="aboutUs__info">
                    <p></p>
                    <ul>
                        <li></li>
                        <li></li>
                    </ul>
                    <input type="button"/>
                </div>
                <p></p>
            </div>
            {/*<div>*/}
            {/*    <h1>Про компанію</h1>*/}
            {/*    <div>*/}
            {/*        <p></p>*/}
            {/*        <img src={} alt={}/>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <img src={} alt={}/>*/}
            {/*        <p></p>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <h1>Про наші пріоритети та стандарти</h1>*/}
            {/*    <div>*/}
            {/*        <div>*/}
            {/*            <h2></h2>*/}
            {/*            <div>*/}
            {/*                <p></p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <h2>Партнерство з нами</h2>*/}
            {/*    <div>*/}
            {/*        <img src={} alt={}/>*/}
            {/*        <div>*/}
            {/*            <h3></h3>*/}
            {/*            <div>*/}
            {/*                <div>*/}
            {/*                    <p></p>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </main>
    )
}

export default function CreateCompanyPage(){
    return(
        <RenderCompanyPage/>
    )
}