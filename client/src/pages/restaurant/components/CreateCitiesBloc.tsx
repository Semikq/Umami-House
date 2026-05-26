export default function CreateCitiesBloc({cities, index, handleCityClick}){
    return (
        cities.map((city) =>
            <div className={`header__cities--bloc ${index === city.uuid ? "active" : ""}`} onClick={() => handleCityClick(city.uuid)} key={city.uuid}>
                <h2>{city.name}</h2>
            </div>
        )
    )
}