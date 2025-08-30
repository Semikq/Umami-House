import {Icon} from "@iconify/react";

interface NewItemsProps {
    title: string;
    icon: string;
}

function NewItems ({title, icon}: NewItemsProps) {
    return <div title={title}>
        <Icon className="icon" icon={icon} width={55} height={50} color="#333333"></Icon>
        <p>{title}</p>
    </div>
}

export default function CreateFieldInformation(){
    const newItem: NewItemsProps[] = [
        {title: "Розумні ціни для гостей за найкращу якість", icon: "material-symbols:price-check-rounded"},
        {title: "Справжня азійська кухня - смачно, безпечно, автентично", icon: "hugeicons:noodles"},
        {title: "Оптові пропозиції для компаній", icon: "icon-park-outline:delivery"},
        {title: "Працюємо щодня з 10:00 до 21:00", icon: "fluent-emoji-high-contrast:two-oclock"},
        {title: "Швидка доставка та сезонні оновлення меню", icon: "material-symbols:delivery-truck-speed-outline-rounded"},
        {title: "Сертифіковане виробництво та високі стандарти якості", icon: "icon-park-outline:certificate"},
    ]

    return (
        <div className="fieldInformation">
            {newItem.slice(0, 3).map((item, i) => <NewItems key={i} {...item}/>)}
            <a href="#menu" className="link">
                <Icon className="icon" icon="radix-icons:double-arrow-down" width={60} height={60} color="#333333" />
            </a>
            {newItem.slice(3, 6).map((item, i) => <NewItems key={i} {...item}/>)}
        </div>
    )
}