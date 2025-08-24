import {Icon} from "@iconify/react";

export default function CreateCompanyDetails(){
    const companyDetails = [
        {icon: "icon-park-outline:delivery", text: "Самовивіз -5%"},
        {icon: "fluent:phone-vibrate-20-regular", text: `(096) 323-32-23 \n (099) 343-23-43`},
        {icon: "streamline-ultimate:shop-like", text: "Щодня 10:00 - 21:00"},
    ]

    return (
        <div className="contact__company-details">
            <h2>Доставка</h2>
            <div className="contact__company-section">
                {companyDetails.map((detail) =>
                    <div className="detail">
                        <Icon icon={detail.icon} width={35} color="#333333"/>
                        <p>{detail.text}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
