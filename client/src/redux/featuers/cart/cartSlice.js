import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BaseURL } from "../../../utils/baseUrl";
import axios from "axios";

const initialState = {
  cartItems: [],
  cartItem: {},
  isLoading: true,
  isError: false,
  message: "",
};

export const fetchCartItems = createAsyncThunk("cart/getCart", () => {
  return axios
    .get("http://localhost:8080/api/carts")
    .then((response) => response?.data?.cart.items);
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCartItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
      state.isError = "";
    });
    builder.addCase(fetchCartItems.rejected, (state, action) => {
      state.isLoading = false;
      state.cartItems = [];
      state.isError = true;
      state.message = action.error.message;
    });
  },
});

export default cartSlice.reducer;
