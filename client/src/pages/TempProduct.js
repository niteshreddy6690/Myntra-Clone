import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar/Navbar";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Banner from "../components/Banner/Banner";
import axios from "axios";
import Similar from "../components/ViewSimilar/Similar";
import TempProductMainPage from "./TempProductMainPage";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";

// check Box Section
import { omit } from "lodash";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Main = styled.div`
  margin: 75px auto 0;
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
  min-width: 235px;
  max-width: 235px;
  flex-grow: 0 !important;
  align-self: flex-start;
  flex-wrap: wrap;
  flex-direction: column;
  flex: 1;
  font-family: Whitney Semibold;

  .condition-render-boundary-top {
    position: static;
  }

  .condition-render-fixed-top {
    width: 252px;
    min-width: 252px;
    z-index: 4;
    position: fixed;
    margin-bottom: 10px;
    margin-top: 10px;
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
  background: ${({ color }) => (color ? color : "#ffffff")};
  border-radius: 50%;
  margin-right: 10px;
`;
const RightSection = styled.div`
  padding: 0px;
  flex: 1 1 0%;
`;
const RSecttion = styled.div`
  max-height: 1972px;
  width: 1150px;
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
  align-content: stretch;
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
    font-weight: 500;
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

const SortByContainer = styled.div`
  z-index: 2;
  font-family: "Assistant";
  position: absolute;
  top: -90px;
  left: 1150px;
  padding: 2px 14px;
  font-size: 14px;
  color: #282c3f;
  cursor: pointer;
  /* position: relative; */
  width: 255px;
  box-sizing: border-box;
  border-radius: 2px;
  background-color: #fff;
  border: 1px solid #d4d5d9;

  span {
    text-transform: capitalize;
    font-weight: 700;
    color: #282c3f;
  }
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
    top: 33px;
    left: -1px;
    margin: 0;
    padding: 16px 0;
    z-index: 2;
    display: none;
    border: 1px solid #d4d5d9;
    border-top: none;
    box-shadow: 0 8px 10px 0 rgb(0 0 0 / 8%);
  }
  :hover .sort-list {
    box-sizing: border-box;
    width: 255px;
    background-color: #fff;
    position: absolute;
    top: 33px;
    left: -1px;
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

  .sort-label input {
    visibility: hidden;
    display: none;
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
  console.log("result", result);
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
  const location = useLocation();
  const category = location.pathname.split("/")[1];
  const cat = category.split("-")[1];

  const ref = React.useRef();
  //   let [searchParams, setSearchParams] = useSearchParams();

  // checkbox
  //   const Brands = ["roadster", "wrong", "highlander", "h&m", "levis"].map(
  //     (key) => ({ key: key, value: key })
  //   );

  const pages = new Array(5).fill(null).map((i, v) => v + 1);
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
  console.log("params", params);
  console.log("Brand", Brand);
  console.log("Params", params);

  ///

  console.log("category", category, cat);

  console.log("Location.........", location);
  var lastScrollTop = 0;
  const handleScroll = () => {
    console.log("PageYoffSet ", window.pageYOffset);
    console.log("ScrollTop ", document.documentElement.scrollTop);

    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      // downscroll code
      console.log("Scrolling Downward");

      if (document.documentElement.scrollTop > 550) {
        let ele = document.querySelectorAll(".left-section");
        console.log(ele);
        ref.current.classList.add("condition-render-fixed-bottom");
        ref.current.classList.remove("condition-render-boundary-top");
        setScrollingX({
          top: "auto",
          bottom: "0px",
        });
      }

      if (document.documentElement.scrollTop > 1500) {
        ref.current.classList.add("condition-render-boundary-bottom");
      } else {
        ref.current.classList.remove("condition-render-boundary-bottom");
      }
      lastScrollTop = st;
    } else if (st < lastScrollTop) {
      // upscroll code
      console.log("Scrolling upward");
      setScrollingX({
        top: window.scrollY,
        bottom: "auto",
      });
      if (document.documentElement.scrollTop < 200) {
        ref.current.classList.remove("condition-render-hung");
        // ref.current.classList.remove("condition-render-fixed-top");
      } else {
        ref.current.classList.remove("condition-render-fixed-bottom");
        ref.current.classList.add("condition-render-hung");
        // ref.current.classList.add("condition-render-fixed-top");
      }
      lastScrollTop = st;
    }
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
    const res = await axios.get("http://localhost:8080/api/wishlist/");
    console.log("result", res);
    setWishlistProducts([
      ...res?.data?.map((item) => {
        return item.wishlistProduct._id;
      }),
    ]);
  };

  const getProducts = async ({ params, category }) => {
    // const searchString = location.search;
    console.log("calling Getproducts Function");
    if (params) {
      var url = new URL("http://localhost:8080/api/products");
      if (params?.brands)
        url.searchParams.set("brand", params?.brands?.split(","));
      if (params?.gender) url.searchParams.set("gender", params?.gender);
      if (params?.p) url.searchParams.set("p", params?.p);
      if (params.sort) url.searchParams.set("sort", params?.sort);
    }

    console.log("URL______: ", url);
    try {
      const res2 = await axios.get(
        `http://localhost:8080/api/products?category=${cat}`
      );
      const res = await axios.get(
        // cat ? `http://localhost:8080/api/products?category=${cat}`
        //   : "http://localhost:8080/api/products"
        // `http://localhost:8080/api/products${searchString}`
        url ? `${url}` : `http://localhost:8080/api/products?category=${cat}`
      );

      if (res2) {
        const brandData = [
          ...new Set(
            res2.data.products?.map((item) => {
              return item.brand;
            })
          ),
        ]?.map((key) => ({ key: key, value: key }));

        setBrand(brandData);
      }
      setProducts(res.data.products);
      if (res) {
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
    console.log("filterArray checked", checked);
    if (checked) {
      let previous = params?.brands?.length ? params?.brands?.split(",") : "";
      const brands = previous
        ? [...previous, value].toString()
        : [value].toString();
      setSearchParams({ ...params, ...(brands && { brands }) });
    } else {
      const filterArray = params?.brands?.split(",").filter((e) => e !== value);
      console.log("brands ar", filterArray);
      const brands = filterArray?.length
        ? filterArray?.join(",")?.toString()
        : "";
      console.log("brands", brands);
      let _temp = { ...params, ...(brands && { brands }) };
      setSearchParams(brands ? _temp : omit(_temp, "brands"));
    }

    // console.log(`Value ${value} checked ${checked}`);
    // // setBrand(Brand.filter((e) => e !== value));

    // // -.compact
    // props?.getProducts({ params });
    // getProducts({ params });
  };

  const handelChangeGender = (e) => {
    const value = e.target.value;
    console.log("value", e.target?.value);
    const _params = { ...params, ...(value && { gender: value }) };
    setSearchParams(_params);

    getProducts({ params });
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
    getProducts({ params });
  };

  const handelPagination = (p) => {
    if (p > 1) {
      const _params = { ...params, ...(p > 1 && { p: p }) };
      setSearchParams(_params);
    } else {
      let _temp = { ...params, ...(p && { p }) };
      setSearchParams(p > 1 ? _temp : omit(_temp, "p"));
    }

    setPageNo(parseInt(p));
    getProducts({ params });
  };

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
          <LeftSection>
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
                  <div style={{ position: "relative" }}>
                    <SortByContainer>
                      <div>
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
                  </div>

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
                              value={brand?.key}
                              onChange={handelChange}
                              checked={Boolean(
                                params?.brands?.includes(brand?.key)
                              )}
                            />
                            {brand?.value?.toUpperCase()}
                          </Label1>
                        </Li1>
                      ))}
                    </Ul>
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
                              value={brand?.key}
                              onChange={handelChange}
                              checked={Boolean(
                                params?.brands?.includes(brand?.key)
                              )}
                            />
                            {brand?.value?.toUpperCase()}
                          </Label1>
                        </Li1>
                      ))}
                    </Ul>
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
                              value={brand?.key}
                              onChange={handelChange}
                              checked={Boolean(
                                params?.brands?.includes(brand?.key)
                              )}
                            />
                            {brand?.value?.toUpperCase()}
                          </Label1>
                        </Li1>
                      ))}
                    </Ul>
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
                              value={brand?.key}
                              onChange={handelChange}
                              checked={Boolean(
                                params?.brands?.includes(brand?.key)
                              )}
                            />
                            {brand?.value?.toUpperCase()}
                          </Label1>
                        </Li1>
                      ))}
                    </Ul>
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
                              value={brand?.key}
                              onChange={handelChange}
                              checked={Boolean(
                                params?.brands?.includes(brand?.key)
                              )}
                            />
                            {brand?.value?.toUpperCase()}
                          </Label1>
                        </Li1>
                      ))}
                    </Ul>
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
                              value={brand?.key}
                              onChange={handelChange}
                              checked={Boolean(
                                params?.brands?.includes(brand?.key)
                              )}
                            />
                            {brand?.value?.toUpperCase()}
                          </Label1>
                        </Li1>
                      ))}
                    </Ul>
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
                              value={brand?.key}
                              onChange={handelChange}
                              checked={Boolean(
                                params?.brands?.includes(brand?.key)
                              )}
                            />
                            {brand?.value?.toUpperCase()}
                          </Label1>
                        </Li1>
                      ))}
                    </Ul>
                  </CategoriesDiv1>

                  <CategoriesDiv1>
                    <Ul1>
                      {GenderArrays?.map((gender, i) => (
                        <Li1 key={i}>
                          <Label1>
                            <Input
                              type="radio"
                              name="gender"
                              value={gender?.toLowerCase()}
                              style={{
                                accentColor: "#ff3f6c",
                              }}
                              onChange={handelChangeGender}
                              checked={Boolean(
                                params?.gender === gender?.toLowerCase()
                              )}
                            />
                            {gender.toUpperCase()}
                          </Label1>
                        </Li1>
                      ))}
                    </Ul1>
                  </CategoriesDiv1>
                </div>

                {/* <Checkbox products={products} getProducts={getProducts} /> */}
                <ColorDiv>
                  <ColorSpan>Color</ColorSpan>
                  <Ul>
                    <Li>
                      <Label>
                        <Input type="checkbox" value="Tshirts" />
                        <ColorDisplay color={"green"}></ColorDisplay>
                        Roadster
                      </Label>
                    </Li>
                    <Li>
                      <Label>
                        <Input type="checkbox" value="Tshirts" />
                        <ColorDisplay color={"limeGreen"}></ColorDisplay>
                        WRONG
                      </Label>
                    </Li>
                  </Ul>
                </ColorDiv>
              </LeftSectionDiv>
            </Section>
          </LeftSection>
          <RightSection>
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
          </RightSection>
        </RowBase>
      </Main>
      <Banner />
    </div>
  );
};

export default TempProduct;
