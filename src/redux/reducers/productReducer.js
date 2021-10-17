import { ActionTypes } from "../contants/actionTypes";

const initialState = {
    products: [],
}

export const productReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case ActionTypes.SET_PRODUCT:
            return {...state, products: payload};
        default:
            return state;
    }
}

export const selectedProductReducer = (state = {}, {type, payload}) => {
    switch(type) {
        case ActionTypes.SELECTED_PRODUCT:
            return {...state,  ...payload};
        case ActionTypes.REMOVE_SELECTED_PRODUCT:
            return {}
        default:
            return state;
    }
}

export const cartProductReducer = (state = [], {type, payload}) => {
    switch(type) {
        case ActionTypes.ADD_PRODUCT_TO_CART:
            return [...state,  payload];
        case ActionTypes.REMOVE_PRODUCT_TO_CART:
            const targetItemIndex = state.indexOf(payload)
            console.log(targetItemIndex)
            return state.filter((item, index) => index !== targetItemIndex);
        default:
            return state;
    }
}

