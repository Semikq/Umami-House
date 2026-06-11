import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useCitiesQuery} from "../redux/api/restaurantsApi.ts";
import {changeCity} from "../redux/slices/userCity.ts";
import axios from "axios";

export default function useDetectUserCity (){
    const [detectedCity, setDetectedCity] = useState("")
    const dispatch = useDispatch()
    const user = useSelector((state: { auth: { user: { city_uuid?: string | null, cities?: { uuid: string, name: string } | null } | null } }) => state.auth.user)
    const {data: cities, isLoading: citiesLoading} = useCitiesQuery()

    useEffect(() => {
        if (user?.city_uuid && user?.cities) {
            dispatch(changeCity({ uuid: user.city_uuid, name: user.cities.name }))
            return
        }

        axios.get("https://ipapi.co/json").then(res => setDetectedCity(res.data.city))
    }, [user?.city_uuid, user?.cities, dispatch]);

    useEffect(() => {
        if (user?.city_uuid) return
        if (!citiesLoading && detectedCity && cities?.length) {
            const currentCity = cities.find(item => item.name.toLowerCase() === detectedCity.toLowerCase())
            if (currentCity){
                dispatch(changeCity({ uuid: currentCity.uuid,  name: currentCity.name }))
            } else {
                dispatch(changeCity({ uuid: cities[0].uuid,  name: cities[0].name }))
            }
        }
    }, [cities, citiesLoading, detectedCity, user?.city_uuid, dispatch]);
}
