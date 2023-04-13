import axios from "axios";
import { request } from "../api/axios";

const API = axios.create({ baseURL: "http://localhost:8080/api" });

export const getCartItems = () => request.get("/carts");

export const removeCartItem = (productId) =>
  request.post("/carts/delete", { productId });

export const addItemToCart = ({ productId, size }) =>
  request.post("/carts", { productId, size });

// wishlist API's

export const getWishlistItems = () => request.get("/wishlist");

export const removeItemFromWishlist = ({ id }) =>
  request.delete(`/wishlist/${id}`);

// export const moveWishlistItemToCart=({productId,size})=>API.post("/carts")

// Product API

export const getProductById = ({ id }) => request.get(`products/find/${id}`);

// user API
export const getUserById = ({ id }) => request.get(`user/${id}`);

export const logOutUser = ({ refreshToken }) =>
  request.post(`auth/logout`, { refreshToken });
