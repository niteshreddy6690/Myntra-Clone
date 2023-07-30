import { useEffect, useMemo, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { userRequest } from "../../requestMethods";
import { updateProduct } from "../../redux/apiCalls";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { useDispatch } from "react-redux";
import { Audio, Oval } from "react-loader-spinner";
import { request } from "../../utils/api/axios";
import Select from "react-select";
import styled from "styled-components";
import axios from "axios";
import transparentFolderImage from "../../Assets/png/folder_icon_transparent.png";
import closeIconSvg from "../../Assets/svg/CloseIcon.svg";

import Category from "../../components/Category/Category";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 36px 38px;
  /* box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px; */
  border-radius: 20px;
  text-align: center;
`;
const Image = styled.img`
  width: ${({ isLarge }) => (isLarge ? "150px" : "115px")};
  height: ${({ isLarge }) => (isLarge ? "200px" : "140px")};
  opacity: ${({ isLarge }) => (isLarge ? "1" : ".9")};
  margin: 15px;
  object-fit: unset;
  border-radius: 5px;
  &:hover {
    opacity: 1;
  }
`;

const Input = styled.input`
  display: none;
`;
const DraggableDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  margin-top: 20px;
  border: 1.3px dashed #799cd9;
  border-radius: 5px;
  min-width: 450px;
  min-height: 300px;
  width: 650px;
  background-color: #fff;

  label {
    width: 100px;
    margin: 0 0 0 10px;
    cursor: pointer;
  }
  label p {
    margin-top: -20px;
    color: #0a0a0a;
  }
`;

const ImagePreViewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
`;
const ImagePreview = styled.div`
  position: relative;

  .closeIcon {
    background: #000;
    border-radius: 5px;
    opacity: 0.8;
    position: absolute;
    z-index: 10;
    right: 20px;
    top: 20px;
    width: 15px;
    height: 15px;
    cursor: pointer;
    :hover {
      opacity: 1;
    }
  }
`;

const Colors = [
  {
    name: "Alice Blue",
    hex: "#F0F8FF",
    rgb: "rgb(240, 248, 255)",
  },
  {
    name: "Antique White",
    hex: "#FAEBD7",
    rgb: "rgb(250, 235, 215)",
  },
  {
    name: "Aqua",
    hex: "#00FFFF",
    rgb: "rgb(0, 255, 255)",
  },
  {
    name: "Aquamarine",
    hex: "#7FFFD4",
    rgb: "rgb(127, 255, 212)",
  },
  {
    name: "Azure",
    hex: "#F0FFFF",
    rgb: "rgb(240, 255, 255)",
  },
  {
    name: "Beige",
    hex: "#F5F5DC",
    rgb: "rgb(245, 245, 220)",
  },
  {
    name: "Bisque",
    hex: "#FFE4C4",
    rgb: "rgb(255, 228, 196)",
  },
  {
    name: "Black",
    hex: "#000000",
    rgb: "rgb(0, 0, 0)",
  },
  {
    name: "Blanched Almond",
    hex: "#FFEBCD",
    rgb: "rgb(255, 235, 205)",
  },
  {
    name: "Blue",
    hex: "#0000FF",
    rgb: "rgb(0, 0, 255)",
  },
  {
    name: "Blue Violet",
    hex: "#8A2BE2",
    rgb: "rgb(138, 43, 226)",
  },
  {
    name: "Brown",
    hex: "#A52A2A",
    rgb: "rgb(165, 42, 42)",
  },
  {
    name: "Burlywood",
    hex: "#DEB887",
    rgb: "rgb(222, 184, 135)",
  },
  {
    name: "Cadet Blue",
    hex: "#5F9EA0",
    rgb: "rgb(95, 158, 160)",
  },
  {
    name: "Chartreuse",
    hex: "#7FFF00",
    rgb: "rgb(127, 255, 0)",
  },
  {
    name: "Chocolate",
    hex: "#D2691E",
    rgb: "rgb(210, 105, 30)",
  },
  {
    name: "Coral",
    hex: "#FF7F50",
    rgb: "rgb(255, 127, 80)",
  },
  {
    name: "Cornflower Blue",
    hex: "#6495ED",
    rgb: "rgb(100, 149, 237)",
  },
  {
    name: "Cornsilk",
    hex: "#FFF8DC",
    rgb: "rgb(255, 248, 220)",
  },
  {
    name: "Crimson",
    hex: "#DC143C",
    rgb: "rgb(220, 20, 60)",
  },
  {
    name: "Cyan",
    hex: "#00FFFF",
    rgb: "rgb(0, 255, 255)",
  },
  {
    name: "Dark Blue",
    hex: "#00008B",
    rgb: "rgb(0, 0, 139)",
  },
  {
    name: "Dark Cyan",
    hex: "#008B8B",
    rgb: "rgb(0, 139, 139)",
  },
  {
    name: "Dark Goldenrod",
    hex: "#B8860B",
    rgb: "rgb(184, 134, 11)",
  },
  {
    name: "Dark Gray",
    hex: "#A9A9A9",
    rgb: "rgb(169, 169, 169)",
  },
  {
    name: "Dark Green",
    hex: "#006400",
    rgb: "rgb(0, 100, 0)",
  },
  {
    name: "Dark Khaki",
    hex: "#BDB76B",
    rgb: "rgb(189, 183, 107)",
  },
  {
    name: "Dark Magenta",
    hex: "#8B008B",
    rgb: "rgb(139, 0, 139)",
  },
  {
    name: "Dark Olive Green",
    hex: "#556B2F",
    rgb: "rgb(85, 107, 47)",
  },
  {
    name: "Dark Orange",
    hex: "#FF8C00",
    rgb: "rgb(255, 140, 0)",
  },
  {
    name: "Dark Orchid",
    hex: "#9932CC",
    rgb: "rgb(153, 50, 204)",
  },
  {
    name: "Dark Red",
    hex: "#8B0000",
    rgb: "rgb(139, 0, 0)",
  },
  {
    name: "Dark Salmon",
    hex: "#E9967A",
    rgb: "rgb(233, 150, 122)",
  },
  {
    name: "Dark Sea Green",
    hex: "#8FBC8F",
    rgb: "rgb(143, 188, 143)",
  },
  {
    name: "Dark Slate Blue",
    hex: "#483D8B",
    rgb: "rgb(72, 61, 139)",
  },
  {
    name: "Dark Slate Gray",
    hex: "#2F4F4F",
    rgb: "rgb(47, 79, 79)",
  },
  {
    name: "Dark Turquoise",
    hex: "#00CED1",
    rgb: "rgb(0, 206, 209)",
  },
  {
    name: "Dark Violet",
    hex: "#9400D3",
    rgb: "rgb(148, 0, 211)",
  },
  {
    name: "Deep Pink",
    hex: "#FF1493",
    rgb: "rgb(255, 20, 147)",
  },
  {
    name: "Deep Sky Blue",
    hex: "#00BFFF",
    rgb: "rgb(0, 191, 255)",
  },
  {
    name: "Dim Gray",
    hex: "#696969",
    rgb: "rgb(105, 105,105)",
  },
  {
    name: "Dodger Blue",
    hex: "#1E90FF",
    rgb: "rgb(30, 144, 255)",
  },
  {
    name: "Firebrick",
    hex: "#B22222",
    rgb: "rgb(178, 34, 34)",
  },
  {
    name: "Floral White",
    hex: "#FFFAF0",
    rgb: "rgb(255, 250, 240)",
  },
  {
    name: "Forest Green",
    hex: "#228B22",
    rgb: "rgb(34, 139, 34)",
  },
  {
    name: "Fuchsia",
    hex: "#FF00FF",
    rgb: "rgb(255, 0, 255)",
  },
  {
    name: "Gainsboro",
    hex: "#DCDCDC",
    rgb: "rgb(220, 220, 220)",
  },
  {
    name: "Ghost White",
    hex: "#F8F8FF",
    rgb: "rgb(248, 248, 255)",
  },
  {
    name: "Gold",
    hex: "#FFD700",
    rgb: "rgb(255, 215, 0)",
  },
  {
    name: "Goldenrod",
    hex: "#DAA520",
    rgb: "rgb(218, 165, 32)",
  },
  {
    name: "Gray",
    hex: "#808080",
    rgb: "rgb(128, 128, 128)",
  },
  {
    name: "Green",
    hex: "#008000",
    rgb: "rgb(0, 128, 0)",
  },
  {
    name: "Green Yellow",
    hex: "#ADFF2F",
    rgb: "rgb(173, 255, 47)",
  },
  {
    name: "Honeydew",
    hex: "#F0FFF0",
    rgb: "rgb(240, 255, 240)",
  },
  {
    name: "Hot Pink",
    hex: "#FF69B4",
    rgb: "rgb(255, 105, 180)",
  },
  {
    name: "Indian Red",
    hex: "#CD5C5C",
    rgb: "rgb(205, 92, 92)",
  },
  {
    name: "Indigo",
    hex: "#4B0082",
    rgb: "rgb(75, 0, 130)",
  },
  {
    name: "Ivory",
    hex: "#FFFFF0",
    rgb: "rgb(255, 255, 240)",
  },
  {
    name: "Khaki",
    hex: "#F0E68C",
    rgb: "rgb(240, 230, 140)",
  },
  {
    name: "Lavender",
    hex: "#E6E6FA",
    rgb: "rgb(230, 230, 250)",
  },
  {
    name: "Lavender Blush",
    hex: "#FFF0F5",
    rgb: "rgb(255, 240, 245)",
  },
  {
    name: "Lawn Green",
    hex: "#7CFC00",
    rgb: "rgb(124, 252, 0)",
  },
  {
    name: "Lemon Chiffon",
    hex: "#FFFACD",
    rgb: "rgb(255, 250, 205)",
  },
  {
    name: "Light Blue",
    hex: "#ADD8E6",
    rgb: "rgb(173, 216, 230)",
  },
  {
    name: "Light Coral",
    hex: "#F08080",
    rgb: "rgb(240, 128, 128)",
  },
  {
    name: "Light Cyan",
    hex: "#E0FFFF",
    rgb: "rgb(224, 255, 255)",
  },
  {
    name: "Light Goldenrod Yellow",
    hex: "#FAFAD2",
    rgb: "rgb(250, 250, 210)",
  },
  {
    name: "Light Gray",
    hex: "#D3D3D3",
    rgb: "rgb(211, 211, 211)",
  },
  {
    name: "Light Green",
    hex: "#90EE90",
    rgb: "rgb(144, 238, 144)",
  },
  {
    name: "Light Pink",
    hex: "#FFB6C1",
    rgb: "rgb(255, 182, 193)",
  },
  {
    name: "Light Salmon",
    hex: "#FFA07A",
    rgb: "rgb(255, 160, 122)",
  },
  {
    name: "Light Sea Green",
    hex: "#20B2AA",
    rgb: "rgb(32, 178, 170)",
  },
  {
    name: "Light Sky Blue",
    hex: "#87CEFA",
    rgb: "rgb(135, 206, 250)",
  },
  {
    name: "Light Slate Gray",
    hex: "#778899",
    rgb: "rgb(119, 136, 153)",
  },
  {
    name: "Light Steel Blue",
    hex: "#B0C4DE",
    rgb: "rgb(176, 196, 222)",
  },
  {
    name: "Light Yellow",
    hex: "#FFFFE0",
    rgb: "rgb(255, 255, 224)",
  },
  {
    name: "Lime",
    hex: "#00FF00",
    rgb: "rgb(0, 255, 0)",
  },
  {
    name: "Lime Green",
    hex: "#32CD32",
    rgb: "rgb(50, 205, 50)",
  },
  {
    name: "Linen",
    hex: "#FAF0E6",
    rgb: "rgb(250, 240, 230)",
  },
  {
    name: "Magenta",
    hex: "#FF00FF",
    rgb: "rgb(255, 0, 255)",
  },
  {
    name: "Maroon",
    hex: "#800000",
    rgb: "rgb(128, 0, 0)",
  },
  {
    name: "Medium Aquamarine",
    hex: "#66CDAA",
    rgb: "rgb(102, 205, 170)",
  },
  {
    name: "Medium Blue",
    hex: "#0000CD",
    rgb: "rgb(0, 0, 205)",
  },
  {
    name: "Medium Orchid",
    hex: "#BA55D3",
    rgb: "rgb(186, 85, 211)",
  },
  {
    name: "Medium Purple",
    hex: "#9370DB",
    rgb: "rgb(147, 112, 219)",
  },
  {
    name: "Medium Sea Green",
    hex: "#3CB371",
    rgb: "rgb(60, 179, 113)",
  },
  {
    name: "Medium Slate Blue",
    hex: "#7B68EE",
    rgb: "rgb(123, 104, 238)",
  },
  {
    name: "Medium Spring Green",
    hex: "#00FA9A",
    rgb: "rgb(0, 250, 154)",
  },
  {
    name: "Medium Turquoise",
    hex: "#48D1CC",
    rgb: "rgb(72, 209, 204)",
  },
  {
    name: "Medium Violet Red",
    hex: "#C71585",
    rgb: "rgb(199, 21, 133)",
  },
  {
    name: "Midnight Blue",
    hex: "#191970",
    rgb: "rgb(25, 25, 112)",
  },
  {
    name: "Mint Cream",
    hex: "#F5FFFA",
    rgb: "rgb(245, 255, 250)",
  },
  {
    name: "Misty Rose",
    hex: "#FFE4E1",
    rgb: "rgb(255, 228, 225)",
  },
  {
    name: "Moccasin",
    hex: "#FFE4B5",
    rgb: "rgb(255, 228, 181)",
  },
  {
    name: "Navajo White",
    hex: "#FFDEAD",
    rgb: "rgb(255, 222, 173)",
  },
  {
    name: "Navy",
    hex: "#000080",
    rgb: "rgb(0, 0, 128)",
  },
  {
    name: "Old Lace",
    hex: "#FDF5E6",
    rgb: "rgb(253, 245, 230)",
  },
  {
    name: "Olive",
    hex: "#808000",
    rgb: "rgb(128, 128, 0)",
  },
  {
    name: "Olive Drab",
    hex: "#6B8E23",
    rgb: "rgb(107, 142, 35)",
  },
  {
    name: "Orange",
    hex: "#FFA500",
    rgb: "rgb(255, 165, 0)",
  },
  {
    name: "Orange Red",
    hex: "#FF4500",
    rgb: "rgb(255, 69, 0)",
  },
  {
    name: "Orchid",
    hex: "#DA70D6",
    rgb: "rgb(218, 112, 214)",
  },
  {
    name: "Pale Goldenrod",
    hex: "#EEE8AA",
    rgb: "rgb(238, 232, 170)",
  },
  {
    name: "Pale Green",
    hex: "#98FB98",
    rgb: "rgb(152, 251, 152)",
  },
  {
    name: "Pale Turquoise",
    hex: "#AFEEEE",
    rgb: "rgb(175, 238, 238)",
  },
  {
    name: "Pale Violet Red",
    hex: "#DB7093",
    rgb: "rgb(219, 112, 147)",
  },
  {
    name: "Papaya Whip",
    hex: "#FFEFD5",
    rgb: "rgb(255, 239, 213)",
  },
  {
    name: "Peach Puff",
    hex: "#FFDAB9",
    rgb: "rgb(255, 218, 185)",
  },
  {
    name: "Peru",
    hex: "#CD853F",
    rgb: "rgb(205, 133, 63)",
  },
  {
    name: "Pink",
    hex: "#FFC0CB",
    rgb: "rgb(255, 192, 203)",
  },
  {
    name: "Plum",
    hex: "#DDA0DD",
    rgb: "rgb(221, 160, 221)",
  },
  {
    name: "Powder Blue",
    hex: "#B0E0E6",
    rgb: "rgb(176, 224, 230)",
  },
  {
    name: "Purple",
    hex: "#800080",
    rgb: "rgb(128, 0, 128)",
  },
  {
    name: "Rebecca Purple",
    hex: "#663399",
    rgb: "rgb(102, 51, 153)",
  },
  {
    name: "Red",
    hex: "#FF0000",
    rgb: "rgb(255, 0, 0)",
  },
  {
    name: "Rosy Brown",
    hex: "#BC8F8F",
    rgb: "rgb(188, 143, 143)",
  },
  {
    name: "Royal Blue",
    hex: "#4169E1",
    rgb: "rgb(65, 105, 225)",
  },
  {
    name: "Saddle Brown",
    hex: "#8B4513",
    rgb: "rgb(139, 69, 19)",
  },
  {
    name: "Salmon",
    hex: "#FA8072",
    rgb: "rgb(250, 128, 114)",
  },
  {
    name: "Sandy Brown",
    hex: "#F4A460",
    rgb: "rgb(244, 164, 96)",
  },
  {
    name: "Sea Green",
    hex: "#2E8B57",
    rgb: "rgb(46, 139, 87)",
  },
  {
    name: "Seashell",
    hex: "#FFF5EE",
    rgb: "rgb(255, 245, 238)",
  },
  {
    name: "Sienna",
    hex: "#A0522D",
    rgb: "rgb(160, 82, 45)",
  },
  {
    name: "Silver",
    hex: "#C0C0C0",
    rgb: "rgb(192, 192, 192)",
  },
  {
    name: "Sky Blue",
    hex: "#87CEEB",
    rgb: "rgb(135, 206, 235)",
  },
  {
    name: "Slate Blue",
    hex: "#6A5ACD",
    rgb: "rgb(106, 90, 205)",
  },
  {
    name: "Slate Gray",
    hex: "#708090",
    rgb: "rgb(112, 128, 144)",
  },
  {
    name: "Snow",
    hex: "#FFFAFA",
    rgb: "rgb(255, 250, 250)",
  },
  {
    name: "Spring Green",
    hex: "#00FF7F",
    rgb: "rgb(0, 255, 127)",
  },
  {
    name: "Steel Blue",
    hex: "#4682B4",
    rgb: "rgb(70, 130, 180)",
  },
  {
    name: "Tan",
    hex: "#D2B48C",
    rgb: "rgb(210, 180, 140)",
  },
  {
    name: "Teal",
    hex: "#008080",
    rgb: "rgb(0, 128, 128)",
  },
  {
    name: "Thistle",
    hex: "#D8BFD8",
    rgb: "rgb(216, 191, 216)",
  },
  {
    name: "Tomato",
    hex: "#FF6347",
    rgb: "rgb(255, 99, 71)",
  },
  {
    name: "Turquoise",
    hex: "#40E0D0",
    rgb: "rgb(64, 224, 208)",
  },
  {
    name: "Violet",
    hex: "#EE82EE",
    rgb: "rgb(238, 130, 238)",
  },
  {
    name: "Wheat",
    hex: "#F5DEB3",
    rgb: "rgb(245, 222, 179)",
  },
  {
    name: "White",
    hex: "#FFFFFF",
    rgb: "rgb(255, 255, 255)",
  },
  {
    name: "White Smoke",
    hex: "#F5F5F5",
    rgb: "rgb(245, 245, 245)",
  },
  {
    name: "Yellow",
    hex: "#FFFF00",
    rgb: "rgb(255, 255, 0)",
  },
  {
    name: "Yellow Green",
    hex: "#9ACD32",
    rgb: "rgb(154, 205, 50)",
  },
];
export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];

  const [pStats, setPStats] = useState([]);

  const [product, setProduct] = useState(null);
  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [previewImageFiles, setPreviewImageFiles] = useState([]);
  const [categoryData, setCategoryData] = useState(null);
  const dispatch = useDispatch();
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const IsLoading = useSelector((state) => state.product.isFetching);

  const storage = getStorage(app);

  const options = [
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" },
  ];

  const GenderOptions = [
    { value: "Men", label: "Men" },
    { value: "Women", label: "Women" },
    { value: "Boys", label: "Boys" },
    { value: "Girls", label: "Girls" },
  ];
  const colorOptions = Colors.map((color) => ({
    value: color.hex,
    label: color.name,
    color: color.hex,
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: 0,
    }),
    option: (provided, { data }) => ({
      ...provided,
      backgroundColor: null,
      color: "#141414",
    }),
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
      console.log("allCategoriesData", allCategoriesData);
      setCategory(res.data);
    }
  };
  const callGetBrand = async () => {
    const res = await request.get("/brand");
    if (res) setBrand(res.data);
  };
  const callGetProductApi = async () => {
    const { data } = await request.get(`/products/find/${productId}`);
    if (data) {
      setProduct(data);
      setSelectedGender(data?.gender);
      setCategoryData({
        ...categoryData,
        categoryId: data?.categories?._id,
        categoryName: data?.categories?.name,
      });
      setSelectedColor(data?.color);
      setSelectedSize(data?.size);
      setPreviewImageFiles(data?.images);
    }
  };

  useEffect(() => {
    callGetCategory();
    callGetBrand();
    callGetProductApi();
  }, []);

  const handleClickCategory = (e, categoryId, categoryName) => {
    e.stopPropagation();
    // console.log("categoryClick");
    // console.log(categoryId, categoryName);
    setCategoryData({ ...categoryData, categoryId, categoryName });
  };

  const handelSort = () => {
    let _previewFiles = [...previewImageFiles];
    //remove and save the dragged item content
    const draggedItemContent = _previewFiles.splice(dragItem.current, 1)[0];
    //switch the position
    _previewFiles.splice(dragOverItem.current, 0, draggedItemContent);
    //reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    setPreviewImageFiles(_previewFiles);
  };

  const handelImageFileChange = (e) => {
    console.log(e.target.files);
    const selectedFiles = e.target.files;
    const selectedFileArray = Array.from(selectedFiles);
    const imageArray = selectedFileArray?.map((file) => {
      return {
        file: file,
        url: URL.createObjectURL(file),
        imageType: file.type,
        name: file.name,
      };
    });
    console.log("image array", imageArray);
    setPreviewImageFiles((prev) => prev.concat(imageArray).slice(0, 6));
    e.currentTarget.value = null;
  };

  const handleChange = (e) => {
    setProduct((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const uploadFiles = async (file) => {
    console.log("File", file);
    console.log("file Name", file?.name);
    const ImageFile = file?.file;
    console.log("Image File", ImageFile);
    let retPromise;
    if (ImageFile) {
      retPromise = new Promise(function (resolve, reject) {
        const storageRef = ref(
          storage,
          `/Myntra Clone Images/${ImageFile.name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, ImageFile);
        // promises.push(uploadTask);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const prog = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
          },
          (error) => {
            console.log(error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((urls) => {
              // setURLs((prevState) => [...prevState, urls]);
              let url = urls.replace(
                "https://firebasestorage.googleapis.com",
                "https://ik.imagekit.io/utywuh2nq"
              );

              const data = { url: url, name: ImageFile.name };
              console.log("data", data);
              resolve(data);
              console.log("File available at", url);
              // return urls;
            });
          }
        );
      });
    } else {
      retPromise = new Promise((resolve, reject) => {
        resolve(file);
      });
    }
    return retPromise;
  };

  const uploadImageFiles = (e) => {
    e.preventDefault();
    console.log("calling uploadImageFiles......");
    const status = previewImageFiles?.map((fileImages) =>
      uploadFiles(fileImages)
    );
    console.log(status);
    Promise.all(status)
      .then((imageData) => {
        setPreviewImageFiles(imageData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateProduct = async () => {
    console.log("product._id", product._id);
    console.log("product", product);
    const productUpdate = {
      ...product,
      gender: selectedGender,
      images: previewImageFiles,
      color: selectedColor,
      categories: categoryData.categoryId,
      size: selectedSize,
    };
    console.log("productUpdate", productUpdate);
    const updateProduct = await request.put(
      `/products/${productId}`,
      productUpdate
    );
    console.log(productUpdate);
    console.log("updateProduct", updateProduct);
  };

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  // useEffect(() => {
  //   const getStats = async () => {
  //     try {
  //       const res = await userRequest.get("orders/income?pid=" + productId);
  //       const list = res.data.sort((a, b) => {
  //         return a._id - b._id;
  //       });
  //       list.map((item) =>
  //         setPStats((prev) => [
  //           ...prev,
  //           { name: MONTHS[item._id - 1], Sales: item.total },
  //         ])
  //       );
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getStats();
  // }, [productId, MONTHS]);

  return (
    <>
      {product && (
        <div className="product">
          <div className="productTitleContainer">
            <h1 className="productTitle">Product</h1>
            <Link to="/newproduct">
              <button className="productAddButton">Create new product</button>
            </Link>
          </div>
          <div className="productTop">
            <div className="productTopLeft">
              <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
            </div>
            <div className="productTopRight">
              <div className="productInfoTop">
                <img
                  src={product?.images[0]?.url}
                  alt={product?.images[0]?.name}
                  className="productInfoImg"
                />
                <span className="productName">{product?.title}</span>
              </div>
              <div className="productInfoBottom">
                <div className="productInfoItem">
                  <span className="productInfoKey">id:</span>
                  <span className="productInfoValue">{product?._id}</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">sales:</span>
                  <span className="productInfoValue">5123</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">in stock:</span>
                  <span className="productInfoValue">{product?.inStock}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="productBottom">
            <form className="productForm">
              <div className="productFormLeft">
                <div className="addProductItem">
                  <label>Brand</label>
                  <select
                    name="brand"
                    value={product?.brand}
                    onChange={handleChange}
                  >
                    {brand?.length > 0 &&
                      brand?.map((option, i) => (
                        <option key={i} value={option.name}>
                          {option.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="addProductItem">
                  <label>Description</label>
                  <input
                    name="description"
                    type="text"
                    value={product?.description}
                    onChange={handleChange}
                  />
                </div>
                <div className="addProductItem">
                  <label>Price</label>
                  <input
                    name="price"
                    type="number"
                    value={product?.price}
                    onChange={handleChange}
                    min={1}
                  />
                </div>
                <div className="addProductItem">
                  <label>Discount Percentage</label>
                  <input
                    name="discountPercentage"
                    type="number"
                    value={product?.discountPercentage}
                    placeholder="100%"
                    max="5"
                    onChange={handleChange}
                  />
                </div>
                <div className="addProductItem">
                  <label>Colors</label>
                  <Select
                    options={colorOptions}
                    defaultValue={{
                      label: product?.color,
                      value: product?.color,
                    }}
                    onChange={(values) => setSelectedColor(values.label)}
                    getOptionLabel={(option) => (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div
                          style={{
                            backgroundColor: option.color
                              ? option.color
                              : product?.color,
                            width: "20px",
                            height: "20px",
                            marginRight: "10px",
                            borderRadius: "5px",
                          }}
                        ></div>
                        {option.label}
                      </div>
                    )}
                    getOptionValue={(option) => {}}
                    styles={customStyles}
                  />
                </div>
                <div className="addProductItem">
                  <label>Gender</label>
                  <Select
                    defaultValue={{
                      label: product?.gender,
                      value: product?.gender,
                    }}
                    options={GenderOptions}
                    onChange={(values) => {
                      setSelectedGender(values.value);
                    }}
                  />
                </div>

                <div className="addProductItem">
                  <label>Size</label>
                  <Select
                    defaultValue={product?.size.map((size) => {
                      return { label: size, value: size };
                    })}
                    onChange={(values) => {
                      setSelectedSize(values.map((option) => option.value));
                    }}
                    options={options}
                    isMulti
                  />
                </div>
                <div className="addProductItem">
                  <label>Categories</label>
                  <input
                    type="text"
                    placeholder={
                      categoryData?.categoryName
                        ? categoryData?.categoryName
                        : product?.categories.name
                    }
                  />
                </div>
                <div className="addProductItem">
                  <label>Stock</label>
                  <select name="inStock" onChange={handleChange}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>

                <div className="addProductItem">
                  <label>category</label>
                  <select
                    name="brand"
                    // value={product?.brand}
                    onChange={handleChange}
                  >
                    {category?.length > 0 &&
                      category?.map((option, i) => (
                        <option key={i} value={option.name}>
                          {option.name}
                        </option>
                      ))}
                  </select>
                </div>
                <button
                  className="productUpdateButton"
                  onClick={handleUpdateProduct}
                >
                  Update Product
                </button>
              </div>
              <div className="productFormRight">
                <div className="productUpload">
                  <Wrapper>
                    <Container>
                      <h1>Upload Product Images</h1>
                      <p>Select multiple images upto 6 Images </p>
                      <DraggableDiv>
                        <Input
                          id="file-upload"
                          type="file"
                          onChange={handelImageFileChange}
                          multiple
                          accept="image/*"
                        />
                        {previewImageFiles.length > 0 ? (
                          <>
                            {previewImageFiles?.map((img, i) => (
                              <ImagePreViewWrapper key={i}>
                                <ImagePreview
                                  key={i}
                                  draggable
                                  onDragStart={(e) => (dragItem.current = i)}
                                  onDragEnter={(e) =>
                                    (dragOverItem.current = i)
                                  }
                                  onDragEnd={handelSort}
                                >
                                  <Image
                                    src={img?.url}
                                    isLarge={i == 0 ? 1 : 0}
                                  />
                                  <div
                                    onClick={() =>
                                      setPreviewImageFiles(
                                        previewImageFiles.filter(
                                          (e) => e != img
                                        )
                                      )
                                    }
                                  >
                                    <img
                                      className="closeIcon"
                                      src={closeIconSvg}
                                    />
                                  </div>
                                </ImagePreview>
                              </ImagePreViewWrapper>
                            ))}
                            {previewImageFiles.length < 6 &&
                            previewImageFiles.length !== 0 ? (
                              <label htmlFor="file-upload">
                                <img
                                  src={transparentFolderImage}
                                  draggable={false}
                                  style={{ width: "100px", height: "100px" }}
                                  alt="Upload"
                                />
                                <p>
                                  Add {6 - previewImageFiles.length} more Photo
                                </p>
                              </label>
                            ) : null}
                          </>
                        ) : (
                          <div draggable={false}>
                            <label htmlFor="file-upload">
                              <img
                                src={transparentFolderImage}
                                draggable={false}
                                style={{ width: "100px", height: "100px" }}
                                alt="Upload"
                              />
                              <p>Click here to upload</p>
                            </label>
                          </div>
                        )}
                      </DraggableDiv>
                    </Container>
                  </Wrapper>
                </div>
                <button className="productButton" onClick={uploadImageFiles}>
                  Upload Images
                </button>
                <Category
                  data={categoryData}
                  handleClick={handleClickCategory}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
