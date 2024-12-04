import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Helper/Helper";

const initialState = {
    loading: false,
    upload_status: "idle",
    error: null,
    coinApp: [],
    cart: [], 
};


export const coinlist = createAsyncThunk("list", async () => {
    let res = await axiosInstance.get("/assets");
    return res?.data; 
});


const coinSlice = createSlice({
    name: "coinApp",
    initialState,
    reducers: {
        resetcoins: (state) => {
            state.coinApp = [];
            state.loading = false;
            state.error = null;
            state.upload_status = "idle";
        },
        addtocart: (state, action) => {
            const existingCoin = state.cart.find(coin => coin.id === action.payload.id);
            if (existingCoin) {
               existingCoin.quantity += 1;
            } else {
             state.cart.push({ ...action.payload, quantity: 1 });
            }
        },
        removecart: (state, action) => {
            state.cart = state.cart.filter(coin => coin.id !== action.payload.id);
        },
        updatecartitems: (state, action) => {
            const { id, quantity } = action.payload;
            const existingCoin = state.cart.find(coin => coin.id === id);
            if (existingCoin) {
                existingCoin.quantity = quantity; 
            }
        },
        clearfromcart: (state) => {
            state.cart = []; 
        },
        updatecoins: (state, action) => {
            const index = state.coinApp.findIndex(coin => coin.id === action.payload.id);
            if (index !== -1) {
                state.coinApp[index] = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(coinlist.pending, (state) => {
                state.loading = true;
                state.upload_status = "fetching coins";
                state.error = null;
            })
            .addCase(coinlist.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.upload_status = "data fetched successfully";
                state.coinApp = payload?.data;
                state.error = null;
            })
            .addCase(coinlist.rejected, (state, action) => {
                state.loading = false;
                state.upload_status = "failed to fetch data";
                state.error = action.error.message || "failed to fetch data";
            });
    },
});

export const { resetcoins, addtocart, removecart, updatecartitems, clearfromcart,updatecoins } = coinSlice.actions; 
export default coinSlice.reducer;
