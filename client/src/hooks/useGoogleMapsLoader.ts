import {useLoadScript} from "@react-google-maps/api";

const GOOGLE_MAPS_SCRIPT_ID = "umami-google-maps";

export default function useGoogleMapsLoader() {
    return useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? "",
        id: GOOGLE_MAPS_SCRIPT_ID,
    });
}

export const UKRAINE_MAP_CENTER = {lat: 48.68960588712109, lng: 31.638236495038726};
export const UKRAINE_MAP_ZOOM = 6;
