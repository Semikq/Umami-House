import {logOut} from "../../redux/slices/authSlice.ts";
import {useDispatch} from "react-redux";
import {useLogoutMutation} from "../../redux/api/usersApi.ts";
import "./user.css"

function RenderUserPage(){
    const dispatch = useDispatch()
    const [logoutApi] = useLogoutMutation()

    const handleLogout = async () => {
        try {
            await logoutApi({}).unwrap()
            dispatch(logOut())
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <main>
            <h1 onClick={() => handleLogout()}>fsdf</h1>
        </main>
    )
}

export default function CreateUserPage(){
    return (
        <RenderUserPage/>
    )
}