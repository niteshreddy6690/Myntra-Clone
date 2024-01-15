import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { otpStart, otpSuccess, otpFailure } from "./otpredux";
import { publicRequest, userRequest } from "../requestMethods";
import LocalStorageService from "../utils/api/localStorage";
import { request } from "../utils/api/axios";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";

export const login = async (dispatch, phoneNumber, navigate) => {
  dispatch(otpStart());
  try {
    const res = await request.post("/auth/registermobile", phoneNumber);
    dispatch(otpSuccess(res.data));
    if (res) {
      navigate("/verifyotp");
    }
  } catch (err) {
    dispatch(otpFailure());
  }
};

export const verifyOtp = async (dispatch, otpData, navigate) => {
  try {
    const res = await request.put("/auth/otpverify", otpData);
    if (res) {
      LocalStorageService.setToken(res.data);
      dispatch(loginSuccess(res.data));
      navigate("/");
    }
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await request.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await request.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(res.data));
    getProducts(dispatch);
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

// export const updateProduct = async (id, product, dispatch) => {
//   dispatch(updateProductStart());
//   try {
//     // update
//     const res = await request.put(`/products/${id}`, product);
//     
//     if(res)
//     dispatch(updateProductSuccess({ id, product }));
//   } catch (err) {
//     dispatch(updateProductFailure());
//   }
// };
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await request.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};
