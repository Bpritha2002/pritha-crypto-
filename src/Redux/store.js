import { configureStore } from "@reduxjs/toolkit";
import coinSlice from "./CoinSlice";

export const  store = configureStore({
    reducer:{
        Coin:coinSlice
    }
})