import {CartItem} from "../redux/slices/cart/types";

export const calcCountInCart = (items: CartItem[]) => {
    return items.reduce((sum, obj) => obj.count + sum, 0)
};
