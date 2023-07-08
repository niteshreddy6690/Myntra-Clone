import { useState, useEffect, useRef } from "react";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import axios from "axios";
import Select from "react-select";
import styled from "styled-components";
import ChevronRightTwoToneIcon from "@mui/icons-material/ChevronRightTwoTone";
import ArrowDropDownTwoToneIcon from "@mui/icons-material/ArrowDropDownTwoTone";
import ArrowRightTwoToneIcon from "@mui/icons-material/ArrowRightTwoTone";

import transparentFolderImage from "../../Assets/png/folder_icon_transparent.png";
import closeIconSvg from "../../Assets/svg/CloseIcon.svg";

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
  width: ${({ isLarge }) => (isLarge ? "150px" : "100px")};
  height: ${({ isLarge }) => (isLarge ? "150px" : "100px")};
  opacity: ${({ isLarge }) => (isLarge ? "1" : ".9")};
  margin: 15px;
  object-fit: cover;
  border-radius: 5px;
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
  min-height: 350px;
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
export const Colors = [
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

export default function NewProduct() {
  const options = [
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" },
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

  const initialState = {
    name: "",
    parentId: null,
    parentCategory: null,
  };
  const [inputs, setInputs] = useState({});
  const [category, setCategory] = useState({});
  const [brand, setBrand] = useState([]);
  const [data, setData] = useState(initialState);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [previewFiles, setPreviewFiles] = useState([]);
  const dispatch = useDispatch();
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handelSort = () => {
    let _previewFiles = [...previewFiles];
    //remove and save the dragged item content
    const draggedItemContent = _previewFiles.splice(dragItem.current, 1)[0];
    //switch the position
    _previewFiles.splice(dragOverItem.current, 0, draggedItemContent);
    //reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    setPreviewFiles(_previewFiles);
  };

  const handelChange = (e) => {
    console.log("handelChangeTriggred");
    console.log(e.target.files);
    const selectedFiles = e.target.files;
    const selectedFileArray = Array.from(selectedFiles);
    const imageArray = selectedFileArray?.map((file) => {
      return {
        file: file,
        imgblob: URL.createObjectURL(file),
        imageType: file.type,
      };
    });
    console.log("image array", imageArray);
    setPreviewFiles((prev) => prev.concat(imageArray).slice(0, 6));
    e.currentTarget.value = null;
  };

  const storage = getStorage(app);
  // storage = firebase.storage();

  const callCategory = async () => {
    const res = await axios.get(`http://localhost:8080/api/category`);
    if (res) setCategory(res.data);
  };
  const callBrand = async () => {
    const res = await axios.get(`http://localhost:8080/api/brand`);
    if (res) setBrand(res.data);
  };
  useEffect(() => {
    callCategory();
    callBrand();
  }, []);
  console.log("Category", category);
  console.log("Brand", brand);

  console.log("selectedSize", selectedSize);
  console.log("selectedColor", selectedColor);
  const handleClickCategory = (e, categoryId, categoryName) => {
    e.stopPropagation();
    console.log("categoryName", categoryName);
    console.log("category_Id", categoryId);
    // setShow(!show);
    setData({ ...data, categoryId, categoryName });
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleColorChange = (values) => {
    console.log(values);
    setSelectedColor(values.label);
  };

  const uploadFiles = async (file) => {
    // const promises = [];
    // console.log(Object.entries(file));
    const retPromise = new Promise(function (resolve, reject) {
      const storageRef = ref(storage, `/Myntra Clone Images/3${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
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

            resolve(url);
            console.log("File available at", url);
            // return urls;
          });
        }
      );
    });
    return retPromise;
  };
  const handleClick = async (e) => {
    e.preventDefault();
    // const upload = await uploadFiles();
    previewFiles.map((fileImages) => {
      console.log(fileImages.file);
    });

    const status = previewFiles?.map((fileImages) =>
      uploadFiles(fileImages.file)
    );
    console.log(status);

    Promise.all(
      // Array of "Promises"
      status
    )
      .then((urls) => {
        // console.log(url);
        console.log("url", urls);
        console.log(`All success`);
        // setURLs(url);

        const product = {
          ...inputs,
          images: urls,
          color: selectedColor,
          categories: data.categoryId,
          size: selectedSize,
        };
        console.log("Product", product);
        addProduct(product, dispatch);
      })
      .catch((error) => {
        console.log(`Some failed: `, error.message);
      });

    // uploadCompleted
    //   .then(() => {
    //     console.log(urls);
    //     const product = {
    //       ...inputs,
    //       img: urls,
    //       categories: cat,
    //       color: color,
    //       size: size,
    //     };
    //     addProduct(product, dispatch);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // UploadFiles();
    // console.log(urls);
    // const fileName = new Date().getTime() + file.name;
    // const storage = getStorage(app);
    // const storageRef = ref(storage, fileName);
    // const uploadTask = uploadBytesResumable(storageRef, file);

    // // Register three observers:
    // // 1. 'state_changed' observer, called any time the state changes
    // // 2. Error observer, called on failure
    // // 3. Completion observer, called on successful completion
    // uploadTask.on(
    //   "state_changed",
    //   (snapshot) => {
    //     // Observe state change events such as progress, pause, and resume
    //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //     const progress =
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     console.log("Upload is " + progress + "% done");
    //     switch (snapshot.state) {
    //       case "paused":
    //         console.log("Upload is paused");
    //         break;
    //       case "running":
    //         console.log("Upload is running");
    //         break;
    //       default:
    //     }
    //   },
    //   (error) => {
    //     // Handle unsuccessful uploads
    //   },
    //   () => {
    //     // Handle successful uploads on complete
    //     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //       const product = {
    //         ...inputs,
    //         img: urls,
    //         categories: cat,
    //         color: color,
    //         size: size,
    //       };
    //       addProduct(product, dispatch);
    //     });
    //   }
    // );
  };

  // const UploadFiles = () => {
  //   const uploads = [];
  //   Object.entries(file).map((file) => {
  //     const fileName = ("images/" + file.name).toString();
  //     const storage = getStorage(app);
  //     const storageRef = ref(storage, fileName);
  //     const uploadTask = uploadBytesResumable(storageRef, file);

  //     // // Register three observers:
  //     // // 1. 'state_changed' observer, called any time the state changes
  //     // // 2. Error observer, called on failure
  //     // // 3. Completion observer, called on successful completion
  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         // Observe state change events such as progress, pause, and resume
  //         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //         const progress =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         console.log("Upload is " + progress + "% done");
  //         switch (snapshot.state) {
  //           case "paused":
  //             console.log("Upload is paused");
  //             break;
  //           case "running":
  //             console.log("Upload is running");
  //             break;
  //           default:
  //         }
  //       },
  //       (error) => {
  //         // Handle unsuccessful uploads
  //       },
  //       () => {
  //         // Handle successful uploads on complete
  //         // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //           // const product = {
  //           //   ...inputs,
  //           //   img: urls,
  //           //   categories: cat,
  //           //   color: color,
  //           //   size: size,
  //           // };
  //           // addProduct(product, dispatch);
  //           uploads.push(downloadURL);
  //         });
  //       }
  //     );
  //   });
  //   console.log("array of images", uploads);
  // };

  return (
    <>
      <div className="newProduct">
        <h1 className="addProductTitle">New Product</h1>
        <form className="addProductForm">
          <div className="addProductItem">
            <label>Brand</label>
            <select name="brand" value={inputs.brand} onChange={handleChange}>
              {brand.length > 0 &&
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
              placeholder="description..."
              onChange={handleChange}
            />
          </div>
          <div className="addProduct">
            <label>Images</label>
            <Wrapper>
              <Container>
                <h1>Upload Product Images</h1>
                <p>Select multiple images </p>

                <DraggableDiv>
                  <Input
                    id="file-upload"
                    type="file"
                    onChange={handelChange}
                    multiple
                    accept="image/*"
                  />
                  {previewFiles.length > 0 ? (
                    <>
                      {previewFiles?.map((img, i) => (
                        <ImagePreViewWrapper>
                          <ImagePreview
                            key={i}
                            draggable
                            onDragStart={(e) => (dragItem.current = i)}
                            onDragEnter={(e) => (dragOverItem.current = i)}
                            onDragEnd={handelSort}
                          >
                            <Image src={img.imgblob} isLarge={i == 0 ? 1 : 0} />
                            <div
                              onClick={() =>
                                setPreviewFiles(
                                  previewFiles.filter((e) => e != img)
                                )
                              }
                            >
                              <img className="closeIcon" src={closeIconSvg} />
                            </div>
                          </ImagePreview>
                        </ImagePreViewWrapper>
                      ))}
                      {previewFiles.length < 6 && previewFiles.length !== 0 ? (
                        <label htmlFor="file-upload">
                          <img
                            src={transparentFolderImage}
                            draggable={false}
                            style={{ width: "100px", height: "100px" }}
                            alt="Upload"
                          />
                          <p>Add {6 - previewFiles.length} more Photo</p>
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
          <div className="addProductItem">
            <label>Price</label>
            <input
              name="price"
              type="number"
              placeholder="100"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Percentage discount</label>
            <input
              name="discountPercentage"
              type="number"
              placeholder="100"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Gender</label>
            <input
              name="gender"
              type="text"
              placeholder="Men"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Colors</label>
            <Select
              options={colorOptions}
              onChange={handleColorChange}
              getOptionLabel={(option) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      backgroundColor: option.color,
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
            <label>Size</label>
            <Select
              defaultValue={selectedSize}
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
              placeholder="jeans,skirts"
              value={data.categoryName}
            />
          </div>
          <div className="addProductItem">
            <label>Stock</label>
            <select
              name="inStock"
              value={inputs.inStock}
              onChange={handleChange}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <button onClick={handleClick} className="addProductButton">
            Create
          </button>
        </form>
      </div>
      <Category handleClick={handleClickCategory} data={data} />
    </>
  );
}

const Category = ({ handleClick, data }) => {
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(true);

  const callApi = async () => {
    const res = await axios.get(`http://localhost:8080/api/category`);
    setCategories(res.data);
  };
  useEffect(() => {
    callApi();
  }, []);

  // const handleInitial = () => {
  //   setData(initialState);
  // };

  // const handleChange = (e) => {
  //   setData({ ...data, name: e.target.value });
  // };

  return (
    <div style={{ margin: "30px" }}>
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
          {data.categoryName ? (
            <div>
              <span>Selected Category : </span>
              <span style={{ textTransform: "capitalize" }}>
                {data.categoryName}
              </span>
            </div>
          ) : null}

          <div
            style={{ display: "flex", flexDirection: "row", width: "500px" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

// const DraggableElement = styled.div``;

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
