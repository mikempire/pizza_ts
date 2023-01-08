import {calcTotalPrice} from "./calcTotalPrice";
import {calcCountInCart} from "./calcCountInCart";

export const getCartFromLS = () => {
    const data = localStorage.getItem('cart');
    const items = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalPrice(items);
    const countInCart = calcCountInCart(items);
    return {
        items,
        totalPrice,
        countInCart
    }
}

// return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
