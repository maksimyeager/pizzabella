import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
        addProduct: (state, action) => {
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
        plusProduct: (state, action) => {
            const findProduct = state.products.find(
                (obj) => obj.id === action.payload
            );
            if (findProduct) {
                findProduct.count++;
            }
        },
        minusProduct: (state, action) => {
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
        removeProduct: (state, action) => {
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

export const {
    addProduct,
    plusProduct,
    minusProduct,
    removeProduct,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
