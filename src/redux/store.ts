import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import filterReducer from "./filter/slice.ts";
import cartReducer from "./cart/slice.ts";
import productsReducer from "./products/slice.ts";

export const store = configureStore({
    reducer: {
        filterReducer,
        cartReducer,
        productsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
