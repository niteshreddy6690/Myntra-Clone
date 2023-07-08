import { createSlice } from "@reduxjs/toolkit";

const otpSlice = createSlice({
  name: "user",
  initialState: {
    otp: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    otpStart: (state) => {
      state.isFetching = true;
    },
    otpSuccess: (state, action) => {
      state.isFetching = false;
      state.otp = action.payload;
    },
    otpFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { otpStart, otpSuccess, otpFailure } = otpSlice.actions;
export default otpSlice.reducer;
