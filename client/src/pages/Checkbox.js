import React, { useState, useEffect } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { omit } from "lodash";
import styled from "styled-components";

const CategoriesDiv = styled.div`
  text-align: start;
  position: relative;
  border-right: none !important;
  border-bottom: 1px solid #e9e9ed;
  padding: 20px 0 15px 25px;
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

const Checkbox = (props) => {
  const Brands = ["roadster", "wrong", "highlander", "h&m", "levis"].map(
    (key) => ({ key: key, value: key })
  );
  const GenderArrays = ["Men", "Women", "Boys", "Girls", "Unisex"];

  const { params, setSearchParams } = useSearchQuery();
  const [Brand, setBrand] = useState([]);
  const [Gender, setGender] = useState([]);
  const [checkedValues, setCheckedValues] = useState([]);
  console.log("params", params);
  console.log("Brand", Brand);
  console.log("Params", params);

  //   useEffect(() => {
  //     const searchKey = searchParams.get("Brand");
  //     if (searchKey) {
  //       setCheckedValues(searchKey.split(","));
  //       console.log("Search Key", searchKey);
  //     }
  //   }, [searchParams]);

  /*  useEffect(() => {
    // if (Brand.length > 0) {
    //   setSearchParams({ ...searchParams, Brand: Brand.toString() });
    // }
    // if (Gender.length > 0) {
    //   setSearchParams({ ...searchParams, Gender: Gender.toString() });
    // }
    // console.log("params", params);

    console.log("slipptimng", params?.Brand?.split(","));
    const brand = params?.Brand?.split(",");
    setBrand(brand);
  }, [searchParams]);*/

  useEffect(() => {
    props?.getProducts({ params });
  }, []);
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
    props?.getProducts({ params });
  };

  const handelChangeGender = (e) => {
    const value = e.target.value;
    console.log("value", e.target?.value);

    const _params = { ...params, ...(value && { gender: value }) };
    setSearchParams(_params);
  };
  // useEffect(() => {
  //   const searchKey = searchParams.get("search");
  //   if (Gender) {
  //     handelSearch(searchKey);
  //   }
  // }, [searchParams]);

  return (
    <div>
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
      <br />

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
      </CategoriesDiv>
    </div>
  );
};

export default Checkbox;
