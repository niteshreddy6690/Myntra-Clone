import { request } from "../api/axios";


// Cart API's
export const getCartItems = () => request.get("/carts");
export const removeCartItem = (productId) =>request.post("/carts/delete", { productId });
export const addItemToCart = ({ productId, size }) =>request.post("/carts", { productId, size });
export const updateSizeAndQuantity = ( {productId,selectedSize,productGId,productQnt}) => request.post("/carts/update",{ productId,selectedSize,productGId,productQnt})

// wishlist API's
export const getWishlistItems = () => request.get("/wishlist");
export const removeItemFromWishlist = ({ id }) =>request.delete(`/wishlist/${id}`);

// export const moveWishlistItemToCart=({productId,size})=>API.post("/carts")

// Product API
const ConstructURL =(category,selectedFilters)=>{
  const queryParams = new URLSearchParams();
  
  Object.entries(selectedFilters).forEach(([key, value]) => {
    if (value.length > 0 || Number.isInteger(value)) {
      if (Array.isArray(value)) {
        value.forEach((v) => queryParams.append(key, v));
      } else {
        queryParams.set(key, value);
      }
    }
    
  });

  const queryString = queryParams.toString();
  const baseRoute = `/products/${category}`;
 return queryString ? `${baseRoute}?${queryString}` : baseRoute;



}
export const getProdUctByCategory = async ({ category, selectedFilters }) =>{
  
 const ConstructedURL = await ConstructURL(category,selectedFilters)
 
const data =request.get(ConstructedURL);
return data
}

// getProdUctByID
export const getProductById = ({ id }) => request.get(`products/find/${id}`);


// user API
export const getUserById = ({ id }) => request.get(`user/${id}`);
export const logOutUser = ({ refreshToken }) =>request.post(`auth/logout`, { refreshToken });

// Address API's
export const getUserAddress = () => request.get(`address/`);
export const addNewAddress = ({ addAddress }) =>
  request.post("address/add", addAddress);

// Order API Calls
export const getOrder = () => request.get("/order/getOrders");
