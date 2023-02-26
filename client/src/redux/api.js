import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080/api" });

export const getCartItems = () => API.get("/carts");

export const removeCartItem = (productId) =>
  API.post("/carts/delete", { productId });

export const addItemToCart = ({ productId, size }) =>
  API.post("/carts", { productId, size });
