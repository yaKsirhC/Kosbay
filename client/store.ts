import { configureStore } from "@reduxjs/toolkit";
import auth from './src/features/auth'
import secondary from './src/features/secondarySlice'
import chat from './src/features/chatSlice'
import buySell from './src/features/buySellSlice'
import user from './src/features/userSlice'
import modal from './src/features/modalSlice'

const store = configureStore({
    reducer:{
        auth,
        secondary,
        chat,
        buySell,
        user,
        modal
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>