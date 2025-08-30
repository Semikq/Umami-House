import {useState} from "react";
import {Icon} from "@iconify/react";

export default function CreateOurPartners({partners}) {
    const [startIndex, setStartIndex] = useState(0);
    const visibleCount = 5;

    const nextSlide = () => {
        setStartIndex((prevIndex) => (prevIndex + 1) % partners.length);
    };

    const prevSlide = () => {
        setStartIndex((prevIndex) => (prevIndex - 1 + partners.length) % partners.length);
    };

    const getVisiblePartners = () => {
        const extended = [...partners, ...partners];
        return extended.slice(startIndex, startIndex + visibleCount);
    };

    return (
        <div className="partners">
            <div className="slider-header">
                <Icon className="icon" onClick={prevSlide} icon="solar:round-arrow-left-linear" color="#333333" />
                <h1>Наші партнери</h1>
                <Icon className="icon" onClick={nextSlide} icon="solar:round-arrow-right-linear" color="#333333" />
            </div>

            <div className="slider-track">
                {getVisiblePartners().map((partner, index) => (
                    <img key={index} src={`${partner.logo_img}`} alt={partner.name} />
                ))}
            </div>
        </div>
    );
}