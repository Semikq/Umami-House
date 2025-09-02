import {createSlice} from "@reduxjs/toolkit";

interface UserCity {
    id: number
}

const initialState: UserCity = {
    id: 1
}

export const userCity = createSlice({
    name: "userCity",
    initialState,
    reducers: {
        changeCity: (state, action) => {
            state.id = action.payload
        }
    }
})

export const {changeCity} = userCity.actions
export default userCity.reducer