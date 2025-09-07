import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {useRefreshMutation} from "../redux/api/usersApi.ts";
import {logIn} from "../redux/slices/authSlice.ts";

export default function useCheckRefresh (){
    const dispatch = useDispatch();
    const [refresh] = useRefreshMutation();

    useEffect(() => {
        const checkRefresh = async () => {
            try {
                const result = await refresh({}).unwrap();
                dispatch(logIn({ user: result.user, token: result.accessToken }));
            } catch (err) {
                console.log("Refresh token invalid or expired");
            }
        };

        checkRefresh();
    }, [dispatch, refresh]);
}