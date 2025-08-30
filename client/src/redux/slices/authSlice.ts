import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";

interface UserData {
    id: number,
    email: string,
    name: string,
    surname: string,
    phone: string,
    role: string,
    created_at: string
}

interface AuthState {
    user: UserData | null,
    token: string | null
}

interface LoginPayload {
    user: UserData,
    token: string
}

let token = localStorage.getItem("token")
let userFromToken = {
    id: 0,
    email: "",
    name: "",
    surname: "",
    phone: "",
    role: "",
    created_at: ""
};

if (token) {
    try {
        userFromToken = jwtDecode(token)
    } catch {
        localStorage.removeItem("token")
        token = "";
    }
}

const initialState: AuthState = {
    user: userFromToken,
    token: localStorage.getItem("token") || ""
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logIn: (state, action: PayloadAction<LoginPayload>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
        },
        logOut: (state) => {
            localStorage.removeItem("token");
            return initialState
        }
    }
})

export const { logIn, logOut } = authSlice.actions
export default authSlice.reducer