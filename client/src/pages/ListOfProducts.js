import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar/Navbar.js";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Banner from "../components/Banner/Banner.js";
import Similar from "../components/ViewSimilar/Similar.js";
import ProductCarouselPage from "./ProductCarouselPage.js";
import Footer from "../components/Footer/Footer.js";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { omit } from "lodash";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { request } from "../api/axios.js";
import Pagination from "../components/Pagination/Pagination.js";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductByCategory } from "../redux/features/product/productSlice.js";
import { isFulfilled } from "@reduxjs/toolkit";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner.js";
import NoProduct from "../components/NoProduct/NoProduct.js";

// import LazyComponent from "../components/LazyComponent";
// import closeIconSvg from "../Assets/svg/CloseIcon.svg";
// import { height } from "@mui/system";

const Main = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  font-size: 16px;
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
  font-size: 16px;
  overflow: hidden;
  display: inline-block;
  margin: 0 0 0 25px;
  vertical-align: top;
  padding: 0;
`;
const BreadcrumbListItem = styled.li`
  text-decoration: none;
  list-style: none;
  font-size: 16px;
  /* display: inline-block; */
  float: left;
  margin-right: 5px;
  text-transform: capitalize;
  line-height: 1;

  &::after {
    font-size: 16px;
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
  background-color: #fff;

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
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .condition-render-boundary-bottom {
    position: relative;
  }

  .condition-render-hung {
    position: relative;
    z-index: 4;
  }

  @media screen and (max-width: 620px) {
    display: none !important;
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
  font-weight: 700;
`;
const ClearFilter = styled.span`
  position: absolute;
  top: 2px;
  right: 10px;
  font-weight: 700;
  color: #ff3f6c;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
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
  padding: 1px 0;
  color: #282c3f;
  font-family: Whitney Book;
  font-size: 14px;
  span {
    font-size: 15px;
    letter-spacing: 0.1px;
  }
`;

const validColors = ["white", "off white", "snow white", "snow"];
const ColorDisplay = styled.span`
  display: inline-block;
  width: 15px;
  height: 15px;
  opacity: 0.8;
  background: ${({ color }) => (color ? color : "none")};
  border-radius: 50%;
  margin-right: 10px;
  border: ${({ color }) =>
    validColors.includes(color) ? "1px solid #d6d6d6" : "none"};
`;

const RightSearchResults = styled.div`
  /* margin-left: 20px; */
`;

const RightSection = styled.div`
  padding-left: 0px;
  flex: 1 1 0%;
  overflow: none;
  min-height: 50vh;
`;
const RSecttion = styled.div`
  width: 100%;
  padding-top: 24px;
  padding-left: 15px;
  padding-right: 20px;

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
  width: 15px;
  height: 15px;
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
  font-size: 15px;
  color: #282c3f;
  font-family: Whitney Book;
  letter-spacing: 0.1px;
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
  position: relative;
  top: 0px;
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
    /* background-color: #fff; */

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
    top: 35px;
    left: -1px;
    margin: 0;
    padding: 16px 0;
    z-index: 2;
    display: block;
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
  opacity: 0.9;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
  background: ${({ color }) => (color ? color : "none")};
  [data-colorhex="bisque"] {
    border: 1px solid #d6d6d6;
  }
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
  //
  return result;
};
const useSearchQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchEntries = searchParams.entries();
  //
  const params = paramsToObject(searchEntries);
  //
return { params, setSearchParams };
};

const ListOfProducts = () => {
  const { isLoading, isError, productsData } = useSelector((state) => ({
    ...state.product,
  }));
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [wishlistProducts, setWishlistProducts] = useState(null);

  const dispatch = useDispatch();
  const location = useLocation();
  const category = location.pathname.split("/")[1];
  const ref = React.useRef();
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
  const GenderArrays = ["Men", "Women", "Boys", "Girls"];

  const { params, setSearchParams } = useSearchQuery();
  const [Brand, setBrand] = useState([]);
  const [Colors, setColor] = useState([]);
  const [DiscountRange, setDiscountRange] = useState([]);
  const [PriceRange, setPriceRange] = useState([]);
  const [Gender, setGender] = useState([]);
  const [SortValue, setSort] = useState("");
  const [showAllColors, setShowAllColors] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [similarProduct, setSimilarProduct] = useState({});
  const [scrollingX, setScrollingX] = useState({
    top: "auto",
    bottom: "auto",
  });

  const handleShowAllColors = () => {
    setShowAllColors(true);
  };

  var lastScrollTop = 0;
  const handleScroll = () => {
    let rightSectionElement = document.getElementById("rightSection");
    let leftSectionElement = document.getElementById("leftSection");
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (
      window.innerWidth >= 750 &&
      rightSectionElement?.offsetHeight >= leftSectionElement?.offsetHeight
    ) {
      let leftHeightPlusConst = leftSectionElement.offsetHeight;
      let scrollPlusWindowHeight = window.pageYOffset + window.innerHeight;
      if (st > lastScrollTop) {
        // Scrolling Downward"
        if (scrollPlusWindowHeight >= leftHeightPlusConst + 770 + 80) {
          ref.current.classList.add("condition-render-fixed-bottom");
          ref.current.classList.remove("condition-render-boundary-top");
          ref.current.classList.remove("condition-render-hung");
          setScrollingX({
            top: "80px",
            bottom: "0px",
          });

          if (
            window.pageYOffset >=
            Number(rightSectionElement.offsetHeight) -
              (Number(window.innerHeight) + 100)
          ) {
            ref.current.classList.add("condition-render-boundary-bottom");
            ref.current.classList.remove("condition-render-fixed-bottom");
          } else {
            ref.current.classList.remove("condition-render-boundary-bottom");
          }
        }
        lastScrollTop = st;
      } else if (st < lastScrollTop) {
        //Scrolling upward
        if (
          document.documentElement.scrollTop + window.innerHeight <=
          rightSectionElement.offsetHeight
        ) {
          ref.current.classList.remove("condition-render-boundary-bottom");
          ref.current.classList.add("condition-render-fixed-top");
        }
        if (
          rightSectionElement.offsetHeight >= leftSectionElement.offsetHeight &&
          document.documentElement.scrollTop < 250
        ) {
          ref.current.classList.add("condition-render-hung");
          ref.current.classList.remove("condition-render-fixed-top");
          setScrollingX({
            top: "20px",
            bottom: "0px",
          });
        }
        lastScrollTop = st;
      }
    }
  };

  useEffect(() => {
    getProducts({ params });
    params?.sort && setSort(sortDic[params?.sort]);
    params?.p ? setCurrentPage(parseInt(params?.p)) : setCurrentPage(1);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location?.pathname, dispatch]);

  const handelClick = (status, product) => {
    if (!open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    setOpen(!status);
    setSimilarProduct(product);
  };

  const getWishlistProducts = async () => {
    const res = await request.get("wishlist/");
    setWishlistProducts([
      ...res?.data?.map((item) => {
        return item.wishlistProduct._id;
      }),
    ]);
  };

  const getProducts = async ({ params }) => {
    document.documentElement.scrollTop = 0;
    dispatch(fetchProductByCategory({ category, params })).then((data) => {
      //  setBrand(data?.productsData?.filters?.brandData);
      //   setColor(data?.productsData?.filters?.colors);
      //   setPriceRange(data?.productsData?.filters?.priceRanges);
      //   setDiscountRange(data?.productsData?.filters?.discountRange);
    });
    getWishlistProducts();
  };

  /// CheckBox
  useEffect(() => {
    setBrand(productsData?.filters?.brandData);
    setColor(productsData?.filters?.colors);
    setPriceRange(productsData?.filters?.priceRanges);
    setDiscountRange(productsData?.filters?.discountRange);
    setProducts(productsData?.products);
    setTotalPages(productsData?.totalPages);
    setGender(productsData?.filters?.gender);
  }, [productsData]);

  const handelChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    let _params = null;
    if (checked) {
      let previous = params?.brand?.length ? params?.brand?.split(",") : "";
      const brand = previous
        ? [...previous, value].toString()
        : [value].toString();
      // _params =
      //   parseInt(params?.p) > 1
      //     ? { ...params, ...{ p: 1 }, ...(brands && { brands }) }
      //     : (_params = { ...params, ...(brands && { brands }) });
      _params = omit({ ...params, ...(brand && { brand }) }, "p");

      setSearchParams(_params);
      // setSearchParams(_params);
    } else {
      const filterArray = params?.brand?.split(",").filter((e) => e !== value);

      const brand = filterArray?.length
        ? filterArray?.join(",")?.toString()
        : "";

      // let _temp =
      //   parseInt(params?.p) > 1
      //     ? { ...params, ...{ p: 1 }, ...(brands && { brands }) }
      //     : (_params = { ...params, ...(brands && { brands }) });
      let _temp = omit({ ...params, ...(brand && { brand }) }, "p");

      _params = brand ? _temp : omit(_temp, "brand");

      setSearchParams(_params);
      // setSearchParams(omit(_params, "p"));
    }

    //
    // // setBrand(Brand.filter((e) => e !== value));
    // // -.compact
    // props?.getProducts({ params });
    setCurrentPage(parseInt(1));
    getProducts({ params: _params });
  };

  const handelChangeGender = (e) => {
    const value = e.target.value;

    const _params = omit({ ...params, ...(value && { gender: value }) }, "p");
    setSearchParams(_params);
    getProducts({ params: _params });
  };

  //handel color

  const handelColor = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    let _params = null;

    if (checked) {
      let previous = params?.colors?.length ? params?.colors?.split(",") : "";
      const colors = previous
        ? [...previous, value].toString()
        : [value].toString();
      _params = omit({ ...params, ...(colors && { colors }) }, "p");
      setSearchParams(_params);
    } else {
      const filterArray = params?.colors?.split(",").filter((e) => e !== value);

      const colors = filterArray?.length
        ? filterArray?.join(",")?.toString()
        : "";

      let _temp = omit({ ...params, ...(colors && { colors }) }, "p");

      _params = colors ? _temp : omit(_temp, "colors");
      setSearchParams(_params);
    }
    setCurrentPage(1);
    getProducts({ params: _params });
  };

  // Handel Price Range

  const handelPriceRange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;

    let _params = null;

    if (checked) {
      let previous = params?.price?.length ? params?.price?.split(",") : "";
      const price = previous
        ? [...previous, value].toString()
        : [value].toString();
      _params = omit({ ...params, ...(price && { price }) }, "p");
      setSearchParams(_params);
    } else {
      const filterArray = params?.price?.split(",").filter((e) => e !== value);

      const price = filterArray?.length
        ? filterArray?.join(",")?.toString()
        : "";

      let _temp = { ...params, ...(price && { price }) };

      _params = price ? omit(_temp, "p") : omit(_temp, "price");
      setSearchParams(price ? _temp : omit(_temp, "price"));
    }
    setCurrentPage(1);
    getProducts({ params: _params });
  };

  // handel Discount

  const handelChangeDiscount = (e) => {
    const value = e.target.value;

    const _params = { ...params, ...(value && { discount: value }) };
    setSearchParams(_params);
    getProducts({ params: _params });
  };

  // handel Check box Discount
  const handelCheckboxChangeDiscount = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;

    let _params = null;
    if (checked) {
      let previous = params?.discount?.length
        ? params?.discount?.split(",")
        : "";
      const discount = previous
        ? [...previous, value].toString()
        : [value].toString();
      _params = omit({ ...params, ...(discount && { discount: value }) }, "p");
      setSearchParams(_params);
    } else {
      const filterArray = params?.discount
        ?.split(",")
        .filter((e) => e !== value);

      const discount = filterArray?.length
        ? filterArray?.join(",")?.toString()
        : "";

      let _temp = { ...params, ...(discount && { discount }) };

      _params = discount ? omit(_temp, "p") : omit(_temp, "discount");
      setCurrentPage(1);
      setSearchParams(discount ? _temp : omit(_temp, "discount"));
    }

    getProducts({ params: _params });
  };

  //
  const handelSort = (e) => {
    const value = e.target.value;

    //

    // let entries = Object.entries(sortObject);
    // let data = sortObject.filter((item) => {
    //   if (item.value == value) return item.label;
    //   return;
    // });
    //
    setSort(sortDic[value]);
    const _params = omit({ ...params, ...(value && { sort: value }) }, "p");
    setCurrentPage(1);
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
    setCurrentPage(parseInt(p));

    getProducts({ params: _params });
  };

  const handleClearFilter = () => {
    let _params = null;

    if ("rawQuery" in params) {
      _params = { rawQuery: params?.rawQuery };
      setSearchParams(_params);
      getProducts({ params: _params });
    } else {
      setSearchParams("");
      getProducts({ params: {} });
    }
  };

  const showcasedColors = showAllColors ? Colors : Colors?.slice(0, 6); // Get the first 7 colors or all colors based on the state
  const remainingColorsCount = Colors?.length - 6; // Calculate the number of remaining colors
  const remainingColorsMessage = `+${remainingColorsCount} more`;

  return (
    <div>
      <Navbar />
      {open && (
        <Similar
          open={open}
          similarProduct={similarProduct}
          handelClick={handelClick}
        />
      )}
      {(products?.length < 1 && params?.rawQuery) || !params ? (
        <NoProduct />
      ) : (
        <Main open={open}>
          <RowBase>
            <Breadcrumbs>
              <BreadcrumbList>
                <BreadcrumbListItem>Home</BreadcrumbListItem>
                <BreadcrumbListItem>Clothing</BreadcrumbListItem>
              </BreadcrumbList>
            </Breadcrumbs>
          </RowBase>
          <RowBase>
            <TitleContainer>
              <Header1 className="title">
                {decodeURIComponent(category)}
                <Span> - {`${products?.length || 0}`} items</Span>
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
                    {params?.brand?.length > 0 ||
                    params?.colors?.length > 0 ||
                    params?.gender?.length > 0 ||
                    params?.price?.length > 0 ||
                    params?.discount?.length > 0 ? (
                      <ClearFilter onClick={handleClearFilter}>
                        CLEAR ALL
                      </ClearFilter>
                    ) : null}
                  </FilterDiv>
                  <div>
                    {Gender?.length > 0 && (
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
                    )}
                    {Brand?.length > 1 && (
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
                                    params?.brand
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
                    )}
                  </div>
                  {PriceRange?.length > 0 && (
                    <CategoriesDiv1>
                      <span className="vertical-filters-header">Price</span>
                      <Ul>
                        {PriceRange?.map((price, i) => (
                          <>
                            {price && price.numbers.length > 0 && (
                              <Li key={i}>
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
                                        ?.includes(
                                          `${price.min} to ${price.max}`
                                        )
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
                  )}
                  {showcasedColors?.length > 0 && (
                    <CategoriesDiv1>
                      <span className="vertical-filters-header">Color</span>
                      <Ul>
                        {showcasedColors?.map((color, i) => (
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
                                    checked={Boolean(
                                      params?.colors
                                        ?.split(",")
                                        ?.includes(color?.color)
                                    )}
                                  />
                                  <ColorDisplay
                                    color={color.color.replace(" ", "")}
                                  ></ColorDisplay>
                                  <span>
                                    {color.color} {`(${color.frequency})`}
                                  </span>
                                </Label>
                              </Li>
                            )}
                          </>
                        ))}
                        <Li>
                          {!showAllColors && remainingColorsCount > 0 && (
                            <p
                              onClick={handleShowAllColors}
                              style={{
                                cursor: "pointer",
                                color: "#ff3f6c",
                                margin: " 5px 0 0 27px",
                              }}
                            >
                              {remainingColorsMessage}
                            </p>
                          )}
                        </Li>
                      </Ul>
                    </CategoriesDiv1>
                  )}
                  {DiscountRange?.length > 0 && (
                    <CategoriesDiv1>
                      <span className="vertical-filters-header">
                        DISCOUNT RANGE
                      </span>
                      <Ul>
                        {DiscountRange?.map((discount, i) => (
                          <>
                            {discount && (
                              <Li key={i}>
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
                                  />
                                  {`${discount}% and above`}
                                </Label>
                              </Li>
                            )}
                          </>
                        ))}
                      </Ul>
                    </CategoriesDiv1>
                  )}
                </LeftSectionDiv>
              </Section>
            </LeftSection>

            {isLoading ? (
              <LoadingSpinner loading={isLoading} />
            ) : (
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
                          <div
                            className="sortBy"
                            key={SortValue ? SortValue : "Recommended"}
                          >
                            Sort by :
                            <span key={SortValue || "Recommended"}>
                              {" "}
                              {SortValue ? SortValue : " Recommended"}
                            </span>
                            <span className="sort-downArrow">
                              <KeyboardArrowDownIcon
                                style={{ fontSize: `25px` }}
                              />
                            </span>
                          </div>
                          <Ul1 className="sort-list">
                            {sortObject?.map((item, i) => (
                              <li key={i}>
                                <label
                                  className="sort-label"
                                  style={
                                    params?.sort === item?.value
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
                            ))}
                          </Ul1>
                        </SortByContainer>
                      </SortByContainerWrapper>
                    </div>

                    <ChipsContainer className="filter-summary-selectedFilterContainer">
                      <ul className="filter-summary-filterList">
                        {params?.brand?.split(",")?.map((b, i) => (
                          <li key={i}>
                            <div className="filter-summary-filter">
                              {b}
                              <label className="filter-summary-removeFilter">
                                <input
                                  type="checkbox"
                                  name="brand"
                                  value={b}
                                  onChange={handelChange}
                                  checked={Boolean(
                                    params?.brand?.split(",")?.includes(b)
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
                                  color={color.replace(" ", "")}
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
                    <RightSection>
                      <RSecttion className="scroll-action">
                        <ProductCarouselPage
                          wishlistProducts={wishlistProducts}
                          products={products}
                          handelClick={handelClick}
                          open={open}
                        />
                      </RSecttion>
                    </RightSection>
                  </RightSectionRowBase>

                  <PaginationContainer>
                    {totalPages > 1 ? (
                      <Pagination
                        onPageChange={handelPagination}
                        totalPages={totalPages}
                        currentPage={currentPage}
                      />
                    ) : null}
                  </PaginationContainer>
                </RightSearchResults>
              </RightSection>
            )}
          </RowBase>
        </Main>
      )}
       
      <Banner />
      <Footer />
    </div>
  );
};

export default ListOfProducts;
