import React, { useState, useEffect } from "react";
import Category from "../../components/Category/Category";
import { request } from "../../utils/api/axios";
import Select from "react-select";
import "./CreateCategory.css";

const CreateCategory = () => {
  const [category, setCategory] = useState([]);
  const [CategoryOptions, SetCategoryOptions] = useState([]);
  const [CategoryTypes, SetCategoryTypes] = useState([]);
  const [categoryData, setCategoryData] = useState(null);
  const [input, setInput] = useState(null);

  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const callGetCategory = async () => {
    const res = await request.get(`/category`);
    if (res) {
      console.log(res.data);
      // Function to merge all categories into one array
      function getAllCategoriesData(categories) {
        const allCategories = [];

        categories.forEach((category) => {
          allCategories.push(category);
          if (category.children && category.children.length > 0) {
            allCategories.push(...getAllCategoriesData(category.children));
          }
        });

        return allCategories;
      }

      // Call the function and get all categories data into one array
      const allCategoriesData = getAllCategoriesData(res.data);
      SetCategoryOptions(allCategoriesData);
      console.log("allCategoriesData", allCategoriesData);
      setCategory(res.data);
    }
  };
  const handleClickCategory = (e, id, name) => {
    e.stopPropagation();

    // console.log("categoryClick");
    // console.log(categoryId, categoryName);
    setCategoryData({ ...categoryData, id, name });
  };
  const CategoryOption = CategoryOptions.map((category) => ({
    value: category._id,
    id: category._id,
    label: `${category.name}, ${category.namepath}, ${category.categoryPath}`,
  }));

  //   console.log("CategoryOptions", CategoryOptions);
  //   console.log("category", category);
  //   console.log("input", input);
  //   console.log("categoryTypes", CategoryTypes);
  //   console.log("categoryData", categoryData);

  const handleCreateCategory = () => {
    const response = request.post("/category/", {
      name: input?.name,
      namepath: input?.namepath.split(" ").join("-"),
      parentId: categoryData?.id,
      categoryType: CategoryTypes,
    });
    if (response) {
      console.log("successfully created category");
      callGetCategory();
    }
  };
  useEffect(() => {
    callGetCategory();
  }, []);
  return (
    <div className="CategoryMain">
      <div className="createCategoryMain">
        <div className="addProductItem">
          <label>Name</label>
          <input
            style={{ width: "400px" }}
            name="name"
            type="text"
            value={input?.name}
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Namepath</label>
          <input
            style={{ width: "400px" }}
            name="namepath"
            type="text"
            value={input?.namepath}
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem" style={{ width: "420px" }}>
          <label>Parent Category</label>
          <input
            style={{ width: "400px" }}
            name="parent category"
            type="text"
            value={categoryData?.name || ""}
            onChange={handleClickCategory}
          />
        </div>
        <div className="addProductItem" style={{ width: "420px" }}>
          <label>Category Types</label>
          <Select
            options={CategoryOption}
            onChange={(values) => {
              SetCategoryTypes(values.map((option) => option.id));
            }}
            isMulti
          ></Select>
        </div>
        <div>
          <button onClick={handleCreateCategory}>Create Category</button>
        </div>
      </div>
      <div>
        <Category data={category} handleClick={handleClickCategory} />
      </div>
    </div>
  );
};

export default CreateCategory;
