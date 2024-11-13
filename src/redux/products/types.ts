export type Product = {
    id: string;
    imageUrl: string;
    title: string;
    types: number[];
    sizes: number[];
    price: number;
    rating: number;
};

export type SearchProductParams = {
    currentPage: number;
    category: string;
    sortBy: string;
    order: string;
};
export enum Status {
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error",
}

export interface ProductSliceState {
    products: Product[];
    status: Status;
}