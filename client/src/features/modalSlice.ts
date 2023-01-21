import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    showModal: false,
}

const modalSlice = createSlice({
    name: 'modalSlice',
    initialState,
    reducers: {
        setShowModal: (state, action) => {
            state.showModal = action.payload
        },
    }
})


export default modalSlice.reducer
export const {setShowModal} = modalSlice.actions