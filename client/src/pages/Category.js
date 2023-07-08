import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import axios from "axios";
import styled from "styled-components";
import ChevronRightTwoToneIcon from "@mui/icons-material/ChevronRightTwoTone";
import ArrowDropDownTwoToneIcon from "@mui/icons-material/ArrowDropDownTwoTone";
import ArrowRightTwoToneIcon from "@mui/icons-material/ArrowRightTwoTone";
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
`;

// const RenderCategories = ({ categories, handleClick, show }) => {
//   const [childVisible, setChildVisiblity] = useState(false);

//   //   const hasChild = category?.children?.length > 0 ? true : false;
//   return categories?.map((category) => (
//     <li
//       key={category.name}
//       onClick={(e) => handleClick(e, category._id, category.name)}
//       style={{ textTransform: "capitalize" }}
//     >
//       <div
//         className="modify"
//         onClick={(e) => {
//           e.stopPropagation();
//           setChildVisiblity((v) => !v);
//         }}
//       >
//         {category?.children?.length > 0 && childVisible ? (
//           <ArrowRightTwoToneIcon />
//         ) : category?.children?.length > 0 ? (
//           <ArrowDropDownTwoToneIcon />
//         ) : null}
//         <span>{category.name}</span>
//       </div>
//       {/* <span className="modify" onClick={(e) => setChildVisiblity((v) => !v)}>
//         {category.name}
//       </span> */}

//       {category.children.length > 0 && childVisible ? (
//         <ul>
//           <RenderCategories
//             categories={category.children}
//             handleClick={handleClick}
//           />
//         </ul>
//       ) : null}
//     </li>
//   ));
// };

// const Category = () => {
//   const [categories, setCategories] = useState([]);
//   const [show, setShow] = useState(true);

//   const initialState = {
//     name: "",
//     parentId: null,
//     parentCategory: null,
//   };

//   const [data, setData] = useState(initialState);
//   const callApi = async () => {
//     const res = await axios.get(`http://localhost:8080/api/category/${null}`);
//     setCategories(res.data);
//   };
//   useEffect(() => {
//     callApi();
//   }, []);

//   const handleClick = (e, parentId, categoryName) => {
//     e.stopPropagation();
//     console.log("categoryName", categoryName);
//     console.log("category_Id", parentId);
//     console.log("show", show);
//     setShow(!show);
//     setData({ ...data, parentId: parentId, parentCategory: categoryName });
//   };
//   const handleChange = (e) => {
//     setData({ ...data, name: e.target.value });
//   };

//   const handleSubmit = async () => {
//     console.log("data", data);
//     const res = await axios.post(`http://localhost:8080/api/category/`, data);
//     console.log("res after adding data", res);
//     if (res) {
//       callApi();
//     }
//   };

//   return (
//     <MainContainer>
//       <Navbar />
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-around",
//           alignItems: "center",
//         }}
//       >
//         <div>
//           <ul>
//             <RenderCategories
//               categories={categories}
//               handleClick={handleClick}
//               show={show}
//             />
//           </ul>
//         </div>

//         <div>
//           <div>
//             <span>Parent Category : </span>
//             <span style={{ textTransform: "capitalize" }}>
//               {data.parentCategory}
//             </span>
//           </div>
//           <input onChange={handleChange} />
//           <button onClick={handleSubmit}>Add New Category</button>
//         </div>
//       </div>
//     </MainContainer>
//   );
// };

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(true);

  const initialState = {
    name: "",
    parentId: null,
    parentCategory: null,
  };

  const [data, setData] = useState(initialState);

  const callApi = async () => {
    const res = await axios.get(`http://localhost:8080/api/category`);
    setCategories(res.data);
  };
  useEffect(() => {
    callApi();
  }, []);

  const handleInitial = () => {
    setData(initialState);
  };
  const handleClick = (e, parentId, categoryName) => {
    e.stopPropagation();
    console.log("categoryName", categoryName);
    console.log("category_Id", parentId);
    console.log("show", show);
    // setShow(!show);
    setData({ ...data, parentId: parentId, parentCategory: categoryName });
  };
  const handleChange = (e) => {
    setData({ ...data, name: e.target.value });
  };

  const handleSubmit = async () => {
    console.log("data", data);
    const res = await axios.post(`http://localhost:8080/api/category/`, data);
    console.log("res after adding data", res);
    if (res) {
      callApi();
    }
  };
  return (
    <div style={{ margin: "30px" }}>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div>
          <h2>Categories</h2>
          <Tree categories={categories} handleClick={handleClick} />
        </div>
        <div>
          {data.parentCategory ? (
            <div>
              <span>Parent Category : </span>

              <span style={{ textTransform: "capitalize" }}>
                {data.parentCategory}
              </span>
            </div>
          ) : null}
          <button style={{ width: "150px" }} onClick={handleInitial}>
            New Category
          </button>
          <div
            style={{ display: "flex", flexDirection: "row", width: "500px" }}
          >
            <input onChange={handleChange} />

            <button onClick={handleSubmit}>Add New Sub Category</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Tree = ({ categories, handleClick }) => {
  return (
    <MainContainer style={{ backgroundColor: "lightblue" }}>
      <div className="d-tree">
        <ul className="d-tree-container">
          {categories.map((category) => (
            <TreeNode category={category} handleClick={handleClick} />
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
          <ArrowRightTwoToneIcon />
        ) : hasChild ? (
          <ArrowDropDownTwoToneIcon />
        ) : null}
        <span>{category.name}</span>
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
