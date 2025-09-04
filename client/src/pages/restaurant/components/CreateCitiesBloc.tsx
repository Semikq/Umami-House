export default function CreateCitiesBloc({cities, index, handleCityClick}){
    return (
        cities.map((city) =>
            <div className={`header__cities--bloc ${index === city.id ? "active" : ""}`} onClick={() => handleCityClick(city.id)} key={city.id}>
                <h2>{city.name}</h2>
            </div>
        )
    )
}