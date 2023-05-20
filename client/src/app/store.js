import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/features/cart/cartSlice";
import wishlistReducer from "../redux/features/wishlist/wishlistSlice";
import productReducer from "../redux/features/product/productSlice";
import userReducer from "../redux/features/user/userSlice";
import addressReducer from "../redux/features/address/addressSlice";
import orderReducer from "../redux/features/orders/ordersSlice";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    product: productReducer,
    user: userReducer,
    address: addressReducer,
    order: orderReducer,
  },
});
export default store;

const rootReducer = (state, action) => {
  if (action.type === "RESET") {
    state = undefined;
  }
  return configureStore(state, action);
};
