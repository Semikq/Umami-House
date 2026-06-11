import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserData {
    uuid: string,
    email: string,
    name: string,
    surname: string,
    phone: string,
    role: string,
    bonuses?: number,
    company_type?: string | null,
    company_name?: string | null,
    city_uuid?: string | null,
    cities?: { uuid: string, name: string } | null,
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
            state.token = action.payload.token;
        },
        logOut: (state) => {
            state.user = null;
            state.token = "";
        },
        updateUserProfile: (state, action: PayloadAction<Partial<UserData>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        }
    }
})

export const { logIn, logOut, updateUserProfile } = authSlice.actions
export default authSlice.reducer
