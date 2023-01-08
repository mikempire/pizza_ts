import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FilterSliceState, Sort} from "../filter/types";

const initialState: FilterSliceState= {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sortProperty: 'rating'
    }
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState, // указываем начальное состояние
    reducers: {
        setCategoryId(state, action: PayloadAction <number>) {
            state.categoryId = action.payload;
            state.currentPage = Number(1);
        },
        setSortType(state, action: PayloadAction <Sort>) {
            state.sort = action.payload
        },
        setCurrentPage(state, action: PayloadAction <number>) {
            state.currentPage = action.payload
        },
        setSearchValue(state, action: PayloadAction <string>) {
            state.searchValue = action.payload
        },
        setFilters(state, action: PayloadAction <FilterSliceState>) {
            state.currentPage = Number(action.payload.currentPage);
            state.sort = action.payload.sort;
            // console.log('action.payload.categoryId', action.payload)
            state.categoryId = Number(action.payload.categoryId);
        }
    }
})




export const {setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue} = filterSlice.actions;
export default filterSlice.reducer;