import { CartProduct } from "../redux/cart/types.ts";
import { calcTotalPrice } from "./calcTotalPrice.ts";

export const getCartFromLocalStorage = () => {
    const data = localStorage.getItem("cart");
    const products = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalPrice(products);
    return {
        products: products as CartProduct[],
        totalPrice,
    };
};
