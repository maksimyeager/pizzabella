import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProduct, CartSliceState } from "./types.ts";
import { getCartFromLocalStorage } from "../../utils/getCartFromLocalStorage.ts";
import { calcTotalPrice } from "../../utils/calcTotalPrice.ts";

const { products, totalPrice } = getCartFromLocalStorage();

const initialState: CartSliceState = {
    totalPrice,
    products,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<CartProduct>) => {
            const findProduct = state.products.find(
                (obj) => obj.id === action.payload.id
            );

            if (findProduct) {
                findProduct.count++;
            } else {
                state.products.push({
                    ...action.payload,
                    count: 1,
                });
            }

            state.totalPrice = calcTotalPrice(state.products);
        },
        plusProduct: (state, action: PayloadAction<string>) => {
            const findProduct = state.products.find(
                (obj) => obj.id === action.payload
            );
            if (findProduct) {
                findProduct.count++;
                state.totalPrice += findProduct.price;
            }
        },
        minusProduct: (state, action: PayloadAction<string>) => {
            const findProduct = state.products.find(
                (obj) => obj.id === action.payload
            );
            if (findProduct) {
                if (findProduct.count === 1) {
                    // Если количество товара 1, удаляем его
                    state.totalPrice -= findProduct.price; // Уменьшаем общую сумму
                    state.products = state.products.filter(
                        (obj) => obj.id !== action.payload
                    );
                } else {
                    findProduct.count--;
                    state.totalPrice -= findProduct.price; // Уменьшаем общую сумму
                }
            }
        },
        removeProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter(
                (obj) => obj.id !== action.payload
            );

            state.totalPrice = state.products.reduce((sum, obj) => {
                return obj.price * obj.count + sum;
            }, 0);
        },
        clearCart: (state) => {
            state.products = [];
            state.totalPrice = 0;
        },
    },
});

export const {
    addProduct,
    plusProduct,
    minusProduct,
    removeProduct,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
