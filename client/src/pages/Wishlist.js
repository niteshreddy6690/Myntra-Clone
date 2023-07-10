import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  fetchWishListItems,
  removeWishListItems,
  removeWishListItemWithOutNotify,
} from "../redux/features/wishlist/wishlistSlice";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isFulfilled } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import { request } from "../api/axios";
import Navbar from "../components/Navbar/Navbar";
import LazyComponent from "../components/LazyComponent";

import { Blurhash } from "react-blurhash";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/black-and-white.css";
import "react-lazy-load-image-component/src/effects/opacity.css";

const Layout = styled.div`
  width: 100%;
  /* padding: 0px 45px; */
  display: flex;
  justify-content: center;
  /* align-items: center; */
`;

const Container = styled.div`
  padding: 0 40px;
  max-width: 1400px;
  min-width: 780px;
  margin-top: 40px;
  /* margin: 60px auto 0; */
`;
const Header = styled.div`
  font-size: 20px;
  font-family: "Whitney Semibold";
  margin: auto;
`;
const ProductContainer = styled.div`
  padding: 0px;
`;

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0;
  margin-left: 40px;
`;

const Li = styled.li`
  background-color: #fff;
  transition: all 2s ease;
  padding: 0 0 14px;
  flex: 1 0 210px;
  box-sizing: border-box;
  margin: 20px 40px 0 0px;
  outline: 1px solid #e9e9eb;
  position: relative;
  height: 425px;
  max-width: 220px;
  overflow: hidden;
  position: relative;

  .itemdetails-itemPricing {
    width: 100%;
    text-align: center;
    /* padding: 0px 25px; */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .itemdetails-boldFont {
    font-weight: 700;
    padding: 0 3px 0 0;
    font-size: 16px;
    color: #282c3f;
  }
  .itemdetails-strike {
    text-decoration: line-through;
    opacity: 0.7;
    font-size: 12px;
    padding: 0 3px;
    color: #282c3f;
  }
  .itemdetails-discountPercent {
    color: #ff905a;
    padding: 0 3px;
    font-size: 12px;
    font-weight: 700;
  }
  .itemcard-removeIcon {
    position: absolute;
    right: 10px;
    top: 10px;
    border-radius: 20px;
    height: 24px;
    width: 24px;
    background-color: hsla(0, 0%, 100%, 0.6);
    border: 1.2px solid #d4d5d9;
    cursor: pointer;
    text-align: center;
  }
  .sprites-remove {
    width: 20px;
    height: 20px;
  }
  .itemcard-removeMark {
    margin-top: 5px;
    margin-left: 0px;
    zoom: 0.8;
  }
`;

const ImageCard = styled.img`
  width: 100%;
  cursor: pointer;
  height: 284px;
  transition: all 2s ease;
  transition: all 2s ease;
  opacity: 1;
`;
const ProductInfo = styled.div`
  height: 85px;
  font-size: 14px;
  text-align: left;
  color: #696b79;
  padding: 10px 10px 0;
  border: none !important;
  border-bottom: 1px solid #e9e9eb !important;
`;
const ProductTitle = styled.p`
  font-family: Whitney Book;
  font-size: 16px;
  line-height: 1;
  margin-bottom: 0;
  margin-top: 0;
  overflow: hidden;
  letter-spacing: 0.02em;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
  color: #282c3f;
  padding: 15px 10px;
`;

const ActionDiv = styled.div`
  text-align: center;
  font-size: 14px;
  padding-top: 12px;
  cursor: pointer;
`;
const MoveToBag = styled.div`
  color: #ff3e6c;
  font-family: Whitney Semibold;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 0.2px;
`;
const ShowSimilar = styled.div`
  color: #ff3e6c;
  font-family: Whitney Semibold;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 0.2px;
`;

const Wishlist = () => {
  const { isLoading, isError, wishListItems } = useSelector((state) => ({
    ...state.wishlist,
  }));
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const dispatch = useDispatch();
  const imgRef = useRef(null);
  const CallApi = async () => {
    const action = await dispatch(fetchWishListItems());
    console.log("res", action);
    if (isFulfilled(action)) {
      console.log("isFullfilled", isFulfilled(action));
      setWishlistProducts(action.payload);
    }

    // const res = await axios.get("http://localhost:8080/api/wishlist/");
    // console.log("result", res);
  };
  const handelDelete = async (id) => {
    console.log("deleteId", id);
    const action = await dispatch(removeWishListItems({ id, toast }));
    //axios.delete(
    //   `http://localhost:8080/api/wishlist/${id}`
    // );

    if (isFulfilled(action)) {
      console.log("isFullfilled", isFulfilled(action));
      // setWishlistProducts(action.payload);
      CallApi();
    }

    // console.log("remove", res);
    // if (res) {
    //   CallApi();
    // }
  };
  const handleDeleteWithoutNotify = async (id) => {
    const action = await dispatch(removeWishListItemWithOutNotify({ id }));
    if (isFulfilled(action)) {
      console.log("isFullfilled", isFulfilled(action));
      // setWishlistProducts(action.payload);
      CallApi();
    }
  };
  const handelMoveToBag = async (pid, id) => {
    const cartProduct = await request.post(`carts/`, {
      productId: pid,
      size: "M",
    });
    if (cartProduct) {
      handleDeleteWithoutNotify(id);
    }
  };

  // useEffect(() => {
  //   if (wishListItems) setWishlistProducts(wishListItems);
  // }, [wishListItems]);
  useEffect(() => {
    CallApi();
  }, []);

  return (
    <Layout>
      <Navbar />
      <ToastContainer
        style={{ position: "absolute", top: "10px", right: "0px" }}
        toastStyle={{
          backgroundColor: "#171830",
          width: "250px",
          height: "20px",
          color: "white",
          zIndex: "100",
        }}
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Container>
          <Header>{`My Wishlist ${wishlistProducts.length} items`}</Header>
          <ProductContainer>
            <Ul>
              {wishlistProducts.map((item, i) => (
                <Li key={i}>
                  <div
                    className="itemcard-removeIcon"
                    onClick={() => {
                      handelDelete(item._id);
                    }}
                  >
                    <CloseRoundedIcon className="sprites-remove itemcard-removeMark" />
                  </div>
                  <Link
                    target="_blank"
                    to={`/${item?.wishlistProduct?.gender.toLowerCase()}/${item?.wishlistProduct?.brand
                      .replaceAll(" ", "-")
                      .toLowerCase()}/${item?.wishlistProduct?.description
                      .replaceAll(" ", "-")
                      .toLowerCase()}/${item?.wishlistProduct?._id}/buy`}
                  >
                    <LazyComponent>
                      <ImageCard
                        data-src={item?.wishlistProduct?.images[0]?.url}
                        loading="lazy"
                        alt={item?.wishlistProduct?.images[0]?.name}
                        // style={{ display: "none" }}
                      />
                    </LazyComponent>
                    {/* <LazyLoadImage
                      src={item?.wishlistProduct?.images[0]}
                      effect="blur"
                      height={"280px"}
                      width={"250px"}
                      threshold="-100"
                    /> */}
                  </Link>
                  <ProductInfo>
                    <ProductTitle>
                      {`${item.wishlistProduct.brand} ${item.wishlistProduct.description}`}
                    </ProductTitle>
                    <div className="itemdetails-itemPricing">
                      <span className="itemdetails-boldFont">{`Rs. ${Math.floor(
                        item.wishlistProduct.price -
                          item.wishlistProduct.price *
                            (item.wishlistProduct.discountPercentage / 100)
                      )}`}</span>
                      <span className="itemdetails-strike">{`Rs.${item.wishlistProduct.price}`}</span>
                      <span className="itemdetails-discountPercent">{`(${item.wishlistProduct.discountPercentage}%OFF)`}</span>
                    </div>
                  </ProductInfo>
                  <ActionDiv>
                    {item.wishlistProduct.inStock ? (
                      <MoveToBag
                        onClick={() =>
                          handelMoveToBag(item.wishlistProduct._id, item._id)
                        }
                      >
                        Move To Bag
                      </MoveToBag>
                    ) : (
                      <ShowSimilar>Show Similar</ShowSimilar>
                    )}
                  </ActionDiv>
                </Li>
              ))}
            </Ul>
          </ProductContainer>
        </Container>
      )}
    </Layout>
  );

  // return (
  //   <div className="App">
  //     <Blurhash
  //       hash="L69G{zR+%MD%~qofWCofNGM{WBxu"
  //       width={400}
  //       height={300}
  //       resolutionX={32}
  //       resolutionY={32}
  //       punch={1}
  //     />
  //     {/* <img src="https://example.org/original.jpg" width={600} height={400} /> */}
  //   </div>
  // );
};

export default Wishlist;
