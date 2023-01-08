import {CartItem, CartSliceState} from "./types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {calcTotalPrice} from "../../../utils/calcTotalPrice";
import {calcCountInCart} from "../../../utils/calcCountInCart";
import {getCartFromLS} from "../../../utils/getCartFromLS";


const {totalPrice, items, countInCart} = getCartFromLS();
const initialState: CartSliceState = {
    totalPrice,
    items,
    countInCart
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState, // указываем начальное состояние
    reducers: {
        addItems(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id);
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                });
            }
            state.totalPrice = calcTotalPrice(state.items)

            state.countInCart = calcCountInCart(state.items)
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter((obj) => obj.id !== action.payload);
            state.totalPrice = calcTotalPrice(state.items);
            state.countInCart = calcCountInCart(state.items);
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
            state.countInCart = 0;
        },
        minusItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id);
            if (findItem) {
                findItem.count--
            }
            // if (findItem?.count === 0) {
            //     state.items = state.items.filter((obj) => obj.id !== action.payload.id);
            // }
            state.totalPrice = calcTotalPrice(state.items);
            state.countInCart = calcCountInCart(state.items)
        },
    }
})




export const {addItems, removeItem, clearItems, minusItem} = cartSlice.actions;
export default cartSlice.reducer;