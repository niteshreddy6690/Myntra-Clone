import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";

const initialState = {
  productItem: {},
  isLoading: true,
  productsData: {},
  isError: false,
  message: "",
};

export const fetchProductById = createAsyncThunk(
  "product/productById",
  async ({ id }) => {
    try {
      
      const response = await api.getProductById({ id });
      return response.data;
    } catch (error) {
      
    }
  }
);


export const fetchProductByCategory=createAsyncThunk("product/",
async({ category,params}) =>{
  try{
    
    
    const response = await api.getProdUctByCategory({ category, selectedFilters:params });
    
    return response.data;
  }
  catch(error){

  }
} )


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
    });
    builder.addCase(fetchProductByCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductByCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productsData= action.payload;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(fetchProductByCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default productSlice.reducer;
