// import React, { useState, useRef, useEffect } from "react";
// import styled from "styled-components";
// import Navbar from "../components/Navbar/Navbar";
// import { Link, useLocation, useSearchParams } from "react-router-dom";
// import Banner from "../components/Banner/Banner";
// import axios from "axios";
// import Similar from "../components/ViewSimilar/Similar";
// import Checkbox from "./Checkbox";
// // import Carousel from "nuka-carousel";
// import { Swiper, SwiperSlide } from "swiper/react";
// import FavoriteIcon from "@mui/icons-material/FavoriteBorderTwoTone";
// import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

// // import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// // import required modules
// import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";

// //Import images
// import images1 from "../Assets/Images/Men/Men1.webp";
// import images2 from "../Assets/Images/Men/Men2.webp";
// import images3 from "../Assets/Images/Men/Men3.webp";
// import images4 from "../Assets/Images/Men/Men4.webp";
// import images5 from "../Assets/Images/Men/Men5.webp";
// import images6 from "../Assets/Images/Men/Men6.webp";

// import imagesB1 from "../Assets/Images/Men/MenB1.webp";
// import imagesB2 from "../Assets/Images/Men/MenB2.webp";
// import imagesB3 from "../Assets/Images/Men/MenB3.webp";
// import imagesB4 from "../Assets/Images/Men/MenB4.webp";

// import imagesC1 from "../Assets/Images/Men/MenC1.webp";
// import imagesC2 from "../Assets/Images/Men/MenC2.webp";
// import imagesC3 from "../Assets/Images/Men/MenC3.webp";
// import imagesC4 from "../Assets/Images/Men/MenC4.jpeg";

// import imagesD1 from "../Assets/Images/Men/MenD1.jpeg";
// import imagesD2 from "../Assets/Images/Men/MenD2.jpeg";
// import imagesD3 from "../Assets/Images/Men/MenD3.jpeg";
// import imagesD4 from "../Assets/Images/Men/MenD4.jpeg";
// import imagesD5 from "../Assets/Images/Men/MenD5.jpeg";
// import imagesD6 from "../Assets/Images/Men/MenD6.jpeg";

// import imagesE1 from "../Assets/Images/Men/MenE1.webp";
// import imagesE2 from "../Assets/Images/Men/MenE2.webp";
// import imagesE3 from "../Assets/Images/Men/MenE3.webp";
// import imagesE4 from "../Assets/Images/Men/MenE4.webp";
// import imagesE5 from "../Assets/Images/Men/MenE5.webp";
// import imagesE6 from "../Assets/Images/Men/MenE6.webp";

// // SwiperCore.use([Pagination, Autoplay]);
// // const products = [
// //   {
// //     id: "1",
// //     brand: "HRX by Hrithik Roshan",
// //     Gender: ["men"],
// //     Desc: "Rapid Dry Training T-shirt",
// //     img: [images1, images2, images3, images4, images5, images6],
// //     size: ["L", "M", "XL", "XS", "XXL"],
// //     OriginalPrice: "1999",
// //     discountPercentage: "60",
// //     inStock: true,
// //   },
// //   {
// //     id: "2",
// //     brand: "HRX by Hrithik Roshan",
// //     color: ["green", "limegreen"],
// //     Gender: ["men"],
// //     Desc: "Rapid Dry Training T-shirt",
// //     img: [imagesB1, imagesB2, imagesB1, imagesB3, imagesB4],
// //     size: ["L", "M", "XL", "XS", "XXL"],
// //     OriginalPrice: "1999",
// //     discountPercentage: "20",
// //     inStock: true,
// //   },
// //   {
// //     id: "3",
// //     brand: "HRX by Hrithik Roshan",
// //     Gender: ["men"],
// //     Desc: "Rapid Dry Training T-shirt",
// //     img: [imagesC1, imagesC2, imagesC3, imagesC1, imagesC4],
// //     size: ["L", "M", "XL", "XS", "XXL"],
// //     OriginalPrice: "1999",
// //     discountPercentage: "30",
// //     inStock: true,
// //   },
// //   {
// //     id: "4",
// //     brand: "HRX by Hrithik Roshan",
// //     Gender: ["men"],
// //     Desc: "Rapid Dry Training T-shirt",
// //     img: [imagesD2, imagesD1, imagesD3, imagesD4, imagesD5, imagesD6],
// //     size: ["L", "M", "XL", "XS", "XXL"],
// //     OriginalPrice: "1999",
// //     discountPercentage: "40",
// //     inStock: true,
// //   },
// //   {
// //     id: "5",
// //     brand: "HRX by Hrithik Roshan",
// //     Gender: ["men"],
// //     Desc: "Rapid Dry Training T-shirt",
// //     img: [imagesE1, imagesE2, imagesE3, imagesE4, imagesE5, imagesE6],
// //     size: ["L", "M", "XL", "XS", "XXL"],
// //     OriginalPrice: "1999",
// //     discountPercentage: "60",
// //     inStock: true,
// //   },
// //   {
// //     id: "6",
// //     brand: "HRX by Hrithik Roshan",
// //     Gender: ["men"],
// //     Desc: "Rapid Dry Training T-shirt",
// //     img: [images2, images1, images1],
// //     size: ["L", "M", "XL", "XS", "XXL"],
// //     OriginalPrice: "1999",
// //     discountPercentage: "60",
// //     inStock: true,
// //   },
// //   {
// //     id: "7",
// //     brand: "HRX by Hrithik Roshan",
// //     Gender: ["men"],
// //     Desc: "Rapid Dry Training T-shirt",
// //     img: [images1, images2, images1],
// //     size: ["L", "M", "XL", "XS", "XXL"],
// //     OriginalPrice: "1999",
// //     discountPercentage: "50",
// //     inStock: true,
// //   },
// //   {
// //     id: "8",
// //     brand: "HRX by Hrithik Roshan",
// //     Gender: ["men"],
// //     Desc: "Rapid Dry Training T-shirt",
// //     img: [images2, images1, images1],
// //     size: ["L", "M", "XL", "XS", "XXL"],
// //     OriginalPrice: "1999",
// //     discountPercentage: "65",
// //     inStock: true,
// //   },
// //   {
// //     id: "9",
// //     brand: "HRX by Hrithik Roshan",
// //     Gender: ["men"],
// //     Desc: "Rapid Dry Training T-shirt",
// //     img: [images1, images1, images1],
// //     size: ["L", "M", "XL", "XS", "XXL"],
// //     OriginalPrice: "1999",
// //     discountPercentage: "60",
// //     inStock: true,
// //   },
// //   {
// //     id: "10",
// //     brand: "HRX by Hrithik Roshan",
// //     Gender: ["men"],
// //     Desc: "Rapid Dry Training T-shirt",
// //     img: [images2, images1, images1],
// //     size: ["L", "M", "XL", "XS", "XXL"],
// //     OriginalPrice: "1999",
// //     discountPercentage: "65",
// //     inStock: true,
// //   },
// //   {
// //     id: "11",
// //     brand: "HRX by Hrithik Roshan",
// //     Gender: ["men"],
// //     Desc: "Rapid Dry Training T-shirt",
// //     img: [images2, images1, images1],
// //     size: ["L", "M", "XL", "XS", "XXL"],
// //     OriginalPrice: "1999",
// //     discountPercentage: "60",
// //     inStock: true,
// //   },
// //   {
// //     id: "12",
// //     brand: "HRX by Hrithik Roshan",
// //     Gender: ["men"],
// //     Desc: "Rapid Dry Training T-shirt",
// //     img: [images2, images1, images1],
// //     size: ["L", "M", "XL", "XS", "XXL"],
// //     OriginalPrice: "1999",
// //     discountPercentage: "60",
// //     inStock: true,
// //   },
// // ];

// const Main = styled.div`
//   margin: 0 auto;
//   max-width: 1600px;
// `;

// const RowBase = styled.div`
//   display: flex;
//   flex-direction: row;
//   flex-wrap: wrap;
//   justify-content: flex-start;
//   align-items: stretch;
//   align-content: stretch;
//   box-sizing: content-box;
// `;

// const Breadcrumbs = styled.div`
//   vertical-align: top;
//   padding: 20px 0 0;
// `;
// const BreadcrumbList = styled.ul`
//   font-size: 14px;
//   overflow: hidden;
//   display: inline-block;
//   margin: 0 0 0 25px;
//   vertical-align: top;
//   padding: 0;
// `;
// const BreadcrumbListItem = styled.li`
//   text-decoration: none;
//   list-style: none;
//   font-size: 14px;
//   /* display: inline-block; */
//   float: left;
//   margin-right: 5px;
//   text-transform: capitalize;
//   line-height: 1;

//   &::after {
//     font-size: 14px;
//     content: "/";
//     margin-left: 5px;
//     color: #282c3f;
//   }
// `;
// const TitleContainer = styled.div`
//   margin: 10px 0 5px 25px;
//   display: flex;
//   align-items: center;
//   max-width: 1000px;
//   overflow: hidden;
// `;

// const Header1 = styled.h1`
//   font-family: Whitney Semibold;
//   font-weight: 500;
//   letter-spacing: 0.5px;
//   text-overflow: ellipsis;
//   overflow: hidden;
//   white-space: nowrap;
//   color: #282c3f;
//   max-width: 400px;
//   text-transform: capitalize;
//   display: inline-block;
//   font-size: 16px;
//   margin: 0;
// `;
// const Span = styled.span`
//   color: #878b94;
//   font-weight: 500;
//   display: block;
//   white-space: pre-wrap;
//   font-family: Whitney;
//   display: inline-block;
//   font-size: 16px;
//   margin: 0;
// `;
// const LeftSection = styled.div`
//   min-width: 252px;
//   max-width: 252px;
//   flex-grow: 0 !important;
//   align-self: flex-start;
//   flex-wrap: wrap;
//   flex-direction: column;
//   flex: 1;
//   font-family: Whitney Semibold;
// `;
// const Section = styled.section`
//   /* width: 100%; */
// `;
// const LeftSectionDiv = styled.div`
//   box-sizing: border-box;
//   position: static;
//   box-sizing: border-box;
//   transition: margin 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
//   margin-top: 0;
//   padding-top: 23px;
// `;
// const FilterDiv = styled.div`
//   text-align: start;
//   position: relative;
//   border-right: none !important;
//   padding: 0 0 15px 25px;
//   border-bottom: 1px solid #e9e9ed;
// `;
// const FilterSpan = styled.span`
//   text-transform: uppercase;
//   font-weight: 500;
// `;
// const CategoriesDiv = styled(FilterDiv)`
//   padding: 20px 0 15px 25px;
// `;
// const CategoriesSpan = styled.span`
//   font-weight: 500;
//   text-transform: uppercase;
//   font-size: 14px;
//   margin: 0 0 18px;
//   clear: both;
//   color: #282c3f;
//   display: block;
// `;
// const Ul = styled.ul`
//   font-weight: 400;
//   margin: 0;
//   padding: 0;
//   list-style: none;
// `;
// const Li = styled.li``;
// const Input = styled.input`
//   margin: 0 16px 0 0;
// `;
// const Label = styled.label`
//   display: block;
//   width: 95%;
//   white-space: nowrap;
//   cursor: pointer;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   min-height: 20px;
//   color: #282c3f;
//   font-family: Whitney Book;
//   font-size: 14px;
// `;

// const BrandDiv = styled(CategoriesDiv)``;
// const BrandSpan = styled(CategoriesSpan)``;
// const ColorDiv = styled(CategoriesDiv)``;
// const ColorSpan = styled(CategoriesSpan)``;
// const ColorDisplay = styled.span`
//   display: inline-block;
//   width: 15px;
//   height: 15px;
//   background: ${({ color }) => (color ? color : "#ffffff")};
//   border-radius: 50%;
//   margin-right: 10px;
// `;
// const RightSection = styled.div`
//   padding: 0px;
//   flex: 1 1 0%;
// `;
// const RSecttion = styled.div`
//   width: 100%;
//   /* overflow: hidden;
//   overflow-y: scroll;
//   height: 100%; */
// `;

// const RightSectionRowBase = styled.div`
//   display: flex;
//   flex-direction: row;
//   flex-wrap: wrap;
//   justify-content: flex-start;
//   align-items: stretch;
//   align-content: stretch;
//   padding-top: 24px;
//   padding-left: 15px;
//   padding-right: 20px;
//   /* background-color: red; */
// `;
// const RUl = styled.ul`
//   display: flex;
//   flex-direction: row;
//   flex-wrap: wrap;
//   align-items: stretch;
//   align-content: stretch;
//   margin: 0 -10px 0 3px;
//   width: 100%;
//   justify-content: space-between;
//   padding: 0px;
//   list-style: none;
// `;

// const RLi = styled.li`
//   width: 210px;
//   position: relative;
//   text-align: left;
//   vertical-align: top;
//   overflow: hidden;
//   display: inline-block;
//   box-sizing: border-box;
//   margin: 0 10px 30px;
//   cursor: pointer;

//   /* &hover .wishlistContainer {
//     display: block;
//     height: 50px;
//   } */

//   &:hover {
//     box-shadow: 0 2px 16px 4px rgb(40 44 63 / 7%);
//   }
// `;
// const NavLink = styled(Link)`
//   display: block;
//   text-decoration: none;
// `;
// const ImageSliderContainer = styled.div`
//   position: relative;
//   width: 210px;
//   height: 280px;
// `;
// const ProductSliderContainer = styled.div`
//   position: absolute;
//   top: 0;
//   width: 100%;
//   height: 100%;
//   display: block;
// `;
// const SwiperCarousel = styled(Swiper)`
//   .swiper-horizontal > .swiper-pagination-bullets,
//   .swiper-pagination-bullets.swiper-pagination-horizontal,
//   .swiper-pagination-custom,
//   .swiper-pagination-fraction {
//     bottom: 15px;
//     left: 0;
//     width: 100%;
//   }

//   .swiper-pagination {
//     z-index: 2;
//     position: absolute;
//     top: 280px;
//     height: 20px;
//     left: 0;
//     text-align: center;
//     background-color: #fff;
//     transform: ${({ isHover }) =>
//       isHover ? "translateY(-20px)" : "translateY(0px)"};
//     transition: transform 0.2s;
//   }
//   &:hover {
//   }
//   .swiper-pagination-bullet {
//     background: #d4d5d9;
//     width: 5px;
//     height: 5px;
//     border-radius: 50%;
//     opacity: 1;
//   }

//   .swiper-pagination-bullet-active {
//     background-color: #ff3f6c;
//     width: 5px;
//     height: 5px;
//     border-radius: 50%;
//   }
// `;
// const Image = styled.img`
//   width: 100%;
//   height: 100%;
// `;

// const ViewSimilar = styled.div`
//   width: 30px;
//   height: 30px;
//   position: absolute;
//   z-index: 5;
//   top: 215px;
//   right: 10px;
//   overflow: hidden;
//   cursor: pointer;
//   border: 1px solid #dadade;
//   transition: all 0.2s ease;
//   border-radius: 50%;
//   text-align: center;
//   will-change: contents;
//   background-color: #ffffff;
//   color: #000;
//   font-size: 12px;
//   line-height: 28px;

//   .myntraweb-sprite {
//     background: url(https://constant.myntassets.com/web/assets/img/MyntraWebSprite_27_01_2021.png);
//     background-size: 1404px 105px;
//     display: inline-block;
//   }
//   span,
//   .first {
//     background-size: 6000% 486.36%;
//     background-position: 10.4% 71%;
//     width: 20px;
//     height: 20px;
//   }
//   .image-grid-similarColorsIcon {
//     vertical-align: middle;
//   }
//   .image-grid-iconText {
//     font-weight: 500;
//     color: #ff517b;
//     vertical-align: middle;
//     visibility: hidden;
//     margin-left: 10px;
//     font-size: 14px;
//   }
//   .second {
//     font-size: 12px;
//     margin-top: 0 !important;
//     margin-left: 6px !important;
//   }
//   &:hover {
//     border-radius: 42px;
//     width: 120px;
//     text-align: left;
//     padding-left: 13px;
//     transition: width 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);

//     .image-grid-iconText {
//       font-family: Whitney Semibold;
//       font-weight: 500;
//       color: #ff517b;
//       vertical-align: middle;
//       visibility: visible;
//       margin-left: 10px;
//       font-size: 12px;
//     }
//   }
// `;
// const WishlistContainer = styled.div`
//   color: black;
//   display: block;
//   position: absolute;
//   z-index: 5;
//   left: 0;
//   top: 280px;
//   background: #fff;
//   width: 100%;
//   height: 40px;
//   padding: 0px 10px;
//   box-sizing: border-box;
//   cursor: default;
// `;
// const WishListDivWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 6px 0px;
//   margin: 5px 0px 0px 0px;
//   font-size: 14px;
//   border: 1px solid #d4d5d9;
//   border-radius: 2px;
//   color: ${({ isWishlist }) => (isWishlist ? "#FFF" : "#282c3f")};
//   background-color: ${({ isWishlist }) =>
//     isWishlist ? "rgb(83, 87, 102)" : "#fff"};

//   &:hover {
//     cursor: pointer;
//     border: ${({ isWishlist }) =>
//       isWishlist ? "1px solid #d4d5d9" : "1px solid #535766"};
//   }
// `;
// const WishlistSpan = styled.span`
//   text-align: center;
//   text-transform: uppercase;
//   font-family: "Whitney Semibold";
//   font-weight: 500;
//   margin-left: 5px;
//   letter-spacing: 0.3px;
//   font-size: 12px;
//   z-index: 1000;
// `;
// const ProductMetaInfo = styled.div`
//   position: relative;
//   z-index: 3;
//   background: #fff;
//   padding: 0 10px;
//   padding-top: 10px;
//   height: 100%;
//   box-sizing: border-box;
//   overflow: hidden;
// `;

// const ProductSizeContainer = styled.h4`
//   font-family: Whitney book;
//   font-size: 14px;
//   color: #535665;
//   line-height: 1;
//   display: ${({ isHover }) => (isHover ? "block" : "none")};
//   margin-top: 0;
//   overflow: hidden;
//   white-space: nowrap;
//   text-overflow: ellipsis;
//   padding: 0;
//   margin-bottom: 5px;
//   font-weight: 400;
// `;
// const ProductHeader3 = styled.h3`
//   font-family: Whitney Semibold;
//   font-size: 16px;
//   font-weight: 500;
//   line-height: 1;
//   color: #282c3f;
//   /* margin-top: 5px; */
//   margin-bottom: 6px;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
//   opacity: ${({ isHover }) => (isHover ? "0" : "1")};
//   /* display: ${({ isHover }) => (isHover ? "none" : "block")}; */
// `;
// const ProductHeader4 = styled.h4`
//   color: #535766;
//   font-family: Whitney Book;
//   font-size: 14px;
//   line-height: 1;
//   margin-bottom: 0;
//   margin-top: 0;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
//   font-weight: 400;
//   display: ${({ isHover }) => (isHover ? "none" : "block")};
// `;
// const ProductPriceContainer = styled.div`
//   font-family: Whitney;
//   font-size: 16px;
//   line-height: 15px;
//   margin: 10px 0 6px;
//   white-space: nowrap;
//   font-size: 14px;
//   color: #282c3f;
//   font-weight: 500;
// `;
// const ProductDiscountedPrice = styled.span`
//   font-size: 14px;
//   font-family: Whitney Semibold;
//   font-size: 16px;
//   color: #282c3f;
//   font-weight: 500;
// `;
// const ProductOriginalPrice = styled.span`
//   text-decoration: line-through;
//   color: #7e818c;
//   font-weight: 400;
//   margin-left: 5px;
//   font-size: 12px;
// `;
// const ProductDiscountPercentage = styled.span`
//   color: #ff905a;
//   font-family: Whitney Light;
//   font-weight: 500;
//   font-size: 12px;
//   margin-left: 5px;
// `;

// const ProductCarousel = ({ product, open, handelClick, wishlistProducts }) => {
//   const [isHover, setHover] = useState(false);
//   const [isWishlist, setWishlist] = useState(false);
//   const swiperRef = React.useRef([]);
//   const onInit = function (Swiper) {
//     swiperRef.current = Swiper;
//   };

//   const handelAddToWishlist = async (id) => {
//     const res = await axios.post("http://localhost:8080/api/wishlist/", { id });
//     if (res) setWishlist(true);
//   };

//   const handleMouseEnter = () => {
//     if (wishlistProducts?.includes(product._id)) {
//       setWishlist(true);
//     }
//     if (swiperRef.current) {
//       setHover(true);
//       swiperRef.current.autoplay.start();
//     }
//   };
//   const handleMouseLeave = () => {
//     if (swiperRef.current) {
//       setHover(false);
//       swiperRef.current.autoplay.stop();
//       swiperRef.current.slideTo(1);
//     }
//   };
//   // useEffect(() => {
//   //   if (wishlistProducts && wishlistProducts?.includes(product._id)) {
//   //     
//   //     // setWishlist(true);
//   //   }
//   // });

//   useEffect(() => {
//     // swiperRef.current.autoplay.stop();
//     // 
//     swiperRef.current.params.autoplay.delay = 2000;
//   }, []);

//   return (
//     <>
//       <RLi
//         key={product.id}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         <NavLink
//           target="_blank"
//           to={`/${product.gender.toLowerCase()}/${product.brand
//             .replaceAll(" ", "-")
//             .toLowerCase()}/${product.description
//             .replaceAll(" ", "-")
//             .toLowerCase()}/${product._id}/buy`}
//         >
//           <SwiperCarousel
//             initialSlide={0}
//             speed={400}
//             onInit={onInit}
//             spaceBetween={0}
//             centeredSlides={true}
//             pagination={{
//               clickable: true,
//             }}
//             loop={true}
//             modules={[Autoplay, Pagination]}
//             isHover={isHover}
//           >
//             <ImageSliderContainer>
//               <ProductSliderContainer>
//                 {product.images.map((image) => (
//                   <SwiperSlide>
//                     <Image src={image} loading="lazy" />
//                   </SwiperSlide>
//                 ))}
//               </ProductSliderContainer>
//             </ImageSliderContainer>
//             <ProductMetaInfo>
//               <ProductHeader3 isHover={isHover}>{product.brand}</ProductHeader3>
//               <ProductHeader4 isHover={isHover}>
//                 {product.description}
//               </ProductHeader4>
//               <ProductSizeContainer isHover={isHover}>
//                 Size :
//                 {product.size?.map((size, index) => (
//                   <span style={{ color: `#535665` }}>
//                     {(index ? ", " : "") + ` ${size}`}
//                   </span>
//                 ))}
//               </ProductSizeContainer>
//               <ProductPriceContainer>
//                 <span>
//                   <ProductDiscountedPrice>
//                     {`Rs. ${Math.floor(
//                       product.price -
//                         product.price * (product.discountPercentage / 100)
//                     )}`}
//                   </ProductDiscountedPrice>
//                   <ProductOriginalPrice>{`Rs.${product.price}`}</ProductOriginalPrice>
//                 </span>
//                 <ProductDiscountPercentage>
//                   {`(${product.discountPercentage}%OFF)`}
//                 </ProductDiscountPercentage>
//               </ProductPriceContainer>
//             </ProductMetaInfo>
//           </SwiperCarousel>
//         </NavLink>

//         {isHover ? (
//           <WishlistContainer isHover={isHover} className="wishlistContainer">
//             <WishListDivWrapper
//               isHover={isHover}
//               onClick={() => handelAddToWishlist(product._id)}
//               isWishlist={isWishlist}
//             >
//               {isWishlist ? (
//                 <FavoriteRoundedIcon
//                   style={{
//                     fontSize: "20px",
//                     color: "red",
//                   }}
//                 />
//               ) : (
//                 <FavoriteIcon
//                   style={{
//                     fontSize: "20px",
//                   }}
//                 />
//               )}
//               <WishlistSpan>
//                 {isWishlist ? `wishlisted` : `wishlist`}
//               </WishlistSpan>
//             </WishListDivWrapper>
//           </WishlistContainer>
//         ) : null}
//         {isHover && (
//           <ViewSimilar onClick={() => handelClick(open)}>
//             <span class="myntraweb-sprite  first image-grid-similarColorsIcon sprites-similarProductsIcon"></span>
//             <span class="image-grid-iconText second">VIEW SIMILAR</span>
//           </ViewSimilar>
//         )}
//       </RLi>
//     </>
//   );
// };
// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [wishlistProducts, setWishlistProducts] = useState(null);
//   const location = useLocation();
//   const category = location.pathname.split("/")[1];
//   const cat = category.split("-")[1];
//   let [searchParams, setSearchParams] = useSearchParams();
//   

//   

//   const handelClick = (status) => {
//     if (!open) {
//       // document.body.classList.add("removeScroll");
//       document.body.style.overflow = "hidden";
//     } else {
//       // document.body.classList.remove("removeScroll");
//       document.body.style.overflow = "unset";
//     }
//     setOpen(!status);
//   };

//   const getWishlistProducts = async () => {
//     const res = await axios.get("http://localhost:8080/api/wishlist/");
//     
//     setWishlistProducts([
//       ...res?.data?.map((item) => {
//         return item.wishlistProduct._id;
//       }),
//     ]);
//   };

//   

//   const getProducts = async ({ params, category }) => {
//     const searchString = location.search;

//     try {
//       const res = await axios.get(
//         cat
//           ? `http://localhost:8080/api/products?category=${cat}`
//           : "http://localhost:8080/api/products"
//         // `http://localhost:8080/api/products${searchString}`
//       );

//       setProducts(res.data.products);
//       if (res) getWishlistProducts();
//       
//     } catch (err) {
//       
//     }
//   };

//   

//   return (
//     <div>
//       <Navbar />
//       <Similar open={open} handelClick={handelClick} />
//       <Main open={open}>
//         <RowBase>
//           <Breadcrumbs>
//             <BreadcrumbList>
//               <BreadcrumbListItem>Home</BreadcrumbListItem>
//               <BreadcrumbListItem>Clothing</BreadcrumbListItem>
//               <BreadcrumbListItem>men</BreadcrumbListItem>
//               <BreadcrumbListItem>Shirt</BreadcrumbListItem>
//             </BreadcrumbList>
//           </Breadcrumbs>
//         </RowBase>
//         <RowBase>
//           <TitleContainer>
//             <Header1 className="title">
//               Men T-shirt
//               <Span> - 79051 items</Span>
//             </Header1>
//           </TitleContainer>
//         </RowBase>
//         <RowBase>
//           <LeftSection>
//             <Section>
//               <LeftSectionDiv>
//                 <FilterDiv>
//                   <FilterSpan>filters</FilterSpan>
//                 </FilterDiv>
//                 <Checkbox products={products} getProducts={getProducts} />
//                 <ColorDiv>
//                   <ColorSpan>Color</ColorSpan>
//                   <Ul>
//                     <Li>
//                       <Label>
//                         <Input type="checkbox" value="Tshirts" />
//                         <ColorDisplay color={"green"}></ColorDisplay>
//                         Roadster
//                       </Label>
//                     </Li>
//                     <Li>
//                       <Label>
//                         <Input type="checkbox" value="Tshirts" />
//                         <ColorDisplay color={"limeGreen"}></ColorDisplay>
//                         WRONG
//                       </Label>
//                     </Li>
//                   </Ul>
//                 </ColorDiv>
//               </LeftSectionDiv>
//             </Section>
//           </LeftSection>
//           <RightSection>
//             <RightSectionRowBase>
//               <RSecttion>
//                 <RUl>
//                   {products?.map((product, i) => (
//                     <ProductCarousel
//                       product={product}
//                       key={i}
//                       handelClick={handelClick}
//                       open={open}
//                       wishlistProducts={wishlistProducts}
//                     />
//                   ))}
//                   <RLi></RLi>
//                   <RLi></RLi>
//                 </RUl>
//               </RSecttion>
//             </RightSectionRowBase>
//           </RightSection>
//         </RowBase>
//       </Main>
//       <Banner />
//     </div>
//   );
// };

// export default Products;
