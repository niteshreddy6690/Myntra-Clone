import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";

const initialState = {
  currentUser: null,
  isLoading: true,
  isError: false,
  message: "",
};

export const fetchUserById = createAsyncThunk(
  "user/userById",
  async ({ id }) => {
    try {
      console.log("fetching user by id");
      const response = await api.getUserById({ id });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateUserById = createAsyncThunk(
  "user/userById",
  async ({ id, data }) => {
    try {
    } catch (error) {}
  }
);

export const logOutUser = createAsyncThunk(
  "user/logOutUser",
  async ({ refreshToken }) => {
    try {
      console.log("Logout user");
      const response = await api.logOutUser({ refreshToken });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(fetchUserById.rejected, (state, action) => {
      state.isLoading = false;
      //   state.message = action.error.message;
    });
    builder.addCase(logOutUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logOutUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = null;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(logOutUser.rejected, (state, action) => {
      state.isLoading = false;
      //   state.message = action.error.message;
    });
  },
});

export default userSlice.reducer;
