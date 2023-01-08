import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {FetchPizzasArgs, PizzaItem, PizzaSliceState, Status } from "./types";

export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchPizzasArgs>('pizza/fetchPizzaStatus',
    async (params) => {
        // console.log('params в слайсе', params)
        const {currentPage, itemsOnPage, sortBy, category, search} = params;
        const {data} = await axios.get<PizzaItem[]>(
            `https://637146dd07858778617a157d.mockapi.io/pizza?page=${currentPage}&limit=${itemsOnPage}&sortBy=${sortBy}${category}${search}`);
        return data;
    })

const initialState: PizzaSliceState = {
    items: [],
    itemsOnPage: 4,
    pageCount: 1, //  0
    status: Status.LOADING, // loading, success, success
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState, // указываем начальное состояние
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchPizzas.pending,
                (state) => {
                    state.status = Status.LOADING
                    state.items = []
                })
            .addCase(
                fetchPizzas.fulfilled, (state, action: any) => {
                    state.items = action.payload.items;
                    state.pageCount = Math.ceil(action.payload.count / state.itemsOnPage)
                    state.status = Status.SUCCESS
                })
            .addCase(
                fetchPizzas.rejected, (state) => {
                    state.status = Status.ERROR
                    state.items = []
                })
    }
})


export const {setItems} = pizzaSlice.actions;
export default pizzaSlice.reducer;

/*
v 1.0
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading';
            state.items = []

        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload.items;
            state.pageCount = Math.ceil(action.payload.count / state.itemsOnPage)
            state.status = 'success';
        },
        [fetchPizzas.rejected]: (state) => {
            state.status = 'error';
            state.items = []
        }
    },
 */