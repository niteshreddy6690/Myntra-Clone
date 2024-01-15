import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";

const initialState = {
  wishListItems: [],
  deletedItem: {},
  movedItem: {},
  isLoading: true,
  isError: false,
  message: "",
};

export const fetchWishListItems = createAsyncThunk(
  "wishlist/getItems",
  async () => {
    try {
      const response = await api.getWishlistItems();
      return response.data;
    } catch (error) {
      
    }
  }
);

export const removeWishListItems = createAsyncThunk(
  "wishlist/removeWishlistItem",
  async ({ id, toast }) => {
    try {
      const response = await api.removeItemFromWishlist({ id });
      if (response)
        toast("Remove item from wishlist", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          icon: () => (
            <img
              src={
                response.data?.removedProduct?.wishlistProduct?.images[0]?.url
              }
              alt={
                response.data?.removedProduct?.wishlistProduct?.images[0]?.name
              }
              style={{ height: "30px", width: "30px", objectFit: "center" }}
            />
          ),
        });
      return response.data;
    } catch (error) {
      
    }
  }
);

export const removeWishListItemWithOutNotify = createAsyncThunk(
  "wishlist/removeWishlistItem",
  async ({ id }) => {
    try {
      const response = await api.removeItemFromWishlist({ id });
    if(response.status ===200)
      return response.data;
    } catch (error) {
      
    }
  }
);
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchWishListItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchWishListItems.fulfilled, (state, action) => {
      state.isLoading = false;
      state.wishListItems = action.payload;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(fetchWishListItems.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.error.message;
    });
  },
});

export default wishlistSlice.reducer;
