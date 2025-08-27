import {createSlice} from "@reduxjs/toolkit"

interface UIState {
    showAuth: boolean
}

const initialState: UIState = {
    showAuth: false
}

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        openAuth: (state) => {
            state.showAuth = !state.showAuth
        }
    }
})

export const {openAuth} = uiSlice.actions
export default uiSlice.reducer