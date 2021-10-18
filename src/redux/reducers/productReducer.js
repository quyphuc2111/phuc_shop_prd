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
            let check = false;
            state.map((item,index) => {
                if(item.product === payload.product && item.color === payload.color && item.capacities === payload.capacities) {
                    state[index].quantity++;
                    check = true;
                }
            });
            if(!check) {
               return [...state, payload]
            }
            return [...state  ];
        case ActionTypes.DECREASE_QUANTITY:
            if(state[payload].quantity > 1) {
                state[payload].quantity--
            }
            return [...state]
        case ActionTypes.INCREASE_QUANTITY:
            state[payload].quantity++
            return [...state ]  
        case ActionTypes.REMOVE_PRODUCT_TO_CART:
            const targetItemIndex = state.indexOf(payload)
            return state.filter((item, index) => index !== targetItemIndex);
        default:
            return state;
    }
}

