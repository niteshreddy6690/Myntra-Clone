import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/features/cart/cartSlice";

const store = configureStore({
  reducer: { cart: cartReducer },
});
export default store;
