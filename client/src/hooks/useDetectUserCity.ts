import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {useCitiesQuery} from "../redux/api/restaurantsApi.ts";
import {changeCity} from "../redux/slices/userCity.ts";
import axios from "axios";

export default function useDetectUserCity (){
    const [userCity, setUserCity] = useState("")
    const dispatch = useDispatch()
    const {data: cities, isLoading: citiesLoading} = useCitiesQuery()

    useEffect(() => {
        axios.get("https://ipapi.co/json").then(res => setUserCity(res.data.city))
    }, []);

    useEffect(() => {
        if (!citiesLoading && userCity && cities){
            const currentCity = cities.find(item => item.name.toLowerCase() === userCity.toLowerCase())
            if (currentCity){
                dispatch(changeCity({ id: currentCity.id,  name: currentCity.name }))
            }else {
                dispatch(changeCity({ id: cities[0].id,  name: cities[0].name }))
            }
        }
    }, [cities, citiesLoading, userCity]);
}