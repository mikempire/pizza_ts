import {configureStore} from '@reduxjs/toolkit';
import filter from "./slices/filter/slice";
import cart from "./slices/cart/slice";
import pizza from "./slices/pizza/slice";
import { useDispatch } from 'react-redux/es/hooks/useDispatch';

export const store = configureStore({
    reducer: {
        filter,
        cart,
        pizza
    }
});

export type RootState = ReturnType<typeof store.getState>;


export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch <AppDispatch>()// Export a hook that can be reused to resolve types