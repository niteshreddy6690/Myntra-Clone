import React, { useEffect, useState } from "react";
import {
  TopDiv,
  Div,
  Main,
  ImageContainer,
  ImageContainer1,
  ImageContainer2,
  Img,
  DescriptionContainer,
  TitleAndPriceContainer,
  HeaderTitle,
  HeaderName,
  DiscountedPriceContainer,
  DiscountedPriceSpan,
  OriginalPriceSpan,
  PercentageOffSpan,
  TaxInfo,
  TaxInfoSpan,
  SizeContainer,
  SizeMessage,
  SelectSizeContainer,
  SelectSizeHeader,
  SelectSizeSpan,
  SelectSizeButtonWrapper,
  SelectSizeButtonContainer,
  SelectSizeButtonContainer1,
  SizeButton,
  SizeButtonText,
  NoSizeSpan,
  AddAndWhish,
  AddToBagButton,
  WishListButton,
} from "../Product/Product.styles";
import { useLocation, useNavigate } from "react-router-dom";
// Import Axios
import axios from "axios";
// import Icons from MaterialUI icons
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
//Import images
import images1 from "../../Assets/Images/Men/MenD1.jpeg";
import images2 from "../../Assets/Images/Men/MenD2.jpeg";
import images3 from "../../Assets/Images/Men/MenD3.jpeg";
import images4 from "../../Assets/Images/Men/MenD4.jpeg";
import images5 from "../../Assets/Images/Men/MenD5.jpeg";
import images6 from "../../Assets/Images/Men/MenD6.jpeg";

// import imagesB1 from "../../Assets/Images/Men/MenB1.webp";
// import imagesB2 from "../../Assets/Images/Men/MenB2.webp";
// import imagesB3 from "../../Assets/Images/Men/MenB3.webp";
// import imagesB4 from "../../Assets/Images/Men/MenB4.webp";

// import imagesC1 from "../../Assets/Images/Men/MenC1.webp";
// import imagesC2 from "../../Assets/Images/Men/MenC2.webp";
// import imagesC3 from "../../Assets/Images/Men/MenC3.webp";
// import imagesC4 from "../../Assets/Images/Men/MenC4.jpeg";

// const products = [
//   {
//     id: "1",
//     brand: "HRX by Hrithik Roshan",
//     Gender: ["men"],
//     Desc: "Rapid Dry Training T-shirt",
//     img: [images2, images1, images3, images4, images5, images6],
//     size: ["S", "L", "M"],
//     OriginalPrice: "1999",
//     discountPercentage: "60",
//     inStock: true,
//   },
// ];
const PreDefinedSize = ["S", "L", "M", "XL", "XXL"];
const SizeComponent = ({
  size,
  activeSizes,
  handelSelectSize,
  selectedSize,
  isNotSizeSelected,
}) => {
  if (activeSizes.includes(size)) {
    return (
      <SelectSizeButtonContainer>
        <SelectSizeButtonContainer1>
          {selectedSize === size ? (
            <SizeButton
              onClick={() => handelSelectSize(size)}
              selectedSize={selectedSize}
            >
              <SizeButtonText>{size}</SizeButtonText>
            </SizeButton>
          ) : (
            <SizeButton onClick={() => handelSelectSize(size)}>
              <SizeButtonText>{size}</SizeButtonText>
            </SizeButton>
          )}
        </SelectSizeButtonContainer1>
      </SelectSizeButtonContainer>
    );
  } else {
    return (
      <SelectSizeButtonContainer>
        <SelectSizeButtonContainer1>
          <SizeButton NoSize={true}>
            <SizeButtonText>{size}</SizeButtonText>
            <NoSizeSpan></NoSizeSpan>
          </SizeButton>
        </SelectSizeButtonContainer1>
      </SelectSizeButtonContainer>
    );
  }
};

const Product = () => {
  const [product, setProduct] = useState({});
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [isNotSizeSelected, setIsNotSizeSelected] = useState(false);
  const [productInWishlist, setProductInWishlist] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split("/")[4];

  const handelSelectSize = (sizeValue) => {
    setSelectedSize(sizeValue);
    setIsNotSizeSelected(false);
  };

  console.log("slected size: ", selectedSize);

  const handelAddToWishlist = async (id) => {
    const res = await axios.post("http://localhost:8080/api/wishlist/", { id });
    console.log("result", res);
    setProductInWishlist(true);
  };

  const checkProductInWishlist = async (id) => {
    const res = await axios.get(`http://localhost:8080/api/wishlist/${id}`);
    setProductInWishlist(true);
  };
  useEffect(() => {
    const getProductById = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/products/find/${id}/`
        );
        console.log("res", res);
        if (res) {
          checkProductInWishlist(res.data._id);
        }
        setProduct(res.data);
        setSizes(res.data.size);

        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProductById();
  }, []);

  const addToCart = async (product) => {
    // const {
    //   _id,
    //   brand,
    //   description,
    //   gender,
    //   price,
    //   categories,
    //   images,
    //   discountPercentage,
    // } = product;
    const { _id } = product;
    if (selectedSize) {
      console.log("Size Is Selected");
      try {
        const cartProduct = await axios.post(
          `http://localhost:8080/api/carts/`,
          {
            productId: _id,
            size: selectedSize,
          }
        );
        console.log(cartProduct);
        navigate("/checkout/cart");
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("size is not selected");
      setIsNotSizeSelected(true);
    }
  };
  return (
    <TopDiv>
      <Main>
        <ImageContainer>
          {product.images?.map((image, i) => (
            <ImageContainer1 key={i}>
              <ImageContainer2>
                <Img
                  src={image}
                  // loading="lazy"
                  // style={{ width: "550px", height: "720px" }}
                />
              </ImageContainer2>
            </ImageContainer1>
          ))}
        </ImageContainer>
        <DescriptionContainer>
          <>
            <TitleAndPriceContainer>
              <HeaderTitle>{`${product.brand}`}</HeaderTitle>
              <HeaderName>{`${product.description}`}</HeaderName>
            </TitleAndPriceContainer>
            <Div>
              <DiscountedPriceContainer>
                <DiscountedPriceSpan>
                  {`₹${Math.round(
                    product.price -
                      product.price * (product.discountPercentage / 100)
                  )}`}
                </DiscountedPriceSpan>
                <OriginalPriceSpan>{`MRP ₹${product.price}`}</OriginalPriceSpan>
                <PercentageOffSpan>{`(${product.discountPercentage}% OFF)`}</PercentageOffSpan>
                <TaxInfo>
                  <TaxInfoSpan>inclusive of all taxes</TaxInfoSpan>
                </TaxInfo>
              </DiscountedPriceContainer>
            </Div>
            <SizeContainer>
              <SelectSizeContainer>
                <SelectSizeHeader>Select Size </SelectSizeHeader>
                <SelectSizeSpan> {`Size chat>`}</SelectSizeSpan>
              </SelectSizeContainer>
              <SizeMessage isNotSizeSelected={isNotSizeSelected}>
                Please select a size
              </SizeMessage>
              <SelectSizeButtonWrapper isNotSizeSelected={isNotSizeSelected}>
                {PreDefinedSize?.map((size) => (
                  <SizeComponent
                    size={size}
                    activeSizes={sizes}
                    handelSelectSize={handelSelectSize}
                    selectedSize={selectedSize}
                    isNotSizeSelected={isNotSizeSelected}
                  />
                ))}
              </SelectSizeButtonWrapper>
            </SizeContainer>
            <AddAndWhish>
              <AddToBagButton
                onClick={() => {
                  addToCart(product);
                  // navigate("/checkout/cart");
                }}
              >
                <ShoppingBagOutlinedIcon
                  style={{ margin: "0px 10px 0px 0px" }}
                />
                Add To Bag
              </AddToBagButton>

              {productInWishlist ? (
                <WishListButton
                  onClick={() => handelAddToWishlist(product._id)}
                  productInWishlist={productInWishlist}
                >
                  <FavoriteRoundedIcon
                    style={{
                      margin: "0px 10px 0px 0px",
                      color: "#ff3e6c",
                    }}
                  />
                  WishListed
                </WishListButton>
              ) : (
                <WishListButton
                  onClick={() => handelAddToWishlist(product._id)}
                  productInWishlist={productInWishlist}
                >
                  <FavoriteBorderOutlinedIcon
                    style={{
                      margin: "0px 10px 0px 0px",
                    }}
                  />
                  WishList
                </WishListButton>
              )}
            </AddAndWhish>
          </>
        </DescriptionContainer>
      </Main>
    </TopDiv>
  );
};

export default Product;
