import React from "react";
import {
  Wrapper,
  Overlay,
  SimilarContainer,
  SimilarHeaderContainer,
  SimilarHeader,
  SimilarContent,
  Icon,
  Ul,
  Li,
  NavLink,
  Image,
  ProductMetaInfo,
  ProductHeader3,
  ProductHeader4,
  ProductPriceContainer,
  ProductDiscountedPrice,
  ProductOriginalPrice,
  ProductDiscountPercentage,
} from "./Similar.styles";
import ClearIcon from "@mui/icons-material/Clear";

//Import images

import images1 from "../../Assets/Images/Men/Men1.webp";
import images2 from "../../Assets/Images/Men/Men2.webp";
import images3 from "../../Assets/Images/Men/Men3.webp";
import images4 from "../../Assets/Images/Men/Men4.webp";
import images5 from "../../Assets/Images/Men/Men5.webp";
import images6 from "../../Assets/Images/Men/Men6.webp";

import imagesB1 from "../../Assets/Images/Men/MenB1.webp";
import imagesB2 from "../../Assets/Images/Men/MenB2.webp";
import imagesB3 from "../../Assets/Images/Men/MenB3.webp";
import imagesB4 from "../../Assets/Images/Men/MenB4.webp";

import imagesC1 from "../../Assets/Images/Men/MenC1.webp";
import imagesC2 from "../../Assets/Images/Men/MenC2.webp";
import imagesC3 from "../../Assets/Images/Men/MenC3.webp";
import imagesC4 from "../../Assets/Images/Men/MenC4.jpeg";

import imagesD1 from "../../Assets/Images/Men/MenD1.jpeg";
import imagesD2 from "../../Assets/Images/Men/MenD2.jpeg";
import imagesD3 from "../../Assets/Images/Men/MenD3.jpeg";
import imagesD4 from "../../Assets/Images/Men/MenD4.jpeg";
import imagesD5 from "../../Assets/Images/Men/MenD5.jpeg";
import imagesD6 from "../../Assets/Images/Men/MenD6.jpeg";

import imagesE1 from "../../Assets/Images/Men/MenE1.webp";
import imagesE2 from "../../Assets/Images/Men/MenE2.webp";
import imagesE3 from "../../Assets/Images/Men/MenE3.webp";
import imagesE4 from "../../Assets/Images/Men/MenE4.webp";
import imagesE5 from "../../Assets/Images/Men/MenE5.webp";
import imagesE6 from "../../Assets/Images/Men/MenE6.webp";

const products = [
  {
    id: "1",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: [images1, images2, images3, images4, images5, images6],
    size: ["L", "M", "XL", "XS", "XXL"],
    price: "1999",
    discountPercentage: "60",
    inStock: true,
  },
  {
    id: "2",
    brand: "HRX by Hrithik Roshan",
    color: ["green", "limegreen"],
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: [imagesB1, imagesB2, imagesB1, imagesB3, imagesB4],
    size: ["L", "M", "XL", "XS", "XXL"],
    price: "1999",
    discountPercentage: "20",
    inStock: true,
  },
  {
    id: "3",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: [imagesC1, imagesC2, imagesC3, imagesC1, imagesC4],
    size: ["L", "M", "XL", "XS", "XXL"],
    price: "1999",
    discountPercentage: "30",
    inStock: true,
  },
  {
    id: "4",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: [imagesD2, imagesD1, imagesD3, imagesD4, imagesD5, imagesD6],
    size: ["L", "M", "XL", "XS", "XXL"],
    price: "1999",
    discountPercentage: "40",
    inStock: true,
  },
  {
    id: "5",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: [imagesE1, imagesE2, imagesE3, imagesE4, imagesE5, imagesE6],
    size: ["L", "M", "XL", "XS", "XXL"],
    price: "1999",
    discountPercentage: "60",
    inStock: true,
  },
  {
    id: "6",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: [images2, images1, images1],
    size: ["L", "M", "XL", "XS", "XXL"],
    price: "1999",
    discountPercentage: "60",
    inStock: true,
  },
  {
    id: "7",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: [images1, images2, images1],
    size: ["L", "M", "XL", "XS", "XXL"],
    price: "1999",
    discountPercentage: "50",
    inStock: true,
  },
  {
    id: "8",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: [images2, images1, images1],
    size: ["L", "M", "XL", "XS", "XXL"],
    price: "1999",
    discountPercentage: "65",
    inStock: true,
  },
  {
    id: "9",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: [images1, images1, images1],
    size: ["L", "M", "XL", "XS", "XXL"],
    price: "1999",
    discountPercentage: "60",
    inStock: true,
  },
  {
    id: "10",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: [images2, images1, images1],
    size: ["L", "M", "XL", "XS", "XXL"],
    price: "1999",
    discountPercentage: "65",
    inStock: true,
  },
  {
    id: "11",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: [images2, images1, images1],
    size: ["L", "M", "XL", "XS", "XXL"],
    price: "1999",
    discountPercentage: "60",
    inStock: true,
  },
  {
    id: "12",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: [images2, images1, images1],
    size: ["L", "M", "XL", "XS", "XXL"],
    price: "1999",
    discountPercentage: "60",
    inStock: true,
  },

  {
    id: "13",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: [imagesC1, imagesC2, imagesC3, imagesC1, imagesC4],
    size: ["L", "M", "XL", "XS", "XXL"],
    price: "1999",
    discountPercentage: "30",
    inStock: true,
  },
  {
    id: "14",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: [imagesD2, imagesD1, imagesD3, imagesD4, imagesD5, imagesD6],
    size: ["L", "M", "XL", "XS", "XXL"],
    price: "1999",
    discountPercentage: "40",
    inStock: true,
  },
  {
    id: "15",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: [imagesE1, imagesE2, imagesE3, imagesE4, imagesE5, imagesE6],
    size: ["L", "M", "XL", "XS", "XXL"],
    price: "1999",
    discountPercentage: "60",
    inStock: true,
  },
  {
    id: "16",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: [images2, images1, images1],
    size: ["L", "M", "XL", "XS", "XXL"],
    price: "1999",
    discountPercentage: "60",
    inStock: true,
  },
  {
    id: "17",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: [images1, images2, images1],
    size: ["L", "M", "XL", "XS", "XXL"],
    price: "1999",
    discountPercentage: "50",
    inStock: true,
  },
  {
    id: "18",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: [images2, images1, images1],
    size: ["L", "M", "XL", "XS", "XXL"],
    price: "1999",
    discountPercentage: "65",
    inStock: true,
  },
  {
    id: "19",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: [images1, images1, images1],
    size: ["L", "M", "XL", "XS", "XXL"],
    price: "1999",
    discountPercentage: "60",
    inStock: true,
  },
  {
    id: "20",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: [images2, images1, images1],
    size: ["L", "M", "XL", "XS", "XXL"],
    price: "1999",
    discountPercentage: "65",
    inStock: true,
  },
  {
    id: "21",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: [images2, images1, images1],
    size: ["L", "M", "XL", "XS", "XXL"],
    price: "1999",
    discountPercentage: "60",
    inStock: true,
  },
  {
    id: "22",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: [images2, images1, images1],
    size: ["L", "M", "XL", "XS", "XXL"],
    price: "1999",
    discountPercentage: "60",
    inStock: true,
  },
];

const Similar = ({ open, handelClick }) => {
  return (
    <div>
      <Overlay onClick={() => handelClick(open)} open={open}></Overlay>
      <Wrapper open={open}>
        <SimilarContainer>
          <SimilarHeaderContainer>
            <SimilarHeader>Similar Products</SimilarHeader>
            <Icon>
              <ClearIcon onClick={() => handelClick(open)} />
            </Icon>
          </SimilarHeaderContainer>
          <SimilarContent>
            <div className="results-similarItemContainer">
              <Ul>
                {products.map((product, i) => (
                  <Li key={i}>
                    <NavLink to="/men/hrx-by-hrithik-roshan/ultralyte-men-black-running-t-shirt/6370afc44cb8b349e9de864e/buy">
                      <div className="image-Container">
                        <Image src={product.img[0]} />
                      </div>
                      <ProductMetaInfo>
                        <ProductHeader3>{product.brand}</ProductHeader3>
                        <ProductHeader4>{product.Desc}</ProductHeader4>
                        <ProductPriceContainer>
                          <span>
                            <ProductDiscountedPrice>
                              {`Rs. ${Math.floor(
                                product.price -
                                  product.price *
                                    (product.discountPercentage / 100)
                              )}`}
                            </ProductDiscountedPrice>
                            <ProductOriginalPrice>
                              {product.price}
                            </ProductOriginalPrice>
                          </span>
                          <ProductDiscountPercentage>
                            {`(${product.discountPercentage}%OFF)`}
                          </ProductDiscountPercentage>
                        </ProductPriceContainer>
                      </ProductMetaInfo>
                    </NavLink>
                  </Li>
                ))}
              </Ul>
            </div>
          </SimilarContent>
        </SimilarContainer>
      </Wrapper>
    </div>
  );
};

export default Similar;
