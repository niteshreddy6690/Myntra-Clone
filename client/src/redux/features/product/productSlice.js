import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";

const initialState = {
  productItem: {},
  isLoading: true,
  isError: false,
  message: "",
};

export const fetchProductById = createAsyncThunk(
  "product/productById",

  async ({ id }) => {
    try {
      console.log("fetching product by id");
      const response = await api.getProductById({ id });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProductById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productItem = action.payload;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      //   state.message = action.error.message;
    });
  },
});

export default productSlice.reducer;
