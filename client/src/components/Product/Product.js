import React from "react";
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
  SelectSizeContainer,
  SelectSizeHeader,
  SelectSizeSpan,
  SelectSizeButtonWrapper,
  SelectSizeButtonContainer,
  SelectSizeButtonContainer1,
  SizeButton,
  SizeButtonText,
  NoSizeSpan,
} from "../Product/Product.styles";

//Import images
import images1 from "../../Assets/Images/Men/MenA1.webp";
import images2 from "../../Assets/Images/Men/MenA2.webp";
import images3 from "../../Assets/Images/Men/MenA3.webp";
import images4 from "../../Assets/Images/Men/MenA4.webp";
import images5 from "../../Assets/Images/Men/MenA5.webp";

// import imagesB1 from "../../Assets/Images/Men/MenB1.webp";
// import imagesB2 from "../../Assets/Images/Men/MenB2.webp";
// import imagesB3 from "../../Assets/Images/Men/MenB3.webp";
// import imagesB4 from "../../Assets/Images/Men/MenB4.webp";

// import imagesC1 from "../../Assets/Images/Men/MenC1.webp";
// import imagesC2 from "../../Assets/Images/Men/MenC2.webp";
// import imagesC3 from "../../Assets/Images/Men/MenC3.webp";
// import imagesC4 from "../../Assets/Images/Men/MenC4.jpeg";

const products = [
  {
    id: "1",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: [images1, images2, images3, images4, images5],
    size: ["S", "L", "M"],
    OriginalPrice: "1999",
    discountPercentage: "60",
    inStock: true,
  },
];
const PreDefinedSize = ["S", "L", "M", "XL", "XXL"];
const SizeComponent = ({ size, activeSizes }) => {
  if (activeSizes.includes(size)) {
    return (
      <SelectSizeButtonContainer>
        <SelectSizeButtonContainer1>
          <SelectSizeButtonWrapper>
            <SizeButton>
              <SizeButtonText>{size}</SizeButtonText>
            </SizeButton>
          </SelectSizeButtonWrapper>
        </SelectSizeButtonContainer1>
      </SelectSizeButtonContainer>
    );
  } else {
    return (
      <SelectSizeButtonContainer>
        <SelectSizeButtonContainer1>
          <SelectSizeButtonWrapper>
            <SizeButton NoSize={true}>
              <SizeButtonText>{size}</SizeButtonText>
              <NoSizeSpan></NoSizeSpan>
            </SizeButton>
          </SelectSizeButtonWrapper>
        </SelectSizeButtonContainer1>
      </SelectSizeButtonContainer>
    );
  }
};

const Product = () => {
  return (
    <TopDiv>
      <Main>
        <ImageContainer>
          {products?.map((item) =>
            item.img?.map((image) => (
              <ImageContainer1>
                <ImageContainer2>
                  <Img src={image} />
                  {/* <Img src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/10106341/2022/3/9/bb316320-1a5e-4c25-bde7-dcf432dcf8811646818525186-HRX-by-Hrithik-Roshan-Ultralyte-Men-Black-Running-T-shirt-72-7.jpg" /> */}
                </ImageContainer2>
              </ImageContainer1>
            ))
          )}
        </ImageContainer>
        <DescriptionContainer>
          {products.map((product) => (
            <>
              <TitleAndPriceContainer>
                <HeaderTitle>{`${product.brand}`}</HeaderTitle>
                <HeaderName>{`${product.Desc}`}</HeaderName>
              </TitleAndPriceContainer>
              <Div>
                <DiscountedPriceContainer>
                  <DiscountedPriceSpan>{` ₹${product.OriginalPrice}`}</DiscountedPriceSpan>
                  <OriginalPriceSpan>{`MRP ₹${Math.floor(
                    product.OriginalPrice * (product.discountPercentage / 100)
                  )}`}</OriginalPriceSpan>
                  <PercentageOffSpan>{`(${product.discountPercentage})%`}</PercentageOffSpan>
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
                <SelectSizeButtonWrapper>
                  {PreDefinedSize?.map((size) => (
                    <SizeComponent size={size} activeSizes={product.size} />
                  ))}
                </SelectSizeButtonWrapper>
              </SizeContainer>
            </>
          ))}
        </DescriptionContainer>
      </Main>
    </TopDiv>
  );
};

export default Product;
