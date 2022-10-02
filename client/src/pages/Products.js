import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import images1 from "../Assets/Images/Men/Men1.webp";
import images2 from "../Assets/Images/Men/Men2.webp";
import images3 from "../Assets/Images/3.webp";
import Banner from "../components/Banner/Banner";

const products = [
  {
    id: "1",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: [images1, images2, images1],
    size: ["L", "M", "XL", "XS", "XXL"],
    OriginalPrice: "1999",
    discountPercentage: "60",
    inStock: true,
  },
  {
    id: "2",
    brand: "HRX by Hrithik Roshan",
    color: ["green", "limegreen"],
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: [images2, images1, images1],
    size: ["L", "M", "XL", "XS", "XXL"],
    OriginalPrice: "1999",
    discountPercentage: "20",
    inStock: true,
  },
  {
    id: "3",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: [images1, images1, images1],
    size: ["L", "M", "XL", "XS", "XXL"],
    OriginalPrice: "1999",
    discountPercentage: "30",
    inStock: true,
  },
  {
    id: "4",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: [images2, images1, images1],
    size: ["L", "M", "XL", "XS", "XXL"],
    OriginalPrice: "1999",
    discountPercentage: "40",
    inStock: true,
  },
  {
    id: "5",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: [images1, images1, images1],
    size: ["L", "M", "XL", "XS", "XXL"],
    OriginalPrice: "1999",
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
    OriginalPrice: "1999",
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
    OriginalPrice: "1999",
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
    OriginalPrice: "1999",
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
    OriginalPrice: "1999",
    discountPercentage: "60",
    inStock: true,
  },
  {
    id: "8",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: [images2, images1, images1],
    size: ["L", "M", "XL", "XS", "XXL"],
    OriginalPrice: "1999",
    discountPercentage: "65",
    inStock: true,
  },
  {
    id: "9",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: [images2, images1, images1],
    size: ["L", "M", "XL", "XS", "XXL"],
    OriginalPrice: "1999",
    discountPercentage: "60",
    inStock: true,
  },
  {
    id: "9",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: [images2, images1, images1],
    size: ["L", "M", "XL", "XS", "XXL"],
    OriginalPrice: "1999",
    discountPercentage: "60",
    inStock: true,
  },
];

const Main = styled.div`
  margin: 0 auto;
  max-width: 1600px;
`;

const RowBase = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
  box-sizing: content-box;
`;

const Breadcrumbs = styled.div`
  vertical-align: top;
  padding: 20px 0 0;
`;
const BreadcrumbList = styled.ul`
  font-size: 14px;
  overflow: hidden;
  display: inline-block;
  margin: 0 0 0 25px;
  vertical-align: top;
  padding: 0;
`;
const BreadcrumbListItem = styled.li`
  text-decoration: none;
  list-style: none;
  font-size: 14px;
  /* display: inline-block; */
  float: left;
  margin-right: 5px;
  text-transform: capitalize;
  line-height: 1;

  &::after {
    font-size: 14px;
    content: "/";
    margin-left: 5px;
    color: #282c3f;
  }
`;
const TitleContainer = styled.div`
  margin: 10px 0 5px 25px;
  display: flex;
  align-items: center;
  max-width: 1000px;
  overflow: hidden;
`;

const Header1 = styled.h1`
  font-weight: 600;
  letter-spacing: 0.5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: #282c3f;
  max-width: 400px;
  text-transform: capitalize;
  display: inline-block;
  font-size: 16px;
  margin: 0;
`;
const Span = styled.span`
  color: #878b94;
  font-weight: 500;
  display: block;
  white-space: pre-wrap;
  font-family: Whitney;
  display: inline-block;
  font-size: 16px;
  margin: 0;
`;

const LeftSection = styled.div`
  min-width: 252px;
  max-width: 252px;
  flex-grow: 0 !important;
  align-self: flex-start;
  flex-wrap: wrap;
  flex-direction: column;
  flex: 1;
`;
const Section = styled.section``;
const LeftSectionDiv = styled.div`
  box-sizing: border-box;
  position: static;
  box-sizing: border-box;
  transition: margin 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  margin-top: 0;
  padding-top: 23px;
`;
const FilterDiv = styled.div`
  text-align: start;
  position: relative;
  border-right: none !important;
  padding: 0 0 15px 25px;
  border-bottom: 1px solid #e9e9ed;
`;
const FilterSpan = styled.span`
  text-transform: uppercase;
  font-weight: 700;
`;
const CategoriesDiv = styled(FilterDiv)`
  padding: 20px 0 15px 25px;
`;
const CategoriesSpan = styled.span`
  font-weight: 600;
  text-transform: uppercase;
  font-size: 14px;
  margin: 0 0 18px;
  clear: both;
  color: #282c3f;
  display: block;
`;
const Ul = styled.ul`
  font-weight: 400;
  margin: 0;
  padding: 0;
  list-style: none;
`;
const Li = styled.li``;
const Input = styled.input`
  margin: 0 16px 0 0;
`;
const Label = styled.label`
  display: block;
  width: 95%;
  white-space: nowrap;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 20px;
  color: #282c3f;
  font-size: 14px;
`;

const BrandDiv = styled(CategoriesDiv)``;
const BrandSpan = styled(CategoriesSpan)``;
const ColorDiv = styled(CategoriesDiv)``;
const ColorSpan = styled(CategoriesSpan)``;
const ColorDisplay = styled.span`
  display: inline-block;
  width: 15px;
  height: 15px;
  background: ${({ color }) => (color ? color : "#ffffff")};
  border-radius: 50%;
  margin-right: 10px;
`;
const RightSection = styled.div`
  padding: 0px;
  flex: 1 1 0%;
`;
const RSecttion = styled.div`
  width: 100%;
`;

const RightSectionRowBase = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
  padding-top: 24px;
  padding-left: 15px;
  padding-right: 20px;
`;
const RUl = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch;
  align-content: stretch;
  margin: 0 -10px 0 3px;
  width: 100%;
  justify-content: space-between;
  padding: 0px;
  list-style: none;
`;
const RLi = styled.li`
  width: 210px;
  text-align: left;
  position: relative;
  vertical-align: top;
  overflow: hidden;
  display: inline-block;
  box-sizing: border-box;
  margin: 0 10px 30px;

  &:hover {
    box-shadow: 0 2px 16px 4px rgb(40 44 63 / 7%);
  }
`;
const NavLink = styled(Link)`
  display: block;
  text-decoration: none;
`;
const ImageSliderContainer = styled.div`
  position: relative;
  width: 210px;
  height: 280px;
`;
const ProductSliderContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: block;
  /* display: ${({ isHover }) => (isHover ? "none" : "block")}; */
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
`;
const ProductMetaInfo = styled.div`
  position: relative;
  z-index: 3;
  background: #fff;
  padding: 0 10px;
  height: 100%;
  margin-top: 12px;
  box-sizing: border-box;
  overflow: hidden;
`;
const ProductHeader3 = styled.h3`
  font-family: Whitney Semibold;
  font-size: 16px;
  font-weight: 500;
  line-height: 1;
  color: #282c3f;
  margin-bottom: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const ProductHeader4 = styled.h4`
  color: #535766;
  font-size: 14px;
  line-height: 1;
  margin-bottom: 0;
  margin-top: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 400;
  display: block;
`;
const ProductPriceContainer = styled.div`
  font-family: Whitney Semibold;
  font-size: 16px;
  line-height: 15px;
  margin: 10px 0 6px;
  white-space: nowrap;
  font-size: 14px;
  color: #282c3f;
  font-weight: 500;
`;
const ProductDiscountedPrice = styled.span`
  font-size: 14px;
  font-family: Whitney Semibold;
  font-size: 16px;
  color: #282c3f;
  font-weight: 500;
`;
const ProductOriginalPrice = styled.span`
  text-decoration: line-through;
  color: #7e818c;
  font-weight: 400;
  margin-left: 5px;
  font-size: 12px;
`;
const ProductDiscountPercentage = styled.span`
  color: #ff905a;
  font-weight: 400;
  font-size: 12px;
  margin-left: 5px;
`;
// const ProductListItem = ({ product, children }) => {
//   <RLi></RLi>;
// };
const Products = () => {
  const [isHover, setHover] = useState(false);
  return (
    <div>
      <Navbar />
      <Main>
        <RowBase>
          <Breadcrumbs>
            <BreadcrumbList>
              <BreadcrumbListItem>Home</BreadcrumbListItem>
              <BreadcrumbListItem>Clothing</BreadcrumbListItem>
              <BreadcrumbListItem>men</BreadcrumbListItem>
              <BreadcrumbListItem>Shirt</BreadcrumbListItem>
            </BreadcrumbList>
          </Breadcrumbs>
        </RowBase>
        <RowBase>
          <TitleContainer>
            <Header1 className="title">
              Men T-shirt
              <Span> - 79051 items</Span>
            </Header1>
          </TitleContainer>
        </RowBase>
        <RowBase>
          <LeftSection>
            <Section>
              <LeftSectionDiv>
                <FilterDiv>
                  <FilterSpan>filters</FilterSpan>
                </FilterDiv>
                <CategoriesDiv>
                  {/* <CategoriesSpan>Categories</CategoriesSpan> */}
                  <Ul>
                    <Li>
                      <Label>
                        <Input type="radio" name="gender" value="Tshirts" />
                        Men
                      </Label>
                    </Li>
                    <Li>
                      <Label>
                        <Input type="radio" name="gender" value="Tshirts" />
                        Women
                      </Label>
                    </Li>
                    <Li>
                      <Label>
                        <Input type="radio" name="gender" value="Tshirts" />
                        Boy
                      </Label>
                    </Li>
                    <Li>
                      <Label>
                        <Input type="radio" name="gender" value="Tshirts" />
                        Girl
                      </Label>
                    </Li>
                  </Ul>
                </CategoriesDiv>
                <BrandDiv>
                  <BrandSpan>Brand</BrandSpan>
                  <Ul>
                    <Li>
                      <Label class="common-customCheckbox vertical-filters-label">
                        <Input type="checkbox" value="Tshirts" />
                        Roadster
                      </Label>
                    </Li>
                    <Li>
                      <Label class="common-customCheckbox vertical-filters-label">
                        <Input type="checkbox" value="Tshirts" />
                        WRONG
                      </Label>
                    </Li>
                  </Ul>
                </BrandDiv>
                <ColorDiv>
                  <ColorSpan>Color</ColorSpan>
                  <Ul>
                    <Li>
                      <Label>
                        <Input type="checkbox" value="Tshirts" />
                        <ColorDisplay color={"green"}></ColorDisplay>
                        Roadster
                      </Label>
                    </Li>
                    <Li>
                      <Label>
                        <Input type="checkbox" value="Tshirts" />
                        <ColorDisplay color={"limeGreen"}></ColorDisplay>
                        WRONG
                      </Label>
                    </Li>
                  </Ul>
                </ColorDiv>
              </LeftSectionDiv>
            </Section>
          </LeftSection>
          <RightSection>
            <RightSectionRowBase>
              <RSecttion>
                <RUl>
                  {products?.map((product) => (
                    <RLi
                      key={product.id}
                      onMouseOver={() => setHover(true)}
                      onMouseOut={() => setHover(false)}
                    >
                      <NavLink to="/">
                        <ImageSliderContainer>
                          <ProductSliderContainer isHover={isHover}>
                            {product.img.slice(0, 1).map((image) => (
                              <Image src={image} alt="Product" />
                            ))}
                            {/* <Image src={product.img} alt="Product" /> */}
                          </ProductSliderContainer>
                        </ImageSliderContainer>
                        <ProductMetaInfo>
                          <ProductHeader3>{product.brand}</ProductHeader3>
                          <ProductHeader4>{product.Desc}</ProductHeader4>
                          <ProductPriceContainer>
                            <span>
                              <ProductDiscountedPrice>
                                {`Rs. ${Math.floor(
                                  product.OriginalPrice *
                                    (product.discountPercentage / 100)
                                )}`}
                              </ProductDiscountedPrice>
                              <ProductOriginalPrice>{`1999`}</ProductOriginalPrice>
                            </span>
                            <ProductDiscountPercentage>
                              {`(${product.discountPercentage}%OFF)`}
                            </ProductDiscountPercentage>
                          </ProductPriceContainer>
                        </ProductMetaInfo>
                      </NavLink>
                    </RLi>
                  ))}
                  <RLi></RLi>
                  <RLi></RLi>
                </RUl>
              </RSecttion>
            </RightSectionRowBase>
          </RightSection>
        </RowBase>
      </Main>
      <Banner />
    </div>
  );
};

export default Products;
