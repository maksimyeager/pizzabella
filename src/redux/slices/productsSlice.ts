import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CartProduct } from "./cartSlice";


type Product = {
    id: string;
    imageUrl: string;
    title: string;
    types: number[];
    sizes: number[];
    price: number;
    rating: number;
};

type FetchProductType = {
    currentPage: number
    category: string
    sortBy: string;
    order: string;
}; // Also we can use Record<string, string>? because all keys are string and values strings too


// <Returned, ThunkArg> for creeateAsyncThunk
export const fetchProducts = createAsyncThunk<Product[], FetchProductType>(
    "products/fetchProductsStatus",
    async ({ currentPage, category, sortBy, order }) => {
        const response = await axios.get<Product[]>(
            `https://6717d67cb910c6a6e02a3843.mockapi.io/products?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`
        );
        
        return response.data; // Or response.data as Product[], but we used <Returned, ThunkArg>
    }
);

interface ProductSliceState {
    products: Product[]
    status : "loading" | "success" | "error"
}

const initialState: ProductSliceState = {
    products: [],
    status: "loading", // loading || success || error
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

export const productsSelector = (state: RootState) => state.productsReducer;

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
