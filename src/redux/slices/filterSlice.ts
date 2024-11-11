import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./../store.ts";

type SortType = {
    name: string;
    sortProperty:
        | "rating"
        | "price"
        | "title"
        | "-rating"
        | "-price"
        | "-title";
};

interface FilterSliceState {
    categoryId: number;
    currentPage: number;
    sortType: SortType;
}

const initialState: FilterSliceState = {
    categoryId: 0,
    currentPage: 1,
    sortType: {
        name: "популярности",
        sortProperty: "rating",
    },
};

const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setCategoryId: (state, action: PayloadAction<number>) => {
            state.categoryId = action.payload;
        },

        setSortType: (state, action: PayloadAction<SortType>) => {
            state.sortType = action.payload;
        },

        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setFilters: (state, action: PayloadAction<FilterSliceState>) => {
            if (Object.keys(action.payload).length) {
                state.categoryId = Number(action.payload.categoryId);
                state.currentPage = Number(action.payload.currentPage);
                state.sortType = action.payload.sortType;
            } else {
                state.categoryId = 0;
                state.currentPage = 1;
                state.sortType = {
                    name: "популярности",
                    sortProperty: "rating",
                };
            }
        },
    },
});

export const filterSelector = (state: RootState) => state.filterReducer;
export const filterSortPropertySelector = (state: RootState) =>
    state.filterReducer.sortType.sortProperty;

export const { setCategoryId, setSortType, setCurrentPage, setFilters } =
    filterSlice.actions;

export default filterSlice.reducer;
