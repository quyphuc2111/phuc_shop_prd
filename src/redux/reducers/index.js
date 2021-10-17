import { combineReducers } from "redux";
import { cartProductReducer, productReducer, selectedProductReducer } from "./productReducer";

const reducers = combineReducers({
  allProducts: productReducer,
  product: selectedProductReducer,
  cart: cartProductReducer,
});
export default reducers;
