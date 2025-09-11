// import {useDispatch} from "react-redux";
// import {useEffect} from "react";
// import {useLazyRefreshQuery} from "../redux/api/usersApi.ts";
// import {logIn} from "../redux/slices/authSlice.ts";
//
// export default function useCheckRefresh (){
//     const dispatch = useDispatch();
//     const [triggerRefresh] = useLazyRefreshQuery();
//
//     useEffect(() => {
//         const checkRefresh = async () => {
//             try {
//                 const result = await triggerRefresh({}).unwrap();
//                 dispatch(logIn({ user: result.user, token: result.accessToken }));
//             } catch (err) {
//                 console.log("Refresh token invalid or expired");
//             }
//         };
//         checkRefresh();
//     }, [dispatch, triggerRefresh]);
// }