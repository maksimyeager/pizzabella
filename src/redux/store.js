import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import cartReducer from "./slices/cartSlice";
import productsReducer from "./slices/productsSlice";

export const store = configureStore({
    reducer: {
        filterReducer,
        cartReducer,
        productsReducer
    },
});
