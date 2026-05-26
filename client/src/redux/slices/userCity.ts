import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserCity {
    uuid: string | null
    name: string
}

const initialState: UserCity = {
    uuid: null,
    name: "Усі міста"
}

export const userCity = createSlice({
    name: "userCity",
    initialState,
    reducers: {
        changeCity: (state, action: PayloadAction<UserCity>) => {
            state.uuid = action.payload.uuid
            state.name = action.payload.name
        }
    }
})

export const {changeCity} = userCity.actions
export default userCity.reducer
