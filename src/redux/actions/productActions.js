import {ActionTypes} from "../contants/actionTypes";

export const setProducts = (product) => {
    return {
        type: ActionTypes.SET_PRODUCT,
        payload: product,
    }
}
export const selectedProducts = (product) => {
    return {
        type: ActionTypes.SELECTED_PRODUCT,
        payload: product,
    }
}
export const removeSelectedProducts = () => {
    return {
        type: ActionTypes.REMOVE_SELECTED_PRODUCT,
    }
}
export const filterProducts = (product) => {
    return {
        type: ActionTypes.FILTER_PRODUCT,
        payload: product,
    }
}
export const addProductToCart = (cart) => {
    
    return {
        type: ActionTypes.ADD_PRODUCT_TO_CART,
        payload: cart,
    }
}
export const removeProductToCart = (product) => {
    return {
        type: ActionTypes.REMOVE_PRODUCT_TO_CART,
        payload: product
    }
}