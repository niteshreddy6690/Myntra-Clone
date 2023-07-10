// import React from "react";
// import {
//   CartItemContainer,
//   NavLink,
//   Img,
//   StyledArrowDropDownIcon,
// } from "./CartItem.styles";
// import ClearIcon from "@mui/icons-material/Clear";
// import CartOverlay from "./CartOverlay";
// const CartItem = ({
//   productId,
//   price,
//   brand,
//   description,
//   discountPercentage,
//   size,
//   quantity,
//   images,
//   handelSetSize,
//   handelDelete,
//   isSetSize,
// }) => {
//   return (
//     <div>
//       <CartItemContainer>
//         <div className="item-container">
//           <div className="leftItem">
//             <NavLink to="">
//               <Img src={images[0]?.url} alt={images[0]?.name} />
//             </NavLink>
//           </div>
//           <div className="rightItem">
//             <div className="productInfo">
//               <div className="productBrand">{brand}</div>
//               <div className="productDescription">{description}</div>
//             </div>
//             <div className="productPrice">
//               <span className="discountedPrice">
//                 {`₹${Math.round(
//                   (price - price * (discountPercentage / 100)) * quantity
//                 )}`}
//               </span>
//               <span className="originalPrice">{`₹${price * quantity}`}</span>
//               <span className="percentageOff">{`${discountPercentage}% OFF`}</span>
//             </div>
//             <div>
//               <div className="size-quantity" onClick={() => handelSetSize()}>
//                 <span>{`Size: ${size}`}</span>
//                 <StyledArrowDropDownIcon
//                   style={{
//                     height: "14px",
//                     width: "14px",
//                     fontSize: "16px",
//                   }}
//                 />
//               </div>
//               <div className="size-quantity">
//                 <span>{`Qty: ${quantity}`}</span>
//                 <StyledArrowDropDownIcon
//                   style={{
//                     height: "14px",
//                     width: "14px",
//                     fontSize: "16px",
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//           <div
//             className="clearIcon"
//             onClick={() => handelDelete(productId._id)}
//           >
//             <ClearIcon />
//           </div>
//         </div>
//       </CartItemContainer>
//       <CartOverlay
//         isSetSize={isSetSize}
//         productId={productId}
//         price={price}
//         brand={brand}
//         description={description}
//         discountPercentage={discountPercentage}
//         size={size}
//         quantity={quantity}
//         images={images}
//         handelSetSize={handelSetSize}
//         handelDelete={handelDelete}
//       />
//     </div>
//   );
// };

// export default CartItem;
