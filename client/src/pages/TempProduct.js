import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar/Navbar";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Banner from "../components/Banner/Banner";
import axios from "axios";
import Similar from "../components/ViewSimilar/Similar";
import TempProductMainPage from "./TempProductMainPage";
import Footer from "./Footer";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
// import { Chip } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
// check Box Section
import { omit } from "lodash";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { request } from "../api/axios";
import closeIconSvg from "../Assets/svg/CloseIcon.svg";
import { height } from "@mui/system";

const Main = styled.div`
  max-width: 1600px;
  margin: 0 auto;
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

  .condition-render-fixed-top {
    width: 252px;
    min-width: 252px;
    z-index: 4;
    position: fixed;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .condition-render-boundary-top {
    position: static;
  }

  .condition-render-fixed-bottom {
    width: 252px;
    min-width: 252px;
    z-index: 4;
    position: fixed;
    /* margin-bottom: 10px;
    margin-top: 10px; */
  }
  .condition-render-boundary-bottom {
    position: relative;
  }

  .condition-render-hung {
    position: relative;
    z-index: 4;
  }
`;
const Section = styled.section`
  /* width: 100%; */
`;
const LeftSectionDiv = styled.div`
  box-sizing: border-box;
  /* position: static; */
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
  opacity: 0.8;
  background: ${({ color }) => (color ? color : "none")};
  border-radius: 50%;
  margin-right: 10px;
`;

const RightSearchResults = styled.div`
  /* margin-left: 20px; */
`;

const RightSection = styled.div`
  padding-left: 0px;
  flex: 1 1 0%;
  overflow: none;
  /* margin-left: 20px; */
  /* background-color: red; */
`;
const RSecttion = styled.div`
  width: 100%;

  /* overflow: hidden;
  overflow-y: scroll; */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const RightSectionRowBase = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;
  /* align-content: stretch; */
  padding-top: 24px;
  padding-left: 15px;
  padding-right: 20px;
  /* background-color: red; */
`;

/// CheckBox Section
const CategoriesDiv1 = styled.div`
  text-align: start;
  position: relative;
  border-bottom: 1px solid #e9e9ed;
  padding: 20px 0 15px 25px;
  border-right: 1px solid #edebef;
  .vertical-filters-header {
    font-weight: 700;
    text-transform: uppercase;
    font-size: 14px;
    margin: 0 0 18px;
    clear: both;
    color: #282c3f;
    display: block;
  }
`;
const Ul1 = styled.ul`
  font-weight: 400;
  margin: 0;
  padding: 0;
  list-style: none;
`;
const Li1 = styled.li`
  font-size: 14px;
  margin-bottom: 7px;
`;
const Input1 = styled.input`
  margin: 0 16px 0 0;
  position: relative;
  top: 3px;
  width: 16px;
  height: 16px;
  border: 1px solid #c3c2c9;
  background: #fff;
  border-radius: 2px;
  cursor: pointer;
`;
const Label1 = styled.label`
  display: block;
  width: 95%;
  white-space: nowrap;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 17px;
  color: #282c3f;
  font-family: Whitney Book;
`;

const SortByContainerWrapper = styled.div`
  /* display: inline-block; */
  float: right;
  margin-right: 30px;
  margin-bottom: 0;
  margin-top: -7px;
  position: relative;
  top: 5px;
`;
const SortByContainer = styled.div`
  z-index: 2;
  font-family: "Assistant";
  /* position: relative;
  top: 0px; */
  /* left: 1150px; */
  /* right: -2px; */
  padding: 8px 14px;
  font-size: 14px;
  color: #282c3f;
  cursor: pointer;
  width: 255px;
  box-sizing: border-box;
  border-radius: 2px;
  background-color: #fff;
  border: 1px solid #d4d5d9;
  margin-top: 5px;
  span {
    text-transform: capitalize;
    font-weight: 700;
    color: #282c3f;
  }
  /* .sortBy {
    margin-top: 5px;
  } */
  .sort-downArrow {
    /* margin-left: 5px;
    margin-top: 5px; */
    float: right;
  }

  .sprites-downArrow {
    width: 15px;
    height: 10px;
  }
  .sort-list {
    box-sizing: border-box;
    width: 255px;
    background-color: #fff;
    position: absolute;
    top: 40px;
    margin: 0;
    padding: 16px 0;
    z-index: 2;
    display: none;
    border: 1px solid #d4d5d9;
    border-top: none;
    box-shadow: 0 8px 10px 0 rgb(0 0 0 / 8%);
  }
  &:hover .sort-list {
    box-sizing: border-box;
    width: 255px;
    background-color: #fff;
    position: absolute;
    top: 40px;
    left: 0px;
    margin: 0;
    padding: 16px 0;
    z-index: 2;
    display: block;
    /* display: block; */
    /* display: ${({ OpenSort }) => (OpenSort ? `block` : "none")}; */
    border: 1px solid #d4d5d9;
    border-top: none;
    box-shadow: 0 8px 10px 0 rgb(0 0 0 / 8%);
  }
  .sort-list label {
    display: block;
    text-transform: capitalize;
    font-size: 14px;
    color: #282c3f;
    cursor: pointer;
    padding: 10px 20px;
  }

  .sort-list li:hover {
    background-color: #f4f4f5;
  }
  .sort-label input {
    visibility: hidden;
    display: none;
  }
`;

const ChipsContainer = styled.div`
  position: relative;
  list-style: none;
  padding-top: 20px;

  .filter-summary-filterList {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    -webkit-box-align: baseline;
    -ms-flex-align: baseline;
    /* align-items: baseline; */
    margin: 0;
    padding-left: 17px !important;
  }

  ul {
    list-style: none;
  }

  label {
    text-align: center;
  }
  .filter-summary-filter {
    position: relative;
    background-color: #fff;
    text-transform: capitalize;
    color: #3e4152;
    cursor: default;
    font-size: 12px;
    padding: 5px 26px 5px 10px;
    -webkit-transition: all 0.2s ease-out;
    transition: all 0.2s ease-out;
    border-radius: 20px;
    border: 1px solid #d4d5d9;
    &:hover {
      border: 1px solid #94969f;
    }
  }

  .filter-summary-removeFilter {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 18px;
    height: 20px;
    z-index: 1;
    text-align: center;
    cursor: pointer;
  }
  .filter-summary-filter input {
    display: none;
  }
  .filter-summary-filterList li {
    margin: 0 8px 6px 0;
  }
  .filter-summary-removeIcon {
    vertical-align: middle;
    opacity: 0.7;
    -webkit-transform: scale(0.7);
    transform: scale(0.7);
  }
`;

const ColorDisplayInChips = styled.span`
  display: inline-block;
  position: relative;
  top: 2px;
  opacity: 0.8;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
  background: ${({ color }) => (color ? color : "none")};
`;
const ClosedIcon = styled(CloseRoundedIcon)`
  width: 15px;
  height: 15px;
  opacity: 0.8;
  vertical-align: middle;
  &:hover {
    opacity: 1;
  }
`;
const PaginationContainer = styled.div`
  text-align: center;
  border-top: 1px solid #edebef;
  padding-top: 24px;
  padding-bottom: 60px;
  padding: 30px 0px;
  box-sizing: border-box;
  color: #282c3f;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .pageButtons {
    all: unset;
    margin: 0px 10px;
    width: 30px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid white;
    &:hover {
      cursor: pointer;
      border: 1px solid #edebef;
    }
  }
`;

const PreviousButton = styled.button`
  all: unset;
  cursor: pointer;
  width: 80px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #edebef;
  &:hover {
    cursor: pointer;
    border: 1px solid black;
  }
`;

const NextButton = styled.button`
  all: unset;
  width: 80px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #edebef;
  &:hover {
    cursor: pointer;
    border: 1px solid black;
  }
`;
const paramsToObject = (entries) => {
  const result = {};
  for (const [key, value] of entries) {
    result[key] = value;
  }
  // console.log("result", result);
  return result;
};
const useSearchQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchEntries = searchParams.entries();
  console.log("SearchEntries", searchEntries);
  const params = paramsToObject(searchEntries);
  console.log("Prams In UseQuery", params);
  return { params, setSearchParams };
};

const TempProduct = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [wishlistProducts, setWishlistProducts] = useState(null);
  const [combineCategory, setCombineCategory] = useState(null);
  const location = useLocation();
  console.log("Location", location);
  // const cat = location.pathname.split("/")[1];
  const category = location.pathname.split("/")[1];
  const cat = category.split("-")[1];
  console.log("cat", cat);
  console.log("category", category);

  // const index = category.indexOf("-");
  // const firstPartOfCat = category.slice(0, index);
  // const secondPartOfCat = category.slice(index + 1).replaceAll("-", " ");

  console.log("category", cat);
  const ref = React.useRef();
  //   let [searchParams, setSearchParams] = useSearchParams();

  // checkbox
  //   const Brands = ["roadster", "wrong", "highlander", "h&m", "levis"].map(
  //     (key) => ({ key: key, value: key })
  //   );

  var pages;
  const sortObject = [
    {
      label: "Recommended",
      value: "recommended",
    },
    {
      label: "What's New",
      value: "new",
    },
    {
      label: "popularity",
      value: "popularity",
    },
    {
      label: "Better Discount",
      value: "discount",
    },
    {
      label: "Price: High to Low",
      value: "price_desc",
    },
    {
      label: "Price: Low to High",
      value: "price_asc",
    },
  ];
  const sortDic = {
    recommended: "recommended",
    new: "What's New",
    popularity: "popularity",
    discount: " Better discount",
    price_desc: "Price: High to Low",
    price_asc: "Price: Low to High",
  };
  const GenderArrays = ["Men", "Women", "Boys", "Girls", "Unisex"];

  const { params, setSearchParams } = useSearchQuery();
  const [Brand, setBrand] = useState([]);
  const [Colors, setColor] = useState([]);
  const [DiscountRange, setDiscountRange] = useState([]);
  const [PriceRange, setPriceRange] = useState([]);
  const [Gender, setGender] = useState([]);
  const [SortValue, setSort] = useState("");
  const [PageNo, setPageNo] = useState(1);
  const refEle = useRef(null);
  const [scrollingX, setScrollingX] = useState({
    top: "0px",
    bottom: "auto",
  });
  const [checkedValues, setCheckedValues] = useState([]);
  //   const location = useLocation();
  // console.log("params", params);
  // console.log("Brand", Brand);
  // console.log("Params", params);

  ///

  // const index = str.indexOf("-");
  // const firstPart = str.slice(0, index);
  // const secondPart = str.slice(index + 1);

  console.log("Location.........", location);
  var lastScrollTop = 0;
  const handleScroll = () => {
    let rightSectionElement = document.getElementById("rightSection");
    // console.log(
    //   "rightSectionElement.offsetHeight",
    //   rightSectionElement.offsetHeight
    // );
    let leftSectionElement = document.getElementById("leftSection");

    // console.log(
    //   "leftSectionElement.offsetHeight",
    //   leftSectionElement.offsetHeight
    // );
    // console.log("element.offsetWidth", rightSectionElement.offsetWidth);
    // console.log("PageYoffSet ", window.pageYOffset);
    // console.log("window.innerWidth ", window.innerWidth);
    // console.log("window.innerHeight", window.innerHeight);
    // console.log("ScrollTop ", document.documentElement.scrollTop);
    var st = window.pageYOffset || document.documentElement.scrollTop;

    if (
      window.innerWidth >= 750 &&
      rightSectionElement.offsetHeight >= leftSectionElement.offsetHeight
    ) {
      let leftHeightPlusConst = leftSectionElement.offsetHeight + 70;
      let scrollPlusWindowHeight = window.pageYOffset + window.innerHeight;
      if (st > lastScrollTop) {
        console.log("Scrolling Downward");
        //   // Scrolling Downward"

        if (scrollPlusWindowHeight >= leftHeightPlusConst) {
          ref.current.classList.add("condition-render-fixed-bottom");
          ref.current.classList.remove("condition-render-boundary-top");
          ref.current.classList.remove("condition-render-hung");
          setScrollingX({
            top: "auto",
            bottom: "0px",
          });

          if (
            window.pageYOffset >=
            Number(rightSectionElement.offsetHeight) -
              (Number(window.innerHeight) + 100)
          ) {
            // console.log(
            //   "action Trigerred",
            //   Number(rightSectionElement.offsetWidth) -
            //     Number(window.innerHeight)
            // );
            ref.current.classList.add("condition-render-boundary-bottom");
            ref.current.classList.remove("condition-render-fixed-bottom");
            // setScrollingX({
            //   top: "10000px",
            //   bottom: "auto",
            // });
          } else {
            ref.current.classList.remove("condition-render-boundary-bottom");
          }
        }
        lastScrollTop = st;
      } else if (st < lastScrollTop) {
        //Scrolling upward
        console.log("Scrolling upward");
        if (
          document.documentElement.scrollTop + window.innerHeight <=
          rightSectionElement.offsetHeight
        ) {
          console.log("Scrolling upward___111");
          ref.current.classList.remove("condition-render-boundary-bottom");
          ref.current.classList.add("condition-render-fixed-top");
        }
        if (
          rightSectionElement.offsetHeight >= leftSectionElement.offsetHeight &&
          document.documentElement.scrollTop < 250
        ) {
          ref.current.classList.add("condition-render-hung");
          ref.current.classList.remove("condition-render-fixed-top");
        }
        // setScrollingX({
        //   top: `${document.documentElement.scrollTop}px`,
        //   bottom: "auto",
        // });
        // if (document.documentElement.scrollTop < 800) {
        //   console.log("---------trdt---------------");
        //   ref.current.classList.add("condition-render-boundary-top");
        // }
        lastScrollTop = st;
      }
    }

    // if (st > lastScrollTop) {
    //   // downscroll code
    //   console.log("Scrolling Downward");

    //   if (document.documentElement.scrollTop > 816) {
    //     let ele = document.querySelectorAll(".left-section");
    //     console.log(ele);
    //     ref.current.classList.add("condition-render-fixed-bottom");
    //     ref.current.classList.remove("condition-render-boundary-top");
    //     setScrollingX({
    //       top: "auto",
    //       bottom: "0px",
    //     });
    //   }

    //   if (document.documentElement.scrollTop > 4500) {
    //     ref.current.classList.add("condition-render-boundary-bottom");
    //   } else {
    //     ref.current.classList.remove("condition-render-boundary-bottom");
    //   }
    //   lastScrollTop = st;
    // } else if (st < lastScrollTop) {
    //   // upscroll code
    //   console.log("Scrolling upward");
    //   setScrollingX({
    //     top: window.scrollY,
    //     bottom: "auto",
    //   });
    //   if (document.documentElement.scrollTop < 200) {
    //     ref.current.classList.remove("condition-render-hung");
    //     // ref.current.classList.remove("condition-render-fixed-top");
    //   } else {
    //     ref.current.classList.remove("condition-render-fixed-bottom");
    //     ref.current.classList.add("condition-render-hung");
    //     // ref.current.classList.add("condition-render-fixed-top");
    //   }
    //   lastScrollTop = st;
    // }
  };

  useEffect(() => {
    // props?.getProducts({ params });
    getProducts({ params });
    params?.sort && setSort(sortDic[params?.sort]);
    params?.p && setPageNo(parseInt(params?.p));
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handelClick = (status) => {
    if (!open) {
      // document.body.classList.add("removeScroll");
      document.body.style.overflow = "hidden";
    } else {
      // document.body.classList.remove("removeScroll");
      document.body.style.overflow = "unset";
    }
    setOpen(!status);
  };

  const getWishlistProducts = async () => {
    const res = await request.get("wishlist/");
    console.log("result", res);
    setWishlistProducts([
      ...res?.data?.map((item) => {
        return item.wishlistProduct._id;
      }),
    ]);
  };

  const getProducts = async ({ params }) => {
    document.documentElement.scrollTop = 0;
    // const searchString = location.search;
    console.log("calling Getproducts Function", params);
    if (params) {
      console.log("category inside params", category);
      var url = new URL(`http://localhost:8080/api/products/${category}`);
      if (params?.brands)
        url.searchParams.set("brand", params?.brands?.split(","));
      if (params?.p) url.searchParams.set("p", params?.p);
      if (params.sort) url.searchParams.set("sort", params?.sort);
      if (params.colors)
        url.searchParams.set("colors", params?.colors?.split(","));
      if (params.price)
        url.searchParams.set("price", params?.price?.split(","));
    }
    if (params?.gender) url.searchParams.set("gender", params?.gender);
    if (params?.discount) url.searchParams.set("discount", params?.discount);
    console.log("URL______: ", url);
    try {
      console.log("cat inside api call", category);
      const res2 = await axios.get(
        `http://localhost:8080/api/products/${category}`
      );

      console.log("Res2", res2);
      const res = await axios.get(
        // cat ? `http://localhost:8080/api/products?category=${cat}`
        //   : "http://localhost:8080/api/products"
        // `http://localhost:8080/api/products${searchString}`
        url ? `${url}` : `http://localhost:8080/api/products/${category}`
      );

      console.log("result??????????????????????", res);
      if (res2) {
        // const brandData = [
        //   ...new Set(
        //     res2.data.products?.map((item) => {
        //       return item.brand;
        //     })
        //   ),
        // ]?.map((key) => ({ key: key, value: key }));

        function filterUniqueBrandsWithFrequency(brandArray) {
          const brandFrequency = {};
          for (const brand of brandArray) {
            if (brand in brandFrequency) {
              brandFrequency[brand] += 1;
            } else {
              brandFrequency[brand] = 1;
            }
          }

          const resultArray = [];
          for (const brand in brandFrequency) {
            resultArray.push({
              brandName: brand,
              frequency: brandFrequency[brand],
            });
          }

          return resultArray;
        }
        const brandData = filterUniqueBrandsWithFrequency(
          res2.data.products?.map((item) => {
            return item.brand;
          })
        );
        console.log("result", brandData);

        // const colors = [
        //   ...new Set(
        //     res2.data.products?.map((item) => {
        //       return item?.color;
        //     })
        //   ),
        // ]
        //   .filter(Boolean)
        //   ?.map((key) => ({ key: key, value: key }))
        //   .filter(Boolean);

        const colors = Object.entries(
          res2.data.products
            ?.map((item) => {
              return item?.color;
            })
            .filter(Boolean)
            .reduce(
              (colorFrequency, color) => (
                (colorFrequency[color] = (colorFrequency[color] || 0) + 1),
                colorFrequency
              ),
              {}
            )
        )
          .map(([color, frequency]) => ({ color, frequency }))
          .filter(Boolean);

        console.log("Color", colors);
        const prices = [
          ...new Set(
            res2.data.products?.map((item) => {
              return item?.price;
            })
          ),
        ]
          .filter(Boolean)
          ?.map((key) => key)
          .filter(Boolean);

        const rangePrice = (data) => {
          const noOfRanges = 3;
          // step 1
          const min = Math.min(...data);
          console.log("min", min);
          const max = Math.max(...data);
          console.log("max", max);
          // step 2
          const avg = Math.ceil((max - min) / noOfRanges);
          console.log("avg", avg);
          // step 3
          const ranges = [];
          for (var i = 0; i < noOfRanges; i++) {
            ranges[i] = { min: min + avg * i, max: min + avg * (i + 1) };
            ranges[i]["numbers"] = [];
          }

          // step 4

          data.forEach((number) => {
            ranges.forEach((range, index) => {
              if (number >= range.min && number < range.max) {
                ranges[index]["numbers"].push(number);
              }
            });
          });

          return ranges;
        };

        const priceRanges = rangePrice(prices);

        console.log(
          "result!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
          priceRanges
        );
        // pages = new Array(Math.ceil(res2.data.products.length / 20))
        //   .fill(null)
        //   .map((i, v) => v + 1);

        const discountRange = [
          ...new Set(
            res2.data.products?.map((item) => {
              return item?.discountPercentage;
            })
          ),
        ]
          .filter(Boolean)
          ?.map((key) => {
            if (key % 10 == 0) return key;
          })
          .sort()
          .filter(Boolean);

        console.log("brandData", brandData);
        setBrand(brandData);
        setColor(colors);
        setPriceRange(priceRanges);
        setDiscountRange(discountRange);

        console.log("colors-------------: ", colors);
      }

      if (res) {
        setProducts(res.data.products);
        getWishlistProducts();
        console.log("Products..............", [
          ...new Set(
            res.data.products?.map((item) => {
              return item.brand;
            })
          ),
        ]);
      }

      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log("open Status", open);

  /// Scroll on animation

  /// CheckBox
  const handelChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;

    console.log("checked", checked);
    let _params = null;
    console.log("filterArray checked", checked);
    if (checked) {
      let previous = params?.brands?.length ? params?.brands?.split(",") : "";
      const brands = previous
        ? [...previous, value].toString()
        : [value].toString();
      _params = { ...params, ...(brands && { brands }) };
      setSearchParams(_params);
    } else {
      const filterArray = params?.brands?.split(",").filter((e) => e !== value);
      console.log("brands ar", filterArray);
      const brands = filterArray?.length
        ? filterArray?.join(",")?.toString()
        : "";
      console.log("brands", brands);

      let _temp = { ...params, ...(brands && { brands }) };

      console.log("uncheckecd brands", _params);
      _params = brands ? _temp : omit(_temp, "brands");
      setSearchParams(brands ? _temp : omit(_temp, "brands"));
    }

    // console.log(`Value ${value} checked ${checked}`);
    // // setBrand(Brand.filter((e) => e !== value));
    // // -.compact
    // props?.getProducts({ params });
    getProducts({ params: _params });
  };

  const handelChangeGender = (e) => {
    const value = e.target.value;
    console.log("value", e.target?.value);
    const _params = { ...params, ...(value && { gender: value }) };
    setSearchParams(_params);

    getProducts({ params: _params });
  };

  // handel Check box Discount
  //handel color

  const handelColor = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;

    console.log("checked", checked);
    let _params = null;
    console.log("filterArray checked", checked);
    if (checked) {
      let previous = params?.colors?.length ? params?.colors?.split(",") : "";
      const colors = previous
        ? [...previous, value].toString()
        : [value].toString();
      _params = { ...params, ...(colors && { colors }) };
      setSearchParams(_params);
    } else {
      const filterArray = params?.colors?.split(",").filter((e) => e !== value);
      console.log("brands ar", filterArray);
      const colors = filterArray?.length
        ? filterArray?.join(",")?.toString()
        : "";
      console.log("colors", colors);

      let _temp = { ...params, ...(colors && { colors }) };

      console.log("uncheckecd colors", _params);
      _params = colors ? _temp : omit(_temp, "colors");
      setSearchParams(colors ? _temp : omit(_temp, "colors"));
    }

    getProducts({ params: _params });
  };

  // Handel Price Range

  const handelPriceRange = (e) => {
    console.log("Value---@@@@---@@", e.target.value);
    const value = e.target.value;
    const checked = e.target.checked;

    console.log("checked", checked);
    let _params = null;
    console.log("filterArray checked", checked);
    if (checked) {
      let previous = params?.price?.length ? params?.price?.split(",") : "";
      const price = previous
        ? [...previous, value].toString()
        : [value].toString();
      _params = { ...params, ...(price && { price }) };
      setSearchParams(_params);
    } else {
      const filterArray = params?.price?.split(",").filter((e) => e !== value);
      console.log("brands ar", filterArray);
      const price = filterArray?.length
        ? filterArray?.join(",")?.toString()
        : "";
      console.log("price", price);

      let _temp = { ...params, ...(price && { price }) };

      console.log("uncheckecd price", _params);
      _params = price ? _temp : omit(_temp, "price");
      setSearchParams(price ? _temp : omit(_temp, "price"));
    }
    getProducts({ params: _params });
  };

  // handel Discount

  const handelChangeDiscount = (e) => {
    console.log("handle discount");
    console.log("e.target.checked", e.target.checked);
    const value = e.target.value;
    console.log("value", e.target?.value);
    const _params = { ...params, ...(value && { discount: value }) };
    setSearchParams(_params);
    getProducts({ params: _params });
  };

  // handel Check box Discount
  const handelCheckboxChangeDiscount = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;

    console.log("checked", checked);
    let _params = null;
    if (checked) {
      let previous = params?.discount?.length
        ? params?.discount?.split(",")
        : "";
      const discount = previous
        ? [...previous, value].toString()
        : [value].toString();
      _params = { ...params, ...(discount && { discount: value }) };
      setSearchParams(_params);
    } else {
      const filterArray = params?.discount
        ?.split(",")
        .filter((e) => e !== value);
      console.log("brands ar", filterArray);
      const discount = filterArray?.length
        ? filterArray?.join(",")?.toString()
        : "";
      console.log("colors", discount);

      let _temp = { ...params, ...(discount && { discount }) };

      console.log("uncheckecd colors", _params);
      _params = discount ? _temp : omit(_temp, "discount");
      setSearchParams(discount ? _temp : omit(_temp, "discount"));
    }

    getProducts({ params: _params });
  };

  //
  const handelSort = (e) => {
    const value = e.target.value;

    // console.log("Usre ref", refEle.current.innerText);

    // let entries = Object.entries(sortObject);
    // let data = sortObject.filter((item) => {
    //   if (item.value == value) return item.label;
    //   return;
    // });
    // console.log("datat...........", data[0].label);
    setSort(sortDic[value]);
    const _params = { ...params, ...(value && { sort: value }) };
    setSearchParams(_params);
    getProducts({ params: _params });
  };

  const handelPagination = (p) => {
    let _params = null;
    if (p > 1) {
      _params = { ...params, ...(p > 1 && { p: p }) };
      setSearchParams(_params);
    } else {
      _params = { ...params, ...(p && { p }) };
      setSearchParams(p > 1 ? _params : omit(_params, "p"));
    }
    setPageNo(parseInt(p));
    console.log("handle page", _params);
    getProducts({ params: _params });
  };

  // if (products) {
  //   pages = new Array(Math.ceil(products.length / 20))
  //     .fill(null)
  //     .map((i, v) => v + 1);
  //   // alert(Math.ceil(products.length / 20));
  //   console.log("products.length", products.length);
  // }

  console.log("Colors", Colors);
  return (
    <div>
      <Navbar />
      <Similar open={open} handelClick={handelClick} />
      <Main open={open}>
        <RowBase>
          <Breadcrumbs>
            <BreadcrumbList>
              <BreadcrumbListItem>Home</BreadcrumbListItem>
              <BreadcrumbListItem>Clothing</BreadcrumbListItem>
              <BreadcrumbListItem>men</BreadcrumbListItem>
              <BreadcrumbListItem>Shirt</BreadcrumbListItem>
            </BreadcrumbList>
          </Breadcrumbs>
        </RowBase>
        <RowBase>
          <TitleContainer>
            <Header1 className="title">
              Men T-shirt
              <Span> - 79051 items</Span>
            </Header1>
          </TitleContainer>
        </RowBase>
        <RowBase>
          <LeftSection id="leftSection">
            <Section>
              <LeftSectionDiv
                className="left-section condition-render-boundary-top"
                ref={ref}
                style={{
                  top: `${scrollingX.top}`,
                  bottom: `${scrollingX.bottom}`,
                }}
              >
                <FilterDiv>
                  <FilterSpan>filters</FilterSpan>
                </FilterDiv>
                <div>
                  <CategoriesDiv1>
                    <Ul1>
                      {GenderArrays?.map((gender, i) => (
                        <Li1 key={i}>
                          <Label1>
                            <Input
                              type="radio"
                              name="gender"
                              value={gender}
                              style={{
                                accentColor: "#ff3f6c",
                              }}
                              onChange={handelChangeGender}
                              checked={Boolean(params?.gender === gender)}
                            />
                            {gender.toUpperCase()}
                          </Label1>
                        </Li1>
                      ))}
                    </Ul1>
                  </CategoriesDiv1>
                  <CategoriesDiv1>
                    <span className="vertical-filters-header">Brand</span>
                    <Ul>
                      {Brand?.map((brand, i) => (
                        <Li1 key={i}>
                          <Label1>
                            <Input1
                              style={{
                                accentColor: "#ff3f6c",
                              }}
                              type="checkbox"
                              name="brand"
                              value={brand?.brandName}
                              onChange={handelChange}
                              checked={Boolean(
                                params?.brands
                                  ?.split(",")
                                  ?.includes(brand?.brandName)
                              )}
                            />
                            {`${brand?.brandName?.toUpperCase()} (${
                              brand.frequency
                            })`}
                          </Label1>
                        </Li1>
                      ))}
                    </Ul>
                  </CategoriesDiv1>
                </div>

                {/* <Checkbox products={products} getProducts={getProducts} /> */}
                <CategoriesDiv1>
                  <span className="vertical-filters-header">Price</span>
                  <Ul>
                    {PriceRange?.length > 0 &&
                      PriceRange?.map((price, i) => (
                        <>
                          {price && price.numbers.length > 0 && (
                            <Li>
                              <Label style={{ textTransform: "capitalize" }}>
                                <Input1
                                  type="checkbox"
                                  value={`${price.min} to ${price.max}`}
                                  style={{
                                    accentColor: "#ff3f6c",
                                  }}
                                  onChange={handelPriceRange}
                                  checked={Boolean(
                                    params?.price
                                      ?.split(",")
                                      ?.includes(`${price.min} to ${price.max}`)
                                  )}
                                />
                                {`Rs.${price.min} to Rs.${price.max} (${price.numbers.length})`}
                              </Label>
                            </Li>
                          )}
                        </>
                      ))}
                  </Ul>
                </CategoriesDiv1>
                <CategoriesDiv1>
                  <span className="vertical-filters-header">Color</span>
                  <Ul>
                    {Colors?.length > 0 &&
                      Colors?.map((color, i) => (
                        <>
                          {color && (
                            <Li>
                              <Label style={{ textTransform: "capitalize" }}>
                                <Input1
                                  type="checkbox"
                                  value={color.color}
                                  style={{
                                    accentColor: "#ff3f6c",
                                  }}
                                  onChange={handelColor}
                                  // checked={Boolean(
                                  //   params?.colors?.indexOf(color.key?.key) > 1
                                  // )}
                                  checked={Boolean(
                                    params?.colors
                                      ?.split(",")
                                      ?.includes(color?.color)
                                  )}
                                />
                                <ColorDisplay
                                  color={color.color}
                                ></ColorDisplay>
                                {color.color} {`(${color.frequency})`}
                              </Label>
                            </Li>
                          )}
                        </>
                      ))}
                  </Ul>
                </CategoriesDiv1>
                <CategoriesDiv1>
                  <span className="vertical-filters-header">
                    DISCOUNT RANGE
                  </span>
                  <Ul>
                    {DiscountRange?.length > 0 &&
                      DiscountRange?.map((discount, i) => (
                        <>
                          {discount && (
                            <Li>
                              <Label>
                                <Input1
                                  type="radio"
                                  value={`${discount}% and above`}
                                  name="discount"
                                  style={{
                                    accentColor: "#ff3f6c",
                                  }}
                                  onChange={handelChangeDiscount}
                                  checked={Boolean(
                                    params?.discount?.split("%")[0].trim() ===
                                      discount?.toString()?.toLowerCase()
                                  )}
                                  // checked={Boolean(
                                  //   params?.colors?.indexOf(color.key?.key) > 1
                                  // )}
                                  // checked={Boolean(
                                  //   params?.colors
                                  //     ?.split(",")
                                  //     ?.includes(color?.key)
                                  // )}
                                />
                                {`${discount}% and above`}
                              </Label>
                            </Li>
                          )}
                        </>
                      ))}
                  </Ul>
                </CategoriesDiv1>
              </LeftSectionDiv>
            </Section>
          </LeftSection>

          <RightSection>
            <RightSearchResults id="rightSection">
              <RowBase>
                <div
                  style={{
                    width: "100%",
                    position: "relative",
                  }}
                >
                  <SortByContainerWrapper>
                    <SortByContainer>
                      <div className="sortBy">
                        Sort by :
                        <span>{SortValue ? SortValue : "Recommended"}</span>
                        <span className="sort-downArrow">
                          <KeyboardArrowDownIcon style={{ fontSize: `25px` }} />
                        </span>
                      </div>
                      <Ul1 className="sort-list">
                        {sortObject?.map((item) => (
                          <>
                            <li>
                              <label
                                className="sort-label"
                                style={
                                  params?.sort == item?.value
                                    ? {
                                        backgroundColor: " #f4f4f5",
                                        fontWeight: "700",
                                      }
                                    : null
                                }
                              >
                                <input
                                  type="radio"
                                  name="sort"
                                  value={item.value}
                                  onChange={handelSort}
                                />
                                {item.label}
                              </label>
                            </li>
                          </>
                        ))}
                      </Ul1>
                      <Ul1 className="sort-list">
                        {sortObject?.map((item) => (
                          <>
                            <li>
                              <label
                                className="sort-label"
                                style={
                                  params?.sort == item?.value
                                    ? {
                                        backgroundColor: " #f4f4f5",
                                        fontWeight: "700",
                                      }
                                    : null
                                }
                              >
                                <input
                                  type="radio"
                                  name="sort"
                                  value={item.value}
                                  onChange={handelSort}
                                />
                                {item.label}
                              </label>
                            </li>
                          </>
                        ))}
                      </Ul1>
                    </SortByContainer>
                  </SortByContainerWrapper>
                </div>
                {/* <div>
                  <Chip
                    label="Deletable"
                    variant="outlined"
                    onDelete={handelChange}
                  />
                </div> */}

                <ChipsContainer className="filter-summary-selectedFilterContainer">
                  <ul className="filter-summary-filterList">
                    {params?.brands?.split(",").map((brand, i) => (
                      <li key={i}>
                        <div className="filter-summary-filter">
                          {brand}
                          <label className="filter-summary-removeFilter">
                            <input
                              type="checkbox"
                              name="brand"
                              value={brand}
                              onChange={handelChange}
                              checked={Boolean(
                                params?.brands?.split(",")?.includes(brand)
                              )}
                            />
                            <ClosedIcon
                              style={{
                                width: "15px",
                                height: "15px",
                              }}
                            />
                          </label>
                        </div>
                      </li>
                    ))}

                    {params?.price?.split(",").map((price, i) => (
                      <li key={i}>
                        <div className="filter-summary-filter">
                          <span
                            style={{ textTransform: "capitalize" }}
                          >{` Rs. ${price.split("to")[0]} to Rs.${
                            price.split("to")[1]
                          }`}</span>

                          <label className="filter-summary-removeFilter">
                            <input
                              type="checkbox"
                              name="brand"
                              value={price}
                              onChange={handelPriceRange}
                              checked={Boolean(
                                params?.price?.split(",")?.includes(price)
                              )}
                            />

                            <ClosedIcon
                              style={{
                                width: "15px",
                                height: "15px",
                              }}
                            />
                          </label>
                        </div>
                      </li>
                    ))}

                    {params?.colors?.split(",").map((color, i) => (
                      <li key={i}>
                        <div className="filter-summary-filter">
                          <span>
                            <ColorDisplayInChips
                              color={color}
                            ></ColorDisplayInChips>
                            {color}
                          </span>

                          <label className="filter-summary-removeFilter">
                            <input
                              type="checkbox"
                              name="brand"
                              value={color}
                              onChange={handelColor}
                              checked={Boolean(
                                params?.colors?.split(",")?.includes(color)
                              )}
                            />

                            <ClosedIcon
                              style={{
                                width: "15px",
                                height: "15px",
                              }}
                            />
                          </label>
                        </div>
                      </li>
                    ))}

                    {params?.discount?.split(",").map((disc, i) => (
                      <li key={i}>
                        <div className="filter-summary-filter">
                          {disc}
                          <label className="filter-summary-removeFilter">
                            <input
                              type="checkbox"
                              name="discount"
                              value={disc}
                              onChange={handelCheckboxChangeDiscount}
                              checked={Boolean(
                                params?.discount?.split(",")?.includes(disc)
                              )}
                            />
                            <ClosedIcon
                              style={{
                                width: "15px",
                                height: "15px",
                              }}
                            />
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </ChipsContainer>
              </RowBase>
              <RightSectionRowBase>
                <RSecttion className="scroll-action">
                  <TempProductMainPage
                    wishlistProducts={wishlistProducts}
                    products={products}
                    handelClick={handelClick}
                    open={open}
                  />
                </RSecttion>
              </RightSectionRowBase>
              <PaginationContainer>
                {PageNo > 1 ? (
                  <PreviousButton
                    onClick={() => handelPagination(parseInt(PageNo - 1))}
                  >
                    Previous
                  </PreviousButton>
                ) : null}
                {pages?.map((item, i) => (
                  <button
                    key={i.toString()}
                    className="pageButtons"
                    style={
                      PageNo == item
                        ? { backgroundColor: "black", color: "white" }
                        : null
                    }
                    // href={`http://localhost:3000${location.pathname}${location.search}&p=${item}`}
                    onClick={() => handelPagination(item)}
                  >
                    {item}
                  </button>
                ))}
                {PageNo < 5 ? (
                  <NextButton
                    onClick={() => handelPagination(parseInt(PageNo + 1))}
                  >
                    Next
                  </NextButton>
                ) : null}
              </PaginationContainer>
            </RightSearchResults>
          </RightSection>
        </RowBase>
      </Main>
      <Banner />
      <Footer />
    </div>
  );
};

export default TempProduct;
