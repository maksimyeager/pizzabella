import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice.ts";
import cartReducer from "./slices/cartSlice.ts";
import productsReducer from "./slices/productsSlice.ts";

export const store = configureStore({
    reducer: {
        filterReducer,
        cartReducer,
        productsReducer
    },
});

export type RootState = ReturnType<typeof store.getState>