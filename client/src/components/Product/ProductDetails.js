import React, { useEffect, useState } from "react";
import {
  TopDiv,
  Div,
  Main,
  ImageContainer,
  ImageContainer1,
  ImageContainer2,
  Img,
  DescriptionContainer,
  TitleAndPriceContainer,
  HeaderTitle,
  HeaderName,
  OverallRatingContainer,
  DiscountedPriceContainer,
  DiscountedPriceSpan,
  OriginalPriceSpan,
  PercentageOffSpan,
  TaxInfo,
  TaxInfoSpan,
  SizeContainer,
  SizeMessage,
  SelectSizeContainer,
  SelectSizeHeader,
  SelectSizeSpan,
  SelectSizeButtonWrapper,
  SelectSizeButtonContainer,
  SelectSizeButtonContainer1,
  SizeButton,
  SizeButtonText,
  NoSizeSpan,
  AddAndWhish,
  AddToBagButton,
  GoToBag,
  WishListButton,
  ReviewContainer,
  UserReviewWrapper,
  DetailedReviewContainer,
  Wrapper,
  Overlay,
  SimilarContainer,
  SimilarHeaderContainer,
  SimilarHeader,
  SimilarContent,
  Icon,
  Ul,
  Li,
  NavLink,
  Image,
  ProductMetaInfo,
  ProductHeader3,
  ProductHeader4,
  ProductPriceContainer,
  ProductDiscountedPrice,
  ProductOriginalPrice,
  ProductDiscountPercentage,
  IndexCrossLinkContainer,
  MoreProductsNavLink,
} from "./Product.styles";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
// Import Axios
import axios from "axios";
// import Icons from MaterialUI icons
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isFulfilled } from "@reduxjs/toolkit";
import { fetchProductById } from "../../redux/features/product/productSlice";
import { addItemToBag } from "../../redux/features/cart/cartSlice";
import Moment from "react-moment";
import { request } from "../../api/axios";
import LazyComponent from "../LazyComponent";
import LazyImage from "../LazyImage";
import { Blurhash } from "react-blurhash";
import BlurHashComponent from "../BlurHashComponent";
// import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const PreDefinedSize = ["S", "M", "L", "XL", "XXL"];
const SizeComponent = ({
  size,
  activeSizes,
  handelSelectSize,
  selectedSize,
  isNotSizeSelected,
}) => {
  if (activeSizes?.includes(size)) {
    return (
      <SelectSizeButtonContainer>
        <SelectSizeButtonContainer1>
          {selectedSize === size ? (
            <SizeButton
              onClick={() => handelSelectSize(size)}
              selectedSize={selectedSize}
            >
              <SizeButtonText>{size}</SizeButtonText>
            </SizeButton>
          ) : (
            <SizeButton onClick={() => handelSelectSize(size)}>
              <SizeButtonText>{size}</SizeButtonText>
            </SizeButton>
          )}
        </SelectSizeButtonContainer1>
      </SelectSizeButtonContainer>
    );
  } else {
    return (
      <SelectSizeButtonContainer>
        <SelectSizeButtonContainer1>
          <SizeButton NoSize={true}>
            <SizeButtonText>{size}</SizeButtonText>
            <NoSizeSpan></NoSizeSpan>
          </SizeButton>
        </SelectSizeButtonContainer1>
      </SelectSizeButtonContainer>
    );
  }
};

const ProductDetails = () => {
  const { isLoading, isError, productItem } = useSelector((state) => ({
    ...state.product,
  }));
  const { currentUser } = useSelector((state) => ({ ...state.user }));

  const [product, setProduct] = useState({});
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [isNotSizeSelected, setIsNotSizeSelected] = useState(false);
  const [productInWishlist, setProductInWishlist] = useState(false);
  const [reviews, SetReviews] = useState({});
  const location = useLocation();
  const id = location.pathname.split("/")[4];
  const [similarUniqueProducts, setSimilarUniqueProducts] = useState([]);
  const [productAddedToCart, setProductAddedToCart] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelSelectSize = (sizeValue) => {
    setSelectedSize(sizeValue);
    setIsNotSizeSelected(false);
    setProductAddedToCart(false);
  };

  const handelAddToWishlist = async (id) => {
    console.log("add to wishlist", id);
    if(!productInWishlist){
    if (currentUser ) {
      const res = await request.post("/wishlist/", {
        id,
      });
      if (res) setProductInWishlist(true);
    } else {
      navigate("/login");
    }
  }
  };

  const checkProductInWishlist = async (id) => {
    const res = await request.get(`/wishlist/${id}`);
    if (res) setProductInWishlist(true);
  };

  const getSimilarProducts = async (id) => {
    const response = await request.get(`/products/related/${id}`);
    if (response) {
      const arrays = [
        response?.data?.SimilarBrandProduct,
        response?.data?.SimilarCategoryProducts,
        response?.data?.SimilarColorProduct,
      ];
      const mergedArray = [].concat(...arrays.filter((arr) => arr.length > 0));

      // Shuffle the merged array using the Fisher-Yates algorithm
      for (let i = mergedArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mergedArray[i], mergedArray[j]] = [mergedArray[j], mergedArray[i]];
      }

      // Remove duplicates by converting to a Set and back to an array
      const uniqueMergedArray = mergedArray.reduce((accumulator, current) => {
        const existing = accumulator?.find(
          (item) => item?._id === current?._id
        );
        if (!existing) {
          accumulator.push(current);
        }
        return accumulator;
      }, []);
      setSimilarUniqueProducts(uniqueMergedArray);
      // setIsLoading(false)
    }
  };

  const getReview = async () => {
    const productId = id;
    const review = await request.get(`/review/product/${productId}`);
    if (review) SetReviews(review.data);
  };

  useEffect(() => {
    const getProductById = async () => {
      try {
        const action = await dispatch(fetchProductById({ id }));
        if (isFulfilled(action)) {
          checkProductInWishlist(action.payload._id);
          setProduct(action.payload);
          setSizes(action.payload.size);
          getReview();
        }
      } catch (err) {}
    };
    getSimilarProducts(id);
    getProductById();
  }, []);

  const addToCart = async (product) => {
    if (!selectedSize) {
      setIsNotSizeSelected(true);
    }
    if (!currentUser && selectedSize) {
      navigate("/login");
    } else {
      const { _id } = product;
      if (selectedSize) {
        try {
          const action = await dispatch(
            addItemToBag({
              productId: _id,
              size: selectedSize,
              toast,
            })
          ).then((response) => {
            setProductAddedToCart(true);
          });
        } catch (err) {}
      }
    }
  };

  const likeAReview = async (reviewId) => {
    currentUser &&
      (await request.put("/review/like", { reviewId }).then(() => {
        getReview();
      }));
  };

  const unLikeAReview = async (reviewId) => {
    currentUser &&
      (await request.put("/review/unlike", { reviewId }).then(() => {
        getReview();
      }));
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <ToastContainer
        style={{
          position: "absolute",
          top: "90px",
          right: "-50px",
          height: "80px",
          left: "unset",
        }}
        toastStyle={{
          backgroundColor: "#171830",
          width: "200px",
          height: "20px",
          color: "#fff",
        }}
      />

      <TopDiv>
        <Main>
          <ImageContainer>
            {product.images?.map((image, i) => (
              <ImageContainer1 key={i}>
                <ImageContainer2 key={i}>
                  {/* <LazyComponent>
                      <Img
                        data-src={image.url}
                        loading="lazy"
                        alt={image.name}
                        // style={{ width: "550px", height: "720px" }}
                      />
                    </LazyComponent> */}

                  <LazyImage
                    key={`${image?.name}-${i}`}
                    src={`${image?.url}&tr=q-70`}
                    alt={image?.name}
                    width="100%"
                    height="100%"
                    loading="lazy"
                    placeholderSrc={`${image?.url}&tr=w-50,h-50,bl-20,q-50:w-250,h-320`}
                    blurHashUrl={image?.blurHashUrl}
                  />
                </ImageContainer2>
              </ImageContainer1>
            ))}
          </ImageContainer>
          <DescriptionContainer>
            <>
              <TitleAndPriceContainer>
                <HeaderTitle>{`${product.brand}`}</HeaderTitle>
                <HeaderName>{`${product.description}`}</HeaderName>
              </TitleAndPriceContainer>
              {product.productRating > 0 && (
                <OverallRatingContainer>
                  <div class="index-overallRatingContainer">
                    <div class="index-overallRating">
                      <span>{product.productRating}</span>
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
                      {product.noOfRatings > 0 && (
                        <>
                          <span class="index-separator">|</span>
                          <span class="index-ratingsCount">
                            {`${product.noOfRatings} Ratings`}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </OverallRatingContainer>
              )}
              <Div>
                <DiscountedPriceContainer>
                  <DiscountedPriceSpan>{`₹${product.mrp}`}</DiscountedPriceSpan>

                  {product.discountPercentage > 0 ? (
                    <>
                      <OriginalPriceSpan>{`MRP ₹${product.price}`}</OriginalPriceSpan>
                      <PercentageOffSpan>{`(${product.discountPercentage}% OFF)`}</PercentageOffSpan>
                    </>
                  ) : null}

                  <TaxInfo>
                    <TaxInfoSpan>inclusive of all taxes</TaxInfoSpan>
                  </TaxInfo>
                </DiscountedPriceContainer>
              </Div>
              <SizeContainer>
                <SelectSizeContainer>
                  <SelectSizeHeader>Select Size </SelectSizeHeader>
                  <SelectSizeSpan> {`Size chat>`}</SelectSizeSpan>
                </SelectSizeContainer>
                <SizeMessage isNotSizeSelected={isNotSizeSelected}>
                  Please select a size
                </SizeMessage>
                <SelectSizeButtonWrapper isNotSizeSelected={isNotSizeSelected}>
                  {PreDefinedSize?.map((size) => (
                    <SizeComponent
                      size={size}
                      activeSizes={sizes}
                      handelSelectSize={handelSelectSize}
                      selectedSize={selectedSize}
                      isNotSizeSelected={isNotSizeSelected}
                    />
                  ))}
                </SelectSizeButtonWrapper>
              </SizeContainer>
              <AddAndWhish>
                {productAddedToCart ? (
                  <GoToBag to="/checkout/cart">
                    GO TO BAG
                    <ArrowForwardIcon style={{ margin: "0px 0px 0px 10px" }} />
                  </GoToBag>
                ) : (
                  <AddToBagButton
                    onClick={() => {
                      addToCart(product);
                      // navigate("/checkout/cart");
                    }}
                  >
                    <ShoppingBagOutlinedIcon
                      style={{ margin: "0px 10px 0px 0px" }}
                    />
                    Add To Bag
                  </AddToBagButton>
                )}

                {productInWishlist ? (
                  <WishListButton
                    onClick={() => handelAddToWishlist(product._id)}
                    productInWishlist={productInWishlist}
                  >
                    <FavoriteRoundedIcon
                      style={{
                        margin: "0px 10px 0px 0px",
                        color: "#ff3e6c",
                      }}
                    />
                    WishListed
                  </WishListButton>
                ) : (
                  <WishListButton
                    onClick={() => handelAddToWishlist(product._id)}
                    productInWishlist={productInWishlist}
                  >
                    <FavoriteBorderOutlinedIcon
                      style={{
                        margin: "0px 10px 0px 0px",
                      }}
                    />
                    WishList
                  </WishListButton>
                )}
              </AddAndWhish>
              {product?.noOfRatings > 0 && (
                <DetailedReviewContainer>
                  <div className="review-header">
                    <span>Ratings</span>
                    <span className="ugc-iconContainer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="16"
                        viewBox="0 0 20 16"
                      >
                        <g fill="none" fill-rule="evenodd">
                          <g>
                            <g>
                              <g>
                                <g>
                                  <path
                                    fill="#FFF"
                                    d="M.827 3.937L2.416.847c.149-.298.576-.294.72.006L4.816 4.32l3.81.587c.329.051.457.456.217.687L6.062 8.26l.623 3.802c.054.328-.293.576-.587.418L3.08 10.752"
                                    transform="translate(-1015 -1319) translate(824 1315) translate(191 4) translate(10 .874)"
                                  ></path>
                                  <path
                                    stroke="#282C3F"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M.827 3.937L2.416.847c.149-.298.576-.294.72.006L4.816 4.32l3.81.587c.329.051.457.456.217.687L6.062 8.26l.623 3.802c.054.328-.293.576-.587.418L3.08 10.752"
                                    transform="translate(-1015 -1319) translate(824 1315) translate(191 4) translate(10 .874)"
                                  ></path>
                                </g>
                                <path
                                  fill="#FFF"
                                  d="M7.517 2.933L9.32 6.655l4.09.629c.326.05.454.454.214.683l-2.982 2.862.667 4.08c.054.327-.29.573-.582.417L7.08 13.373 3.405 15.27c-.294.15-.635-.1-.576-.426l.73-4.07L.62 7.87c-.236-.233-.102-.634.226-.68l4.098-.567 1.858-3.694c.15-.296.572-.293.716.005"
                                  transform="translate(-1015 -1319) translate(824 1315) translate(191 4)"
                                ></path>
                                <path
                                  stroke="#282C3F"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M7.517 2.933L9.32 6.655l4.09.629c.326.05.454.454.214.683l-2.982 2.862.667 4.08c.054.327-.29.573-.582.417L7.08 13.373 3.405 15.27c-.294.15-.635-.1-.576-.426l.73-4.07L.62 7.87c-.236-.233-.102-.634.226-.68l4.098-.567 1.858-3.694c.15-.296.572-.293.716.005z"
                                  transform="translate(-1015 -1319) translate(824 1315) translate(191 4)"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </span>
                  </div>

                  <div className="index-flexRow index-margin22">
                    <div className="index-flexColumn">
                      <div className="index-flexRow index-averageRating">
                        <span>{product?.productRating}</span>
                        <span className="startIcon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            viewBox="0 0 12 12"
                          >
                            <path
                              fill="#14958f"
                              fill-rule="evenodd"
                              d="M6 9.644l2.867 1.821c.464.296.743.093.623-.45L8.724 7.56l2.581-2.657c.384-.395.25-.716-.306-.716H7.686L6.374.93c-.206-.513-.542-.512-.748 0L4.314 4.187H1.001c-.553 0-.687.324-.306.716L3.276 7.56l-.766 3.455c-.12.544.165.742.623.45L6 9.645z"
                            ></path>
                          </svg>
                        </span>
                      </div>
                      <div className="index-countDesc">
                        {product?.noOfRatings} Verified Buyers
                      </div>
                    </div>
                    <div className="index-separator"></div>
                    {reviews.allReviews?.length > 0 && (
                      <div>
                        <div className="index-flexRow index-ratingBarContainer">
                          <div className="index-rating">
                            <span className="index-ratingLevel">5</span>
                            <span className="startIcon">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="10"
                                height="10"
                                viewBox="0 0 12 12"
                              >
                                <path
                                  fill="#c5c6c9"
                                  fillRule="evenodd"
                                  d="M6 9.644l2.867 1.821c.464.296.743.093.623-.45L8.724 7.56l2.581-2.657c.384-.395.25-.716-.306-.716H7.686L6.374.93c-.206-.513-.542-.512-.748 0L4.314 4.187H1.001c-.553 0-.687.324-.306.716L3.276 7.56l-.766 3.455c-.12.544.165.742.623.45L6 9.645z"
                                ></path>
                              </svg>
                            </span>
                          </div>
                          <progress
                            min="0"
                            max={reviews?.allReviews?.length}
                            value={
                              reviews?.ratingOccurrence[5]
                                ? reviews?.ratingOccurrence[5]
                                : "0"
                            }
                            data-rating="5"
                          ></progress>
                          <div className="index-count">
                            {reviews?.ratingOccurrence[5]}
                          </div>
                        </div>
                        <div className="index-flexRow index-ratingBarContainer">
                          <div className="index-rating">
                            <span className="index-ratingLevel">4</span>
                            <span className="startIcon">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="10"
                                height="10"
                                viewBox="0 0 12 12"
                              >
                                <path
                                  fill="#c5c6c9"
                                  fillRule="evenodd"
                                  d="M6 9.644l2.867 1.821c.464.296.743.093.623-.45L8.724 7.56l2.581-2.657c.384-.395.25-.716-.306-.716H7.686L6.374.93c-.206-.513-.542-.512-.748 0L4.314 4.187H1.001c-.553 0-.687.324-.306.716L3.276 7.56l-.766 3.455c-.12.544.165.742.623.45L6 9.645z"
                                ></path>
                              </svg>
                            </span>
                          </div>
                          <progress
                            min="0"
                            max={reviews?.allReviews?.length}
                            value={reviews?.ratingOccurrence[4]}
                            data-rating="4"
                          ></progress>
                          <div className="index-count">
                            {reviews?.ratingOccurrence[4]}
                          </div>
                        </div>
                        <div className="index-flexRow index-ratingBarContainer">
                          <div className="index-rating">
                            <span className="index-ratingLevel">3</span>
                            <span className="startIcon">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="10"
                                height="10"
                                viewBox="0 0 12 12"
                              >
                                <path
                                  fill="#c5c6c9"
                                  fillRule="evenodd"
                                  d="M6 9.644l2.867 1.821c.464.296.743.093.623-.45L8.724 7.56l2.581-2.657c.384-.395.25-.716-.306-.716H7.686L6.374.93c-.206-.513-.542-.512-.748 0L4.314 4.187H1.001c-.553 0-.687.324-.306.716L3.276 7.56l-.766 3.455c-.12.544.165.742.623.45L6 9.645z"
                                ></path>
                              </svg>
                            </span>
                          </div>
                          <progress
                            min="0"
                            max={reviews?.allReviews?.length}
                            value={reviews?.ratingOccurrence[3]}
                            data-rating="3"
                          ></progress>
                          <div class="index-count">
                            {reviews?.ratingOccurrence[3]}
                          </div>
                        </div>
                        <div className="index-flexRow index-ratingBarContainer">
                          <div className="index-rating">
                            <span className="index-ratingLevel">2</span>
                            <span className="startIcon">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="10"
                                height="10"
                                viewBox="0 0 12 12"
                              >
                                <path
                                  fill="#c5c6c9"
                                  fillRule="evenodd"
                                  d="M6 9.644l2.867 1.821c.464.296.743.093.623-.45L8.724 7.56l2.581-2.657c.384-.395.25-.716-.306-.716H7.686L6.374.93c-.206-.513-.542-.512-.748 0L4.314 4.187H1.001c-.553 0-.687.324-.306.716L3.276 7.56l-.766 3.455c-.12.544.165.742.623.45L6 9.645z"
                                ></path>
                              </svg>
                            </span>
                          </div>
                          <progress
                            min="0"
                            max={reviews?.allReviews?.length}
                            value={reviews?.ratingOccurrence[2]}
                            data-rating="2"
                          ></progress>
                          <div class="index-count">
                            {reviews?.ratingOccurrence[2]}
                          </div>
                        </div>
                        <div className="index-flexRow index-ratingBarContainer">
                          <div className="index-rating">
                            <span className="index-ratingLevel">1</span>
                            <span className="startIcon">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="10"
                                height="10"
                                viewBox="0 0 12 12"
                              >
                                <path
                                  fill="#c5c6c9"
                                  fillRule="evenodd"
                                  d="M6 9.644l2.867 1.821c.464.296.743.093.623-.45L8.724 7.56l2.581-2.657c.384-.395.25-.716-.306-.716H7.686L6.374.93c-.206-.513-.542-.512-.748 0L4.314 4.187H1.001c-.553 0-.687.324-.306.716L3.276 7.56l-.766 3.455c-.12.544.165.742.623.45L6 9.645z"
                                ></path>
                              </svg>
                            </span>
                          </div>
                          <progress
                            min="0"
                            max={reviews?.allReviews?.length}
                            value={reviews?.ratingOccurrence[1]}
                            data-rating="1"
                          ></progress>
                          <div className="index-count">
                            {reviews?.ratingOccurrence[1]}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </DetailedReviewContainer>
              )}

              <ReviewContainer>
                {reviews?.allReviews?.slice(0, 15).map((review) => (
                  <>
                    {review.comment ? (
                      <UserReviewWrapper>
                        <div className="user-review-main user-review-showRating">
                          <div className="user-review-starWrapper">
                            <span
                              data-rating={review.rating}
                              className="user-review-starRating"
                            >
                              {review.rating}
                              <span className="user-review-starIcon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="10"
                                  height="10"
                                  viewBox="0 0 12 12"
                                >
                                  <path
                                    fill="#FFF"
                                    fill-rule="evenodd"
                                    d="M6 9.644l2.867 1.821c.464.296.743.093.623-.45L8.724 7.56l2.581-2.657c.384-.395.25-.716-.306-.716H7.686L6.374.93c-.206-.513-.542-.512-.748 0L4.314 4.187H1.001c-.553 0-.687.324-.306.716L3.276 7.56l-.766 3.455c-.12.544.165.742.623.45L6 9.645z"
                                  ></path>
                                </svg>
                              </span>
                            </span>
                          </div>
                          <div className="user-review-reviewTextWrapper">
                            {review.comment}
                          </div>
                        </div>
                        <div className="user-review-footer user-review-showRating">
                          <div className="user-review-left">
                            <span>{review?.user?.name}</span>
                            <span>
                              <Moment format="D MMM yyyy">
                                {review?.updatedAt}
                              </Moment>
                            </span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <div className="user-review-thumb">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="14"
                                viewBox="0 0 15 14"
                                className="user-review-thumbIcon user-review-thumbsDown user-review-rotate180"
                                onClick={
                                  !(
                                    review?.like?.includes(currentUser?._id) ||
                                    review?.unlike?.includes(currentUser?._id)
                                  )
                                    ? () => likeAReview(review?._id)
                                    : null
                                }
                              >
                                <g fill="none" fillRule="evenodd">
                                  <path d="M-5-8h24v24H-5z"></path>
                                  <path
                                    fill={
                                      review?.like?.includes(currentUser?._id)
                                        ? "#f16565"
                                        : "#535766"
                                    }
                                    fillRule="nonzero"
                                    d="M1.032.383H2.9c.307 0 .593.127.769.34C4.04.276 4.612 0 5.27 0h6.391c1.405 0 2.306.723 2.481 1.955L15 7.184v.127c0 1.106-.922 2.02-2.086 2.02H9.663v2.252c0 .957-.285 1.637-.856 2.04-.9.638-2.13.277-2.174.256l-.264-.085V11.01c0-1.998-2.394-2.678-2.482-2.7l-.197-.042a1.022 1.022 0 01-.813.382H1.01A.992.992 0 010 7.673V1.382a1.029 1.029 0 011.032-1zM7.162 11v2.246c.327.042.873.085 1.265-.212.37-.254.545-.742.545-1.462V8.606h3.948c.741 0 1.33-.593 1.33-1.293v-.042l-.85-5.19v-.022c-.11-.89-.698-1.335-1.723-1.335H5.33C4.59.724 4 1.317 4 2.017v5.55l.174.043c.11.042 2.988.848 2.988 3.39zM.75 7.693c0 .147.135.273.293.273h1.914c.158 0 .293-.126.293-.273V1.48c0-.147-.135-.273-.293-.273H1.043c-.158 0-.293.126-.293.273v6.213z"
                                  ></path>
                                </g>
                              </svg>
                              {review?.like?.length}
                            </div>
                            <div className="user-review-thumb">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="14"
                                viewBox="0 0 15 14"
                                className="user-review-thumbIcon"
                                onClick={
                                  !(
                                    review?.like?.includes(currentUser?._id) ||
                                    review?.unlike?.includes(currentUser?._id)
                                  )
                                    ? () => unLikeAReview(review?._id)
                                    : null
                                }
                              >
                                <g fill="none" fillRule="evenodd">
                                  <path d="M-5-8h24v24H-5z"></path>
                                  <path
                                    fill={
                                      review?.unlike?.includes(currentUser?._id)
                                        ? "#f16565"
                                        : "#535766"
                                    }
                                    fillRule="nonzero"
                                    d="M1.032.383H2.9c.307 0 .593.127.769.34C4.04.276 4.612 0 5.27 0h6.391c1.405 0 2.306.723 2.481 1.955L15 7.184v.127c0 1.106-.922 2.02-2.086 2.02H9.663v2.252c0 .957-.285 1.637-.856 2.04-.9.638-2.13.277-2.174.256l-.264-.085V11.01c0-1.998-2.394-2.678-2.482-2.7l-.197-.042a1.022 1.022 0 01-.813.382H1.01A.992.992 0 010 7.673V1.382a1.029 1.029 0 011.032-1zM7.162 11v2.246c.327.042.873.085 1.265-.212.37-.254.545-.742.545-1.462V8.606h3.948c.741 0 1.33-.593 1.33-1.293v-.042l-.85-5.19v-.022c-.11-.89-.698-1.335-1.723-1.335H5.33C4.59.724 4 1.317 4 2.017v5.55l.174.043c.11.042 2.988.848 2.988 3.39zM.75 7.693c0 .147.135.273.293.273h1.914c.158 0 .293-.126.293-.273V1.48c0-.147-.135-.273-.293-.273H1.043c-.158 0-.293.126-.293.273v6.213z"
                                  ></path>
                                </g>
                              </svg>
                              {review?.unlike?.length}
                            </div>
                          </div>
                        </div>
                      </UserReviewWrapper>
                    ) : null}
                  </>
                ))}
              </ReviewContainer>
            </>
          </DescriptionContainer>
        </Main>
        <Wrapper>
          <h3 className="similar-heading">SIMILAR PRODUCTS</h3>
          <Ul>
            {similarUniqueProducts?.slice(0, 13)?.map((product, i) => (
              <Li key={i}>
                <NavLink
                  target="_blank"
                  to={`/${product?.gender.toLowerCase()}/${product?.brand
                    .replaceAll(" ", "-")
                    .toLowerCase()}/${product?.description
                    .replaceAll(" ", "-")
                    .toLowerCase()}/${product?._id}/buy`}
                >
                  <div className="image-Container">
                    {/* <Image src={product.images[0]?.url} /> */}
                    <LazyImage
                      key={`${product.images[0]?.name}-${i}`}
                      src={`${product.images[0]?.url}&tr=q-70`}
                      alt={product.images[0]?.name}
                      width="100%"
                      height="100%"
                      loading="lazy"
                      placeholderSrc={`${product.images[0]?.url}&tr=w-50,h-50,bl-20,q-50:w-250,h-320`}
                      blurHashUrl={product.images[0]?.blurHashUrl}
                    />
                  </div>
                  <ProductMetaInfo>
                    <ProductHeader3>{product.brand}</ProductHeader3>
                    <ProductHeader4>{product.Desc}</ProductHeader4>
                    <ProductPriceContainer>
                      <span>
                        <ProductDiscountedPrice>
                          {`Rs. ${Math.floor(
                            product.price -
                              product.price * (product.discountPercentage / 100)
                          )}`}
                        </ProductDiscountedPrice>
                        <ProductOriginalPrice>
                          {product.price}
                        </ProductOriginalPrice>
                      </span>
                      <ProductDiscountPercentage>
                        {`(${product.discountPercentage}%OFF)`}
                      </ProductDiscountPercentage>
                    </ProductPriceContainer>
                  </ProductMetaInfo>
                </NavLink>
              </Li>
            ))}
          </Ul>
          <IndexCrossLinkContainer>
            <MoreProductsNavLink
              to={`/${product?.categories?.namepath}?brand=${encodeURIComponent(
                product?.brand
              )}`}
            >
              <div>
                {`More ${product?.categories?.name}  by ${product?.brand}`}{" "}
                <span class="index-arrow"></span>
              </div>
            </MoreProductsNavLink>
            <MoreProductsNavLink
              to={`/${
                product?.categories?.namepath
              }?colors=${encodeURIComponent(product?.color)}`}
            >
              <div>
                {`More ${product?.color} ${product?.categories?.name}`}{" "}
                <span class="index-arrow"></span>
              </div>
            </MoreProductsNavLink>
            <MoreProductsNavLink to={`/${product?.categories?.namepath}`}>
              <div>
                {`More ${product?.categories?.name}`}{" "}
                <span class="index-arrow"></span>
              </div>
            </MoreProductsNavLink>
          </IndexCrossLinkContainer>
        </Wrapper>
      </TopDiv>
      <Footer />
    </>
  );
};

export default ProductDetails;
