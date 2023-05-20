import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";

const initialState = {
  orderItems: [],
  isLoading: true,
  isError: false,
  message: "",
};

// order/getOrders
export const fetchOrderItems = createAsyncThunk("order/getOrders", async () => {
  try {
    const response = await api.getOrder();
    return response?.data?.orders;
  } catch (error) {
    console.error(error);
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchOrderItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOrderItems.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orderItems = action.payload;
      state.isError = "";
    });
    builder.addCase(fetchOrderItems.rejected, (state, action) => {
      state.isLoading = false;
      state.orderItems = [];
      state.isError = true;
      state.message = action.error.message;
    });
  },
});

export default orderSlice.reducer;
