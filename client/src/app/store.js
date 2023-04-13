import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/features/cart/cartSlice";
import wishlistReducer from "../redux/features/wishlist/wishlistSlice";
import productReducer from "../redux/features/product/productSlice";
import userReducer from "../redux/features/user/userSlice";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    product: productReducer,
    user: userReducer,
  },
});
export default store;

const rootReducer = (state, action) => {
  if (action.type === "RESET") {
    state = undefined;
  }
  return configureStore(state, action);
};
