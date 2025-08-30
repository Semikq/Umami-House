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
        changeShow: (state) => {
            state.showAuth = !state.showAuth
        }
    }
})

export const {changeShow} = uiSlice.actions
export default uiSlice.reducer