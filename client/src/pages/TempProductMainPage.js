import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar/Navbar";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Banner from "../components/Banner/Banner";
import axios from "axios";
import Similar from "../components/ViewSimilar/Similar";
import Checkbox from "./Checkbox";
// import Carousel from "nuka-carousel";
import { Swiper, SwiperSlide } from "swiper/react";
import FavoriteIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { request } from "../api/axios";

// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// import required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";

const Main = styled.div`
  margin: 0 auto;
  max-width: 1600px;
`;

const RowBase = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
  box-sizing: content-box;
`;

const Breadcrumbs = styled.div`
  vertical-align: top;
  padding: 20px 0 0;
`;
const BreadcrumbList = styled.ul`
  font-size: 14px;
  overflow: hidden;
  display: inline-block;
  margin: 0 0 0 25px;
  vertical-align: top;
  padding: 0;
`;
const BreadcrumbListItem = styled.li`
  text-decoration: none;
  list-style: none;
  font-size: 14px;
  /* display: inline-block; */
  float: left;
  margin-right: 5px;
  text-transform: capitalize;
  line-height: 1;

  &::after {
    font-size: 14px;
    content: "/";
    margin-left: 5px;
    color: #282c3f;
  }
`;
const TitleContainer = styled.div`
  margin: 10px 0 5px 25px;
  display: flex;
  align-items: center;
  max-width: 1000px;
  overflow: hidden;
`;

const Header1 = styled.h1`
  font-family: Whitney Semibold;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: #282c3f;
  max-width: 400px;
  text-transform: capitalize;
  display: inline-block;
  font-size: 16px;
  margin: 0;
`;
const Span = styled.span`
  color: #878b94;
  font-weight: 500;
  display: block;
  white-space: pre-wrap;
  font-family: Whitney;
  display: inline-block;
  font-size: 16px;
  margin: 0;
`;
const LeftSection = styled.div`
  min-width: 252px;
  max-width: 252px;
  flex-grow: 0 !important;
  align-self: flex-start;
  flex-wrap: wrap;
  flex-direction: column;
  flex: 1;
  font-family: Whitney Semibold;
`;
const Section = styled.section`
  /* width: 100%; */
`;
const LeftSectionDiv = styled.div`
  box-sizing: border-box;
  position: static;
  box-sizing: border-box;
  transition: margin 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  margin-top: 0;
  padding-top: 23px;
`;
const FilterDiv = styled.div`
  text-align: start;
  position: relative;
  border-right: none !important;
  padding: 0 0 15px 25px;
  border-bottom: 1px solid #e9e9ed;
`;
const FilterSpan = styled.span`
  text-transform: uppercase;
  font-weight: 500;
`;
const CategoriesDiv = styled(FilterDiv)`
  padding: 20px 0 15px 25px;
`;
const CategoriesSpan = styled.span`
  font-weight: 500;
  text-transform: uppercase;
  font-size: 14px;
  margin: 0 0 18px;
  clear: both;
  color: #282c3f;
  display: block;
`;
const Ul = styled.ul`
  font-weight: 400;
  margin: 0;
  padding: 0;
  list-style: none;
`;
const Li = styled.li``;
const Input = styled.input`
  margin: 0 16px 0 0;
`;
const Label = styled.label`
  display: block;
  width: 95%;
  white-space: nowrap;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 20px;
  color: #282c3f;
  font-family: Whitney Book;
  font-size: 14px;
`;

const BrandDiv = styled(CategoriesDiv)``;
const BrandSpan = styled(CategoriesSpan)``;
const ColorDiv = styled(CategoriesDiv)``;
const ColorSpan = styled(CategoriesSpan)``;
const ColorDisplay = styled.span`
  display: inline-block;
  width: 15px;
  height: 15px;
  background: ${({ color }) => (color ? color : "#ffffff")};
  border-radius: 50%;
  margin-right: 10px;
`;
const RightSection = styled.div`
  padding: 0px;
  flex: 1 1 0%;
`;
const RSecttion = styled.div`
  width: 100%;
  /* overflow: hidden;
  overflow-y: scroll;
  height: 100%; */
`;

const RightSectionRowBase = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  /* align-items: stretch;
  align-content: stretch; */
  padding-top: 24px;
  padding-left: 15px;
  padding-right: 20px;
  /* background-color: red; */
`;
const RUl = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* align-items: stretch;
  align-content: stretch; */
  margin: 0 -10px 0 3px;
  width: 100%;
  justify-content: space-between;
  padding: 0px;
  list-style: none;
`;

const RLi = styled.li`
  width: 210px;
  height: 360px;
  position: relative;
  text-align: left;
  vertical-align: top;
  overflow: hidden;
  display: inline-block;
  box-sizing: border-box;
  margin: 0 10px 30px;
  cursor: pointer;

  /* &hover .wishlistContainer {
    display: block;
    height: 50px;
  } */

  &:hover {
    box-shadow: 0 2px 16px 4px rgb(40 44 63 / 7%);
  }
`;
const NavLink = styled(Link)`
  display: block;
  text-decoration: none;
`;
const ImageSliderContainer = styled.div`
  position: relative;
  width: 210px;
  height: 280px;
  /* background-color: white; */
`;
const ProductSliderContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: block;
`;
const SwiperCarousel = styled(Swiper)`
  .swiper-horizontal > .swiper-pagination-bullets,
  .swiper-pagination-bullets.swiper-pagination-horizontal,
  .swiper-pagination-custom,
  .swiper-pagination-fraction {
    bottom: 15px;
    left: 0;
    width: 100%;
  }

  .swiper-pagination {
    z-index: 3;
    position: absolute;
    top: 278px;
    height: 30px;
    padding-bottom: 20px;
    left: 0;
    text-align: center;
    background-color: #fff;
    transform: ${({ isHover }) =>
      isHover ? "translateY(-20px)" : "translateY(10px)"};
    transition: transform 0.2s ease-in-out;
  }

  .swiper-pagination-bullet {
    background: #d4d5d9;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    opacity: 1;
  }

  .swiper-pagination-bullet-active {
    background-color: #ff3f6c;
    width: 5px;
    height: 5px;
    border-radius: 50%;
  }
`;
const Image = styled.img`
  background-color: #f5f5f5;

  width: 210px;
  height: 280px;
`;

const ViewSimilar = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 5;
  top: 215px;
  right: 14px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid #dadade;
  transition: all 0.2s ease-in-out;
  border-radius: 50%;
  text-align: center;
  will-change: contents;
  background-color: #ffffff;
  color: #000;
  font-size: 12px;
  line-height: 28px;

  .myntraweb-sprite {
    background: url(https://constant.myntassets.com/web/assets/img/MyntraWebSprite_27_01_2021.png);
    background-size: 1404px 105px;
    display: inline-block;
  }
  span,
  .first {
    background-size: 6000% 486.36%;
    background-position: 10.4% 71%;
    width: 20px;
    height: 20px;
  }
  .image-grid-similarColorsIcon {
    vertical-align: middle;
    text-align: center;
  }
  .image-grid-iconText {
    font-weight: 500;
    color: #ff517b;
    vertical-align: middle;
    visibility: hidden;
    margin-left: 5px;
    font-size: 14px;
  }
  .second {
    font-size: 12px;
    margin-top: 0 !important;
    margin-left: 5px !important;
  }
  &:hover {
    border-radius: 42px;
    width: 120px;
    text-align: left;
    padding-left: 13px;
    transition: width 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);

    .image-grid-iconText {
      font-weight: 700;
      color: #ff517b;
      vertical-align: middle;
      visibility: visible;
      margin-left: 10px;
      font-size: 12px;
    }
  }
`;
const WishlistContainer = styled.div`
  color: black;
  display: block;
  position: absolute;
  z-index: 5;
  left: 0;
  top: 275px;
  background: #fff;
  width: 100%;
  height: 40px;
  padding: 0px 10px;
  box-sizing: border-box;
  cursor: default;
  transition: all 0.2s ease-in-out;
`;
const WishListDivWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 0px;
  margin: 5px 0px 0px 0px;
  font-size: 12px;
  border: 1px solid #d4d5d9;
  border-radius: 2px;
  background: red;
  transition: transform 0.2s ease-in-out;
  color: ${({ isWishlist }) => (isWishlist ? "#FFF" : "#282c3f")};
  background-color: ${({ isWishlist }) =>
    isWishlist ? "rgb(83, 87, 102)" : "#fff"};

  &:hover {
    cursor: pointer;
    border: ${({ isWishlist }) =>
      isWishlist ? "1px solid #d4d5d9" : "1px solid #535766"};
  }
`;
const WishlistSpan = styled.span`
  text-align: center;
  text-transform: uppercase;
  font-family: "Assistant";
  font-weight: 700;
  margin-left: 5px;
  letter-spacing: 0.3px;
  font-size: 12px;
  z-index: 1000;
`;

const RatingContainer = styled.div`
  font-family: "Assistant";
  z-index: 2;
  position: absolute;
  left: 10px;
  top: 255px;
  color: #000;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  border-radius: 2px;
  padding: 0 0 0 4px;
  background-color: hsla(0, 0%, 100%, 0.8);
  /* .user-review-starIcon {
    background-color: #72bfbc;
  } */
  span {
    margin-right: 4px;
  }
  .product-ratingsCount {
    display: flex;
    padding-right: 4px;
  }
  .startIcon {
    margin: 2px 5px 0 0;
  }
  .product-separator {
    font-size: 10px;
    margin: 1px 5px 0 -2px;
  }
`;
const ProductMetaInfo = styled.div`
  position: relative;
  z-index: 3;
  background: #fff;
  padding: 0 10px;
  padding-top: 10px;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
`;

const ProductSizeContainer = styled.h4`
  font-family: Whitney book;
  font-size: 14px;
  color: #535665;
  line-height: 1;
  display: ${({ isHover }) => (isHover ? "block" : "none")};
  margin-top: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0;
  margin-bottom: 5px;
  font-weight: 400;
`;
const ProductHeader3 = styled.h3`
  font-family: Whitney Semibold;
  font-size: 16px;
  font-weight: 500;
  line-height: 1;
  color: #282c3f;
  margin-top: 0;
  text-transform: capitalize;
  margin-bottom: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  opacity: ${({ isHover }) => (isHover ? "0" : "1")};
`;
const ProductHeader4 = styled.h4`
  color: #535766;
  font-family: Whitney Book;
  font-size: 14px;
  line-height: 1;
  margin-bottom: 0;
  margin-top: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 400;
  display: ${({ isHover }) => (isHover ? "none" : "block")};
`;

const ProductPriceContainer = styled.div`
  font-family: Whitney;
  font-size: 16px;
  line-height: 15px;
  margin: 10px 0 6px;
  white-space: nowrap;
  font-size: 14px;
  color: #282c3f;
  font-weight: 500;
`;
const ProductDiscountedPrice = styled.span`
  font-size: 14px;
  font-family: Whitney Semibold;
  font-size: 16px;
  color: #282c3f;
  font-weight: 500;
`;
const ProductOriginalPrice = styled.span`
  text-decoration: line-through;
  color: #7e818c;
  font-weight: 400;
  margin-left: 5px;
  font-size: 12px;
`;
const ProductDiscountPercentage = styled.span`
  color: #ff905a;
  font-family: Whitney Light;
  font-weight: 500;
  font-size: 12px;
  margin-left: 5px;
`;

const ProductCarousel = ({ product, open, handelClick, wishlistProducts }) => {
  const [isHover, setHover] = useState(false);
  const [isWishlist, setWishlist] = useState(false);
  const swiperRef = React.useRef([]);
  const onInit = function (Swiper) {
    swiperRef.current = Swiper;
  };

  const handelAddToWishlist = async (id) => {
    const res = await request.post("http://localhost:8080/api/wishlist/", {
      id,
    });
    if (res) setWishlist(true);
  };

  const handleMouseEnter = () => {
    if (wishlistProducts?.includes(product._id)) {
      setWishlist(true);
    }
    if (swiperRef.current) {
      setHover(true);
      swiperRef.current.autoplay.start();
    }
  };
  const handleMouseLeave = () => {
    if (swiperRef.current) {
      setHover(false);
      swiperRef.current.autoplay.stop();
      swiperRef.current.slideTo(1);
    }
  };
  // useEffect(() => {
  //   if (wishlistProducts && wishlistProducts?.includes(product._id)) {
  //     console.log("Product exist in wishlist");
  //     // setWishlist(true);
  //   }
  // });

  useEffect(() => {
    // swiperRef.current.autoplay.stop();
    // console.log(Swiper);
    swiperRef.current.params.autoplay.delay = 2000;
  }, []);

  return (
    <>
      {/* <Similar open={open} handelClick={handelClick} /> */}
      <RLi
        key={product.id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <NavLink
          target="_blank"
          to={`/${product.gender.toLowerCase()}/${product.brand
            .replaceAll(" ", "-")
            .toLowerCase()}/${product.description
            .replaceAll(" ", "-")
            .toLowerCase()}/${product._id}/buy`}
        >
          <SwiperCarousel
            initialSlide={0}
            speed={400}
            onInit={onInit}
            spaceBetween={0}
            centeredSlides={true}
            pagination={{
              clickable: true,
            }}
            loop={true}
            modules={[Autoplay, Pagination]}
            isHover={isHover}
          >
            <ImageSliderContainer>
              <ProductSliderContainer>
                {product.images.map((image, i) => (
                  <SwiperSlide key={i}>
                    <Image src={image} loading="lazy" />
                  </SwiperSlide>
                ))}
              </ProductSliderContainer>
            </ImageSliderContainer>

            {product?.productRating > 0 && (
              <RatingContainer>
                <span>{product?.productRating}</span>
                <span className="startIcon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                  >
                    <path
                      fill="#14958f"
                      fill-rule="evenodd"
                      d="M6 9.644l2.867 1.821c.464.296.743.093.623-.45L8.724 7.56l2.581-2.657c.384-.395.25-.716-.306-.716H7.686L6.374.93c-.206-.513-.542-.512-.748 0L4.314 4.187H1.001c-.553 0-.687.324-.306.716L3.276 7.56l-.766 3.455c-.12.544.165.742.623.45L6 9.645z"
                    ></path>
                  </svg>
                </span>
                {product?.noOfRatings > 0 && (
                  <div class="product-ratingsCount">
                    <div class="product-separator">|</div>
                    {product?.noOfRatings}
                  </div>
                )}
              </RatingContainer>
            )}
            <ProductMetaInfo>
              <ProductHeader3 isHover={isHover}>{product.brand}</ProductHeader3>
              <ProductHeader4 isHover={isHover}>
                {product.description}
              </ProductHeader4>
              <ProductSizeContainer isHover={isHover}>
                Size :
                {product.size?.map((size, index) => (
                  <span key={index} style={{ color: `#535665` }}>
                    {(index ? ", " : "") + ` ${size}`}
                  </span>
                ))}
              </ProductSizeContainer>
              <ProductPriceContainer>
                <span>
                  <ProductDiscountedPrice>
                    {`Rs. ${Math.floor(
                      product.price -
                        product.price * (product.discountPercentage / 100)
                    )}`}
                  </ProductDiscountedPrice>
                  <ProductOriginalPrice>{`Rs.${product.price}`}</ProductOriginalPrice>
                </span>
                <ProductDiscountPercentage>
                  {`(${product.discountPercentage}%OFF)`}
                </ProductDiscountPercentage>
              </ProductPriceContainer>
            </ProductMetaInfo>
          </SwiperCarousel>
        </NavLink>

        {isHover ? (
          <WishlistContainer isHover={isHover} className="wishlistContainer">
            <WishListDivWrapper
              isHover={isHover}
              onClick={() => handelAddToWishlist(product._id)}
              isWishlist={isWishlist}
            >
              {isWishlist ? (
                <FavoriteRoundedIcon
                  style={{
                    fontSize: "20px",
                    color: "red",
                  }}
                />
              ) : (
                <FavoriteIcon
                  style={{
                    fontSize: "20px",
                  }}
                />
              )}
              <WishlistSpan>
                {isWishlist ? `wishlisted` : `wishlist`}
              </WishlistSpan>
            </WishListDivWrapper>
          </WishlistContainer>
        ) : null}
        {
          <ViewSimilar onClick={() => handelClick(open)}>
            <span className="myntraweb-sprite  first image-grid-similarColorsIcon sprites-similarProductsIcon"></span>
            <span className="image-grid-iconText second">VIEW SIMILAR</span>
          </ViewSimilar>
        }
      </RLi>
    </>
  );
};

const TempProductMainPage = ({
  products,
  wishlistProducts,
  handelClick,
  open,
}) => {
  //   const [products, setProducts] = useState([]);
  //   const [open, setOpen] = useState(false);
  //   const [wishlistProducts, setWishlistProducts] = useState(null);
  //   const location = useLocation();
  //   const category = location.pathname.split("/")[1];
  //   const cat = category.split("-")[1];
  let [searchParams, setSearchParams] = useSearchParams();
  //   console.log("category", category, cat);

  //   console.log("Location.........", location);

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
  //     console.log("result", res);
  //     setWishlistProducts([
  //       ...res?.data?.map((item) => {
  //         return item.wishlistProduct._id;
  //       }),
  //     ]);
  //   };

  //   console.log("seWishik", wishlistProducts);

  //   const getProducts = async ({ params, category }) => {
  //     const searchString = location.search;

  //     try {
  //       const res = await axios.get(
  //         cat? `http://localhost:8080/api/products?category=${cat}`
  //           : "http://localhost:8080/api/products"
  //         // `http://localhost:8080/api/products${searchString}`
  //       );

  //       setProducts(res.data.products);
  //       if (res) getWishlistProducts();
  //       console.log(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  console.log("open Status", open);

  return (
    <div>
      <RUl>
        {products?.map((product, i) => (
          <ProductCarousel
            product={product}
            key={i}
            handelClick={handelClick}
            open={open}
            wishlistProducts={wishlistProducts}
          />
        ))}
        <RLi></RLi>
        <RLi></RLi>
      </RUl>
    </div>
  );
};

export default TempProductMainPage;
