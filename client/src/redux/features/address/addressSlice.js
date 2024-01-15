import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../../api";

const initialState = {
  userAddresses: [],
  userAddress: {},
  isLoading: true,
  isError: false,
  message: "",
};

export const fetchUserAddress = createAsyncThunk(
  "address/getUserAddress",
  async () => {
    try {
      const response = await api.getUserAddress();
      return response?.data?.address;
    } catch (error) {
      console.error(error);
    }
    // return axios
    //   .get("http://localhost:8080/api/carts")
    //   .then((response) => response?.data?.cart.items);
  }
);

export const addNewUserAddress = createAsyncThunk(
  "address/addNewAddress",
  async ({ addAddress }, { dispatch }) => {
    try {
      
      const response = await api.addNewAddress({ addAddress });
      
      if (response) {
        dispatch(fetchUserAddress());
      }
    } catch (error) {
      console.error(error);
    }
  }
);
const addressSlice = createSlice({
  name: "address",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUserAddress.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserAddress.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userAddresses = action.payload;
      state.isError = "";
    });
    builder.addCase(fetchUserAddress.rejected, (state, action) => {
      state.isLoading = false;
      state.userAddresses = [];
      state.isError = true;
      state.message = action.error.message;
    });

    builder.addCase(addNewUserAddress.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addNewUserAddress.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userAddress = action.payload;
      state.isError = "";
    });
    builder.addCase(addNewUserAddress.rejected, (state, action) => {
      state.isLoading = false;
      state.userAddress = {};
      state.isError = true;
      state.message = action.error.message;
    });
  },
});

// const cartItemSlice = createSlice({
//   name: "cartItem",
//   initialState,
// });
export default addressSlice.reducer;
