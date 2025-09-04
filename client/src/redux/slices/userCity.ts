import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserCity {
    id: number | null
    name: string
}

const initialState: UserCity = {
    id: null,
    name: "Усі міста"
}

export const userCity = createSlice({
    name: "userCity",
    initialState,
    reducers: {
        changeCity: (state, action: PayloadAction<UserCity>) => {
            state.id = action.payload.id
            state.name = action.payload.name
        }
    }
})

export const {changeCity} = userCity.actions
export default userCity.reducer