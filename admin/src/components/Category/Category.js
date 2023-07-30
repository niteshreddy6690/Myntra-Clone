import { request } from "../../utils/api/axios";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import ArrowDropDownTwoToneIcon from "@mui/icons-material/ArrowDropDownTwoTone";
import ArrowRightTwoToneIcon from "@mui/icons-material/ArrowRightTwoTone";

const Container = styled.div`
  display: block;
  width: 500px;
  background-color: aliceblue;
  clear: both;
`;
const MainContainer = styled.div`
  box-sizing: border-box;
  height .d-tree-container {
    list-style: none;
  }
  ul {
    list-style: none;
    margin-block-start: 0px;
    margin-block-end: 16px;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 15px;
  }
  li {
    margin: 5px;
  }
  .modify {
    vertical-align: middle;
    height: 25px;
    align-items: center;
    display: flex;
  }
  .modify .category-name {
    cursor: pointer;
  }
`;
const Category = ({ handleClick, data }) => {
  const [categories, setCategories] = useState([]);

  const callApi = async () => {
    const res = await request.get(`/category`);
    setCategories(res.data);
  };
  useEffect(() => {
    callApi(data);
  }, []);

  return (
    <Container>
      <div>
        {data?.categoryName ? (
          <div>
            <span>Selected Category : </span>
            <span style={{ textTransform: "capitalize" }}>
              {data?.categoryName}
            </span>
          </div>
        ) : null}
      </div>
      <div style={{ margin: "30px" }}>
        <div>
          <h3>Select Category</h3>
          <Tree categories={categories} handleClick={handleClick} />
        </div>
      </div>
    </Container>
  );
};

// const DraggableElement = styled.div``;

const Tree = ({ categories, handleClick }) => {
  return (
    <MainContainer>
      <div className="d-tree">
        <ul className="d-tree-container">
          {categories.map((category, i) => (
            <TreeNode key={i} category={category} handleClick={handleClick} />
          ))}
        </ul>
      </div>
    </MainContainer>
  );
};

const TreeNode = ({ category, handleClick }) => {
  const [childVisible, setChildVisiblity] = useState(false);

  const hasChild = category?.children?.length > 0 ? true : false;

  return (
    <li style={{ textTransform: "capitalize" }}>
      <div
        className="modify"
        onClick={(e) => {
          setChildVisiblity((v) => !v);
          handleClick(e, category._id, category.name);
        }}
      >
        {hasChild && childVisible ? (
          <ArrowRightTwoToneIcon x={{ marginRight: "5px" }} />
        ) : hasChild ? (
          <ArrowDropDownTwoToneIcon sx={{ marginRight: "5px" }} />
        ) : null}
        <span className="category-name">{category.name}</span>
      </div>

      {hasChild && childVisible && (
        <ul className="d-flex d-tree-container flex-column">
          <Tree categories={category.children} handleClick={handleClick} />
        </ul>
      )}
    </li>
  );
};

export default Category;
