import {Icon} from "@iconify/react";

interface InfoItemProps {
    title: string;
    icon: string;
}

const INFO_ITEMS: InfoItemProps[] = [
    {title: "Розумні ціни для гостей за найкращу якість", icon: "material-symbols:price-check-rounded"},
    {title: "Справжня азійська кухня — смачно, безпечно, автентично", icon: "hugeicons:noodles"},
    {title: "Оптові пропозиції для компаній", icon: "icon-park-outline:delivery"},
    {title: "Працюємо щодня з 10:00 до 21:00", icon: "fluent-emoji-high-contrast:two-oclock"},
    {title: "Швидка доставка та сезонні оновлення меню", icon: "material-symbols:delivery-truck-speed-outline-rounded"},
    {title: "Сертифіковане виробництво та високі стандарти якості", icon: "icon-park-outline:certificate"},
];

function InfoItem({title, icon}: InfoItemProps) {
    return (
        <div className="fieldInformation__item">
            <span className="fieldInformation__iconWrap" aria-hidden="true">
                <Icon className="fieldInformation__icon" icon={icon} width={26} height={26}/>
            </span>
            <p>{title}</p>
        </div>
    );
}

function scrollToMenu(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    const menu = document.getElementById("menu");
    if (!menu) return;

    const headerOffset = 96;
    const top = menu.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({top, behavior: "smooth"});
}

export default function CreateFieldInformation() {
    return (
        <div className="fieldInformation">
            {INFO_ITEMS.slice(0, 3).map((item) => (
                <InfoItem key={item.title} {...item}/>
            ))}

            <a
                href="#menu"
                className="link fieldInformation__scroll"
                aria-label="Перейти до меню"
                onClick={scrollToMenu}
            >
                <Icon icon="radix-icons:double-arrow-down" width={28} height={28}/>
            </a>

            {INFO_ITEMS.slice(3, 6).map((item) => (
                <InfoItem key={item.title} {...item}/>
            ))}
        </div>
    );
}
