import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./../store.ts";

export type CartProduct = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: number;
    count: number;
};

interface CartSliceState {
    totalPrice: number;
    products: CartProduct[];
}

const initialState: CartSliceState = {
    totalPrice: 0,
    products: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // addProducts: (state, action) => {
        //     state.products.push(action.payload);
        // state.totalPrice = state.products.reduce((sum, obj) => {
        //     return obj.price + sum
        // }, 0)
        // },
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

            state.totalPrice = state.products.reduce((sum, obj) => {
                return obj.price * obj.count + sum;
            }, 0);
        },
        plusProduct: (state, action: PayloadAction<string>) => {
            const findProduct = state.products.find(
                (obj) => obj.id === action.payload
            );
            if (findProduct) {
                findProduct.count++;
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
        },
        clearCart: (state) => {
            state.products = [];
            state.totalPrice = 0;
        },
    },
});

export const cartSelector = (state: RootState) => state.cartReducer;

export const {
    addProduct,
    plusProduct,
    minusProduct,
    removeProduct,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
