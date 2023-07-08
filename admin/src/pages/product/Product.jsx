import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
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

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [ImgUrl, setImgUrl] = useState(null);
  const dispatch = useDispatch();
  const IsLoading = useSelector((state) => state.product.isFetching);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  console.log("product from State", product);
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };
  const handleColor = (e) => {
    setColor(e.target.value.split(","));
  };
  const handleSize = (e) => {
    setSize(e.target.value.split(","));
  };

  useEffect(() => {
    product?.img && setImgUrl(product?.img);
  }, [product]);

  useEffect(() => {
    setInputs({
      _id: product?._id,
      desc: product?.desc,
      title: product?.title,
      price: product?.price,
      inStock: product?.inStock,
    });
    setColor(product?.color);
    setSize(product?.size);
    setCat(product?.cat);
  }, []);
  const handleClick = (e) => {
    e.preventDefault();
    if (file) {
      console.log("contains a file");
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgUrl(downloadURL);
            console.log("Downloadurl", downloadURL);
          });
        }
      );
    }

    // const ImgUrl = product.img;
    // console.log("ImgUrl", ImgUrl);

    // // Register three observers:
    // // 1. 'state_changed' observer, called any time the state changes
    // // 2. Error observer, called on failure
    // // 3. Completion observer, called on successful completion

    const product = {
      ...inputs,
      img: ImgUrl,
      categories: cat,
      color: color,
      size: size,
    };
    console.log("product", product);
    updateProduct(productId, product, dispatch);
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

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  return (
    <>
      {IsLoading ? (
        <Oval
          height={80}
          width={80}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      ) : (
        <div className="product">
          <div className="productTitleContainer">
            <h1 className="productTitle">Product</h1>
            <Link to="/newproduct">
              <button className="productAddButton">Create</button>
            </Link>
          </div>
          <div className="productTop">
            <div className="productTopLeft">
              <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
            </div>
            <div className="productTopRight">
              <div className="productInfoTop">
                <img
                  src={product?.images[0]}
                  alt=""
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
                  <label>Image</label>
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
                <div className="addProductItem">
                  <label>Title</label>
                  <input
                    name="title"
                    type="text"
                    placeholder={product?.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="addProductItem">
                  <label>Description</label>
                  <input
                    name="desc"
                    type="text"
                    placeholder={product?.desc}
                    onChange={handleChange}
                  />
                </div>
                <div className="addProductItem">
                  <label>Price</label>
                  <input
                    name="price"
                    type="number"
                    placeholder={product?.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="addProductItem">
                  <label>Colors</label>
                  <input
                    type="text"
                    placeholder={product?.color}
                    onChange={handleColor}
                  />
                </div>

                <div className="addProductItem">
                  <label>Size</label>
                  <input
                    type="text"
                    placeholder={product?.size}
                    onChange={handleSize}
                  />
                </div>
                <div className="addProductItem">
                  <label>Categories</label>
                  <input
                    type="text"
                    placeholder={product?.categories}
                    onChange={handleCat}
                  />
                </div>
                <div className="addProductItem">
                  <label>Stock</label>
                  <select name="inStock" onChange={handleChange}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
              <div className="productFormRight">
                <div className="productUpload">
                  <img
                    src={product?.images[0]}
                    alt=""
                    className="productUploadImg"
                  />
                  <label for="file">
                    <Publish />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
                <button className="productButton" onClick={handleClick}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
