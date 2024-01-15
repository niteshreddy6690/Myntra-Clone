import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { omit } from "lodash";
import styled from "styled-components";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const CategoriesDiv = styled.div`
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
const Ul = styled.ul`
  font-weight: 400;
  margin: 0;
  padding: 0;
  list-style: none;
`;
const Li = styled.li`
  font-size: 14px;
  margin-bottom: 7px;
`;
const Input = styled.input`
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
const Label = styled.label`
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

const paramsToObject = (entries) => {
  const result = {};
  for (const [key, value] of entries) {
    result[key] = value;
  }
  
  return result;
};
const useSearchQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchEntries = searchParams.entries();
  
  const params = paramsToObject(searchEntries);
  
  return { params, setSearchParams };
};

const Checkbox = (props) => {
  const Brands = ["roadster", "wrong", "highlander", "h&m", "levis"].map(
    (key) => ({ key: key, value: key })
  );

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
  const [checkedValues, setCheckedValues] = useState([]);
  const location = useLocation();
  
  
  

  //   useEffect(() => {
  //     const searchKey = searchParams.get("Brand");
  //     if (searchKey) {
  //       setCheckedValues(searchKey.split(","));
  //       
  //     }
  //   }, [searchParams]);

  /*  useEffect(() => {
    // if (Brand.length > 0) {
    //   setSearchParams({ ...searchParams, Brand: Brand.toString() });
    // }
    // if (Gender.length > 0) {
    //   setSearchParams({ ...searchParams, Gender: Gender.toString() });
    // }
    // 

    
    const brand = params?.Brand?.split(",");
    setBrand(brand);
  }, [searchParams]);*/

  useEffect(() => {
    props?.getProducts({ params });
    params?.sort && setSort(sortDic[params?.sort]);
    params?.p && setPageNo(parseInt(params?.p));
  }, []);
  const handelChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    
    if (checked) {
      let previous = params?.brands?.length ? params?.brands?.split(",") : "";
      const brands = previous
        ? [...previous, value].toString()
        : [value].toString();
      setSearchParams({ ...params, ...(brands && { brands }) });
    } else {
      const filterArray = params?.brands?.split(",").filter((e) => e !== value);
      
      const brands = filterArray?.length
        ? filterArray?.join(",")?.toString()
        : "";
      
      let _temp = { ...params, ...(brands && { brands }) };
      setSearchParams(brands ? _temp : omit(_temp, "brands"));
    }

    // 
    // // setBrand(Brand.filter((e) => e !== value));

    // // -.compact
    props?.getProducts({ params });
  };

  const handelChangeGender = (e) => {
    const value = e.target.value;
    

    const _params = { ...params, ...(value && { gender: value }) };
    setSearchParams(_params);
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
    const _params = { ...params, ...(value && { sort: value }) };
    setSearchParams(_params);
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
  };

  // useEffect(() => {
  //   const searchKey = searchParams.get("search");
  //   if (Gender) {
  //     handelSearch(searchKey);
  //   }
  // }, [searchParams]);

  return (
    <div>
      <div style={{ position: "relative" }}>
        <SortByContainer>
          <div>
            Sort by : <span>{SortValue ? SortValue : "Recommended"}</span>
            <span className="sort-downArrow">
              <KeyboardArrowDownIcon style={{ fontSize: `25px` }} />
            </span>
          </div>
          <Ul className="sort-list">
            {sortObject?.map((item) => (
              <>
                <li>
                  <label
                    className="sort-label"
                    style={
                      params?.sort == item?.value
                        ? { backgroundColor: " #f4f4f5", fontWeight: "700" }
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
          </Ul>
        </SortByContainer>
      </div>

      <CategoriesDiv>
        <span className="vertical-filters-header">Brand</span>
        <Ul>
          {Brands?.map((brand, i) => (
            <Li key={i}>
              <Label>
                <Input
                  style={{
                    accentColor: "#ff3f6c",
                  }}
                  type="checkbox"
                  name="brand"
                  value={brand?.key}
                  onChange={handelChange}
                  checked={Boolean(params?.brands?.includes(brand?.key))}
                />
                {brand?.value?.toUpperCase()}
              </Label>
            </Li>
          ))}
        </Ul>
      </CategoriesDiv>
      <CategoriesDiv>
        <Ul>
          {GenderArrays?.map((gender, i) => (
            <Li key={i}>
              <Label>
                <Input
                  type="radio"
                  name="gender"
                  value={gender?.toLowerCase()}
                  style={{
                    accentColor: "#ff3f6c",
                  }}
                  onChange={handelChangeGender}
                  checked={Boolean(params?.gender === gender?.toLowerCase())}
                />
                {gender.toUpperCase()}
              </Label>
            </Li>
          ))}
        </Ul>
        <div style={{ position: "absolute" }}>
          {PageNo > 1 ? (
            <button onClick={() => handelPagination(parseInt(PageNo - 1))}>
              Pre
            </button>
          ) : null}
          {pages?.map((item) => (
            <>
              <button
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
            </>
          ))}

          {PageNo < 5 ? (
            <button onClick={() => handelPagination(parseInt(PageNo + 1))}>
              Next
            </button>
          ) : null}
        </div>
      </CategoriesDiv>
    </div>
  );
};

export default Checkbox;
