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
    accessToken: string
}

const initialState: AuthState = {
    user: null,
    token: ""
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logIn: (state, action: PayloadAction<LoginPayload>) => {
            state.user = action.payload.user;
            state.token = action.payload.accessToken;
        },
        logOut: (state) => {
            state.user = null;
            state.token = "";
        }
    }
})

export const { logIn, logOut } = authSlice.actions
export default authSlice.reducer