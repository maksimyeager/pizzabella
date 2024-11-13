import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
    Product,
    ProductSliceState,
    SearchProductParams,
    Status,
} from "./types.ts";

// type FetchProductType = {
//     currentPage: number;
//     category: string;
//     sortBy: string;
//     order: string;
// }; // Also we can use Record<string, string>? because all keys are string and values strings too

// <Returned, ThunkArg> for creeateAsyncThunk
export const fetchProducts = createAsyncThunk<Product[], SearchProductParams>(
    "products/fetchProductsStatus",
    async ({ currentPage, category, sortBy, order }) => {
        const response = await axios.get<Product[]>(
            `https://6717d67cb910c6a6e02a3843.mockapi.io/products?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`
        );
        return response.data; // Or response.data as Product[], but we used <Returned, ThunkArg>
    }
);

const initialState: ProductSliceState = {
    products: [],
    status: Status.LOADING,
};

const productsSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = Status.LOADING;
            state.products = [];
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.products = [];
        });
    },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
