import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterSliceState, SortPropertyEnum, SortType } from "./types.ts";

const initialState: FilterSliceState = {
    categoryId: 0,
    currentPage: 1,
    sortType: {
        name: "популярности",
        sortProperty: SortPropertyEnum.RATING_DESC,
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
                state.categoryId = action.payload.categoryId;
                state.currentPage = action.payload.currentPage;
                state.sortType = action.payload.sortType;
            } else {
                state.categoryId = 0;
                state.currentPage = 1;
                state.sortType = {
                    name: "популярности",
                    sortProperty: SortPropertyEnum.RATING_DESC,
                };
            }
        },
    },
});

export const { setCategoryId, setSortType, setCurrentPage, setFilters } =
    filterSlice.actions;

export default filterSlice.reducer;
