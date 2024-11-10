import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
    "products/fetchProductsStatus",
    async ({ currentPage, category, sortBy, order }, thunkAPI) => {
        const response = await axios.get(
            `https://6717d67cb910c6a6e02a3843.mockapi.io/products?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`
        );
        return response.data;
    }
);

const initialState = {
    products: [],
    status: "loading", // loading || success || error
};

const productsSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setIsLoading: (state, action) => {
            state.products = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = "loading";
            state.products = [];
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.status = "success";
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.status = "error";
            state.products = [];
        });
    },
});

export const productsSelector = (state) => state.productsReducer

export const { setProducts, setIsLoading } = productsSlice.actions;

export default productsSlice.reducer;
