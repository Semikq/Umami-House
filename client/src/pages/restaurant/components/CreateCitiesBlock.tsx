export default function CreateCitiesBlock({cities, index, setIndex}){
    return (
        cities.map((city, i) =>
            <div className={`header__cities--bloc ${index === i + 1 ? "active" : ""}`} onClick={() => setIndex(i + 1)} key={i}>
                <h2>{city.name}</h2>
            </div>
        )
    )
}