import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Slider from "../components/Slider/Slider";
import Banner from "../components/Banner/Banner";
import { sliders } from "../components/Slider/SliderData";

import styled from "styled-components";
import { Link } from "react-router-dom";
import LazyComponent from "../components/LazyComponent";

// Import Image ArrayOfObjects From ImportImages

import {
  MytraLuxe,
  GiftCards,
} from "../pages/ImportImages/ImportHomePageImages";

// Import deal Of the Day Images

import DealOfTheDayImage1 from "../Assets/Images/d1.webp";
import DealOfTheDayImage2 from "../Assets/Images/d2.webp";
import DealOfTheDayImage3 from "../Assets/Images/d3.webp";
import DealOfTheDayImage4 from "../Assets/Images/d4.webp";
import DealOfTheDayImage5 from "../Assets/Images/d5.webp";
import DealOfTheDayImage6 from "../Assets/Images/d6.webp";
import DealOfTheDayImage7 from "../Assets/Images/d7.webp";
import DealOfTheDayImage8 from "../Assets/Images/d8.webp";

// Import Images of Best Of Myntra

import BestOfMyntraImage1 from "../Assets/Images/a1.webp";
import BestOfMyntraImage2 from "../Assets/Images/a2.webp";
import BestOfMyntraImage3 from "../Assets/Images/a3.webp";
import BestOfMyntraImage4 from "../Assets/Images/a4.webp";
import BestOfMyntraImage5 from "../Assets/Images/a5.webp";
import BestOfMyntraImage6 from "../Assets/Images/a6.webp";
import BestOfMyntraImage7 from "../Assets/Images/a7.webp";
import BestOfMyntraImage8 from "../Assets/Images/a8.webp";
import BestOfMyntraImage9 from "../Assets/Images/a9.webp";
import BestOfMyntraImage10 from "../Assets/Images/a10.webp";
import BestOfMyntraImage11 from "../Assets/Images/a11.webp";
import BestOfMyntraImage12 from "../Assets/Images/a12.webp";
import BestOfMyntraImage13 from "../Assets/Images/a13.webp";
import BestOfMyntraImage14 from "../Assets/Images/a14.webp";
import BestOfMyntraImage15 from "../Assets/Images/a15.webp";
import BestOfMyntraImage16 from "../Assets/Images/a16.webp";

// Import Images For Top Picks

import TopPicks1 from "../Assets/Images/b1.webp";
import TopPicks2 from "../Assets/Images/b2.webp";
import TopPicks3 from "../Assets/Images/b3.webp";
import TopPicks4 from "../Assets/Images/b4.webp";
import TopPicks5 from "../Assets/Images/b5.webp";
import TopPicks6 from "../Assets/Images/b6.webp";
import TopPicks7 from "../Assets/Images/b7.webp";

// Import Images for CATEGORIES TO BAG

import CategoriesToBag1 from "../Assets/Images/c1.webp";
import CategoriesToBag2 from "../Assets/Images/c2.webp";
import CategoriesToBag3 from "../Assets/Images/c3.webp";
import CategoriesToBag4 from "../Assets/Images/c4.webp";
import CategoriesToBag5 from "../Assets/Images/c5.webp";
import CategoriesToBag6 from "../Assets/Images/c6.webp";
import CategoriesToBag7 from "../Assets/Images/c7.webp";
import CategoriesToBag8 from "../Assets/Images/c8.webp";
import CategoriesToBag9 from "../Assets/Images/c9.webp";
import CategoriesToBag10 from "../Assets/Images/c10.webp";
import CategoriesToBag11 from "../Assets/Images/c11.webp";
import CategoriesToBag12 from "../Assets/Images/c12.webp";
import CategoriesToBag13 from "../Assets/Images/c13.webp";
import CategoriesToBag14 from "../Assets/Images/c14.webp";
import CategoriesToBag15 from "../Assets/Images/c15.webp";
import CategoriesToBag16 from "../Assets/Images/c16.webp";
import CategoriesToBag17 from "../Assets/Images/c17.webp";
import CategoriesToBag18 from "../Assets/Images/c18.webp";
import CategoriesToBag19 from "../Assets/Images/c19.webp";
import CategoriesToBag20 from "../Assets/Images/c20.webp";
import CategoriesToBag21 from "../Assets/Images/c21.webp";
import CategoriesToBag22 from "../Assets/Images/c22.webp";
import CategoriesToBag23 from "../Assets/Images/c23.webp";
import CategoriesToBag24 from "../Assets/Images/c24.webp";

// Import Images Of DEALS ON TOP BRANDS

import TopBrand1 from "../Assets/Images/e1.webp";
import TopBrand2 from "../Assets/Images/e2.webp";
import TopBrand3 from "../Assets/Images/e3.webp";
import TopBrand4 from "../Assets/Images/e4.webp";
import TopBrand5 from "../Assets/Images/e5.webp";
import TopBrand6 from "../Assets/Images/e6.webp";
import TopBrand7 from "../Assets/Images/e7.webp";
import TopBrand8 from "../Assets/Images/e8.webp";
import TopBrand9 from "../Assets/Images/e9.webp";
import TopBrand10 from "../Assets/Images/e10.webp";
import TopBrand11 from "../Assets/Images/e11.webp";
import TopBrand12 from "../Assets/Images/e12.webp";
import TopBrand13 from "../Assets/Images/e13.webp";
import TopBrand14 from "../Assets/Images/e14.webp";
import TopBrand15 from "../Assets/Images/e15.webp";
import TopBrand16 from "../Assets/Images/e16.webp";
import TopBrand17 from "../Assets/Images/e17.webp";
import TopBrand18 from "../Assets/Images/e18.webp";
import TopBrand19 from "../Assets/Images/e19.webp";
import TopBrand20 from "../Assets/Images/e20.webp";
import TopBrand21 from "../Assets/Images/e21.webp";
import TopBrand22 from "../Assets/Images/e22.webp";
import TopBrand23 from "../Assets/Images/e23.webp";
import TopBrand24 from "../Assets/Images/e24.webp";

// import Images For BRANDS AT SLASHED PRICES

import BrandSlashPrice1 from "../Assets/Images/f1.webp";
import BrandSlashPrice2 from "../Assets/Images/f2.webp";
import BrandSlashPrice3 from "../Assets/Images/f3.webp";
import BrandSlashPrice4 from "../Assets/Images/f4.webp";
import BrandSlashPrice5 from "../Assets/Images/f5.webp";
import BrandSlashPrice6 from "../Assets/Images/f6.webp";
import BrandSlashPrice7 from "../Assets/Images/f7.webp";
import BrandSlashPrice8 from "../Assets/Images/f8.webp";
import BrandSlashPrice9 from "../Assets/Images/f9.webp";
import BrandSlashPrice10 from "../Assets/Images/f10.webp";
import BrandSlashPrice11 from "../Assets/Images/f11.webp";
import BrandSlashPrice12 from "../Assets/Images/f12.webp";
import BrandSlashPrice13 from "../Assets/Images/f13.webp";
import BrandSlashPrice14 from "../Assets/Images/f14.webp";

// Import Images For Bust Buy

import BestBuy1 from "../Assets/Images/g1.webp";
import BestBuy2 from "../Assets/Images/g2.webp";
import BestBuy3 from "../Assets/Images/g3.webp";
import BestBuy4 from "../Assets/Images/g4.webp";
import BestBuy5 from "../Assets/Images/g5.webp";
import BestBuy6 from "../Assets/Images/g6.webp";
import BestBuy7 from "../Assets/Images/g7.webp";
import BestBuy8 from "../Assets/Images/g8.webp";
import BestBuy9 from "../Assets/Images/g9.webp";
import BestBuy10 from "../Assets/Images/g10.webp";
import BestBuy11 from "../Assets/Images/g11.webp";
import BestBuy12 from "../Assets/Images/g12.webp";
import BestBuy13 from "../Assets/Images/g13.webp";
import BestBuy14 from "../Assets/Images/g14.webp";
import BestBuy15 from "../Assets/Images/g15.webp";
import BestBuy16 from "../Assets/Images/g16.webp";

const Div = styled.div`
  max-width: 100%;
`;

const SliderWrapper = styled.div`
  flex: 0 1 200px;
`;
const DealOfTheDayContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
`;

const DealOfTheDayWrapper = styled.div`
  width: 100%;
  height: 100%;
  flex: 1 1 200px;
`;

const HeaderContainer = styled.div`
  display: block;
  /* width: 100%; */
`;
const HeaderText = styled.h1`
  box-sizing: border-box;
  text-transform: uppercase;
  text-align: start;
  width: 100%;
  color: #3e4152;
  letter-spacing: 0.15em;
  font-size: 1.8em;
  padding: 30px 0 50px 30px;
  max-height: 5em;
  font-weight: 600;
  text-align: start;

  @media screen and (max-width: 1200px) {
     font-size: 1.6em;
  }
    @media screen and (max-width: 992px) {
     font-size: 1.4em;
     transition: all ease-in-out;
     padding: 30px 0 30px 20px;
  }
  @media screen and (max-width: 768px) {
     font-size: 1.2em;
     padding: 30px 0 30px 10px;
  }
   @media screen and (max-width: 560px) {
     font-size: 1em;
     padding: 30px 0 30px 5px;
  }

`;
const NavLink = styled(Link)`
  text-decoration: none;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0;
`;
const BestOfMyntraHeaderContainer = styled.div`
  box-sizing: border-box;
  display: block;
  width: 100%;
`;

const BestOfMyntraContainer = styled.div`
  max-width: 100%;
  margin: 0;
  /* .aspectcontainer {
    position: absolute;
    top: 10%;
    bottom: 0;
    left: 0;
    right: 0;
  } */
`;
const BestOfMyntraRowBasedContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
`;
const BestOfMyntraRowBasedWrapper = styled.div`
  flex: 1 1 0%;
  align-self: flex-start;
  flex-wrap: wrap;
  flex-direction: column;
`;
const BestOfMyntraContainerBase = styled.div`
  box-sizing: border-box;
  width: 100%;
  position: relative;
  top: 0;
  overflow: hidden;
  background-repeat: no-repeat;
  padding-right: 2px;
`;

const Home = () => {
  const DealOfTheDayImages = [
    {
      id: "1",
      to: "/shop/men",
      img: `${DealOfTheDayImage1}`,
    },
    {
      id: "2",
      to: "/shop/men",
      img: `${DealOfTheDayImage2}`,
    },
    {
      id: "3",
      to: "/shop/men",
      img: `${DealOfTheDayImage3}`,
    },
    {
      id: "4",
      to: "/shop/men",
      img: `${DealOfTheDayImage4}`,
    },
    {
      id: "5",
      to: "/shop/men",
      img: `${DealOfTheDayImage5}`,
    },
    {
      id: "6",
      to: "/shop/men",
      img: `${DealOfTheDayImage6}`,
    },
    {
      id: "7",
      to: "/shop/men",
      img: `${DealOfTheDayImage7}`,
    },
    {
      id: "8",
      to: "/shop/men",
      img: `${DealOfTheDayImage8}`,
    },
  ];

  const BestOfMyntraContainer1 = [
    { id: "1", to: "/shop/men", img: `${BestOfMyntraImage1}` },
    { id: "2", to: "/shop/men", img: `${BestOfMyntraImage2}` },
    { id: "3", to: "/shop/men", img: `${BestOfMyntraImage3}` },
    { id: "4", to: "/shop/men", img: `${BestOfMyntraImage4}` },
    { id: "5", to: "/shop/men", img: `${BestOfMyntraImage5}` },
    { id: "6", to: "/shop/men", img: `${BestOfMyntraImage6}` },
    { id: "7", to: "/shop/men", img: `${BestOfMyntraImage7}` },
    { id: "8", to: "/shop/men", img: `${BestOfMyntraImage8}` },
  ];
  const BestOfMyntraContainer2 = [
    { id: "9", to: "/shop/men", img: `${BestOfMyntraImage9}` },
    { id: "10", to: "/shop/men", img: `${BestOfMyntraImage10}` },
    { id: "11", to: "/shop/men", img: `${BestOfMyntraImage11}` },
    { id: "12", to: "/shop/men", img: `${BestOfMyntraImage12}` },
    { id: "13", to: "/shop/men", img: `${BestOfMyntraImage13}` },
    { id: "14", to: "/shop/men", img: `${BestOfMyntraImage14}` },
    { id: "15", to: "/shop/men", img: `${BestOfMyntraImage15}` },
    { id: "16", to: "/shop/men", img: `${BestOfMyntraImage16}` },
  ];
  const TopPicks = [
    {
      id: "1",
      to: "/shop/men",
      img: `${TopPicks1}`,
    },
    {
      id: "2",
      to: "/shop/men",
      img: `${TopPicks2}`,
    },
    {
      id: "3",
      to: "/shop/men",
      img: `${TopPicks3}`,
    },
    {
      id: "4",
      to: "/shop/men",
      img: `${TopPicks4}`,
    },
    {
      id: "5",
      to: "/shop/men",
      img: `${TopPicks5}`,
    },
    {
      id: "6",
      to: "/shop/men",
      img: `${TopPicks6}`,
    },
    {
      id: "7",
      to: "/shop/men",
      img: `${TopPicks7}`,
    },
  ];
  const CategoriesContainer1 = [
    {
      id: "1",
      to: "/shop/men",
      img: `${CategoriesToBag1}`,
    },
    {
      id: "2",
      to: "/shop/men",
      img: `${CategoriesToBag2}`,
    },
    {
      id: "3",
      to: "/shop/men",
      img: `${CategoriesToBag3}`,
    },
    {
      id: "4",
      to: "/shop/men",
      img: `${CategoriesToBag4}`,
    },
    {
      id: "5",
      to: "/shop/men",
      img: `${CategoriesToBag5}`,
    },
    {
      id: "6",
      to: "/shop/men",
      img: `${CategoriesToBag6}`,
    },
    {
      id: "7",
      to: "/shop/men",
      img: `${CategoriesToBag7}`,
    },
    {
      id: "8",
      to: "/shop/men",
      img: `${CategoriesToBag8}`,
    },
  ];
  const CategoriesContainer2 = [
    {
      id: "9",
      to: "/shop/men",
      img: `${CategoriesToBag9}`,
    },
    {
      id: "10",
      to: "/shop/men",
      img: `${CategoriesToBag10}`,
    },
    {
      id: "11",
      to: "/shop/men",
      img: `${CategoriesToBag11}`,
    },
    {
      id: "12",
      to: "/shop/men",
      img: `${CategoriesToBag12}`,
    },
    {
      id: "13",
      to: "/shop/men",
      img: `${CategoriesToBag13}`,
    },
    {
      id: "14",
      to: "/shop/men",
      img: `${CategoriesToBag14}`,
    },
    {
      id: "15",
      to: "/shop/men",
      img: `${CategoriesToBag15}`,
    },
    {
      id: "16",
      to: "/shop/men",
      img: `${CategoriesToBag16}`,
    },
  ];
  const CategoriesContainer3 = [
    {
      id: "17",
      to: "/shop/men",
      img: `${CategoriesToBag17}`,
    },
    {
      id: "18",
      to: "/shop/men",
      img: `${CategoriesToBag18}`,
    },
    {
      id: "19",
      to: "/shop/men",
      img: `${CategoriesToBag19}`,
    },
    {
      id: "20",
      to: "/shop/men",
      img: `${CategoriesToBag10}`,
    },
    {
      id: "21",
      to: "/shop/men",
      img: `${CategoriesToBag21}`,
    },
    {
      id: "22",
      to: "/shop/men",
      img: `${CategoriesToBag22}`,
    },
    {
      id: "23",
      to: "/shop/men",
      img: `${CategoriesToBag23}`,
    },
    {
      id: "24",
      to: "/shop/men",
      img: `${CategoriesToBag24}`,
    },
  ];

  const TopBrands1 = [
    {
      id: "1",
      to: "/shop/men",
      img: `${TopBrand1}`,
    },
    {
      id: "2",
      to: "/shop/men",
      img: `${TopBrand2}`,
    },
    {
      id: "3",
      to: "/shop/men",
      img: `${TopBrand3}`,
    },
    {
      id: "4",
      to: "/shop/men",
      img: `${TopBrand4}`,
    },
    {
      id: "5",
      to: "/shop/men",
      img: `${TopBrand5}`,
    },
    {
      id: "6",
      to: "/shop/men",
      img: `${TopBrand6}`,
    },
    {
      id: "7",
      to: "/shop/men",
      img: `${TopBrand7}`,
    },
    {
      id: "8",
      to: "/shop/men",
      img: `${TopBrand8}`,
    },
  ];
  const TopBrands2 = [
    {
      id: "1",
      to: "/shop/men",
      img: `${TopBrand9}`,
    },
    {
      id: "2",
      to: "/shop/men",
      img: `${TopBrand10}`,
    },
    {
      id: "3",
      to: "/shop/men",
      img: `${TopBrand11}`,
    },
    {
      id: "4",
      to: "/shop/men",
      img: `${TopBrand12}`,
    },
    {
      id: "5",
      to: "/shop/men",
      img: `${TopBrand13}`,
    },
    {
      id: "6",
      to: "/shop/men",
      img: `${TopBrand14}`,
    },
    {
      id: "7",
      to: "/shop/men",
      img: `${TopBrand15}`,
    },
    {
      id: "8",
      to: "/shop/men",
      img: `${TopBrand16}`,
    },
  ];
  const TopBrands3 = [
    {
      id: "1",
      to: "/shop/men",
      img: `${TopBrand17}`,
    },
    {
      id: "2",
      to: "/shop/men",
      img: `${TopBrand18}`,
    },
    {
      id: "3",
      to: "/shop/men",
      img: `${TopBrand19}`,
    },
    {
      id: "4",
      to: "/shop/men",
      img: `${TopBrand20}`,
    },
    {
      id: "5",
      to: "/shop/men",
      img: `${TopBrand21}`,
    },
    {
      id: "6",
      to: "/shop/men",
      img: `${TopBrand22}`,
    },
    {
      id: "7",
      to: "/shop/men",
      img: `${TopBrand23}`,
    },
    {
      id: "8",
      to: "/shop/men",
      img: `${TopBrand24}`,
    },
  ];

  const BrandSlashPrice = [
    {
      id: "1",
      to: "/shop/men",
      img: `${BrandSlashPrice1}`,
    },
    {
      id: "2",
      to: "/shop/men",
      img: `${BrandSlashPrice2}`,
    },

    {
      id: "3",
      to: "/shop/men",
      img: `${BrandSlashPrice3}`,
    },
    {
      id: "4",
      to: "/shop/men",
      img: `${BrandSlashPrice4}`,
    },
    {
      id: "5",
      to: "/shop/men",
      img: `${BrandSlashPrice5}`,
    },
    {
      id: "6",
      to: "/shop/men",
      img: `${BrandSlashPrice6}`,
    },
    {
      id: "7",
      to: "/shop/men",
      img: `${BrandSlashPrice7}`,
    },
    {
      id: "8",
      to: "/shop/men",
      img: `${BrandSlashPrice8}`,
    },
    {
      id: "9",
      to: "/shop/men",
      img: `${BrandSlashPrice9}`,
    },
    {
      id: "10",
      to: "/shop/men",
      img: `${BrandSlashPrice10}`,
    },

    {
      id: "11",
      to: "/shop/men",
      img: `${BrandSlashPrice11}`,
    },
    {
      id: "12",
      to: "/shop/men",
      img: `${BrandSlashPrice12}`,
    },
    {
      id: "13",
      to: "/shop/men",
      img: `${BrandSlashPrice13}`,
    },
    {
      id: "14",
      to: "/shop/men",
      img: `${BrandSlashPrice14}`,
    },
  ];

  const BestBuy = [
    {
      id: "1",
      to: "/shop/men",
      img: `${BestBuy1}`,
    },
    {
      id: "2",
      to: "/shop/men",
      img: `${BestBuy2}`,
    },

    {
      id: "3",
      to: "/shop/men",
      img: `${BestBuy3}`,
    },
    {
      id: "4",
      to: "/shop/men",
      img: `${BestBuy4}`,
    },
    {
      id: "5",
      to: "/shop/men",
      img: `${BestBuy5}`,
    },
    {
      id: "6",
      to: "/shop/men",
      img: `${BestBuy6}`,
    },
    {
      id: "7",
      to: "/shop/men",
      img: `${BestBuy7}`,
    },
    {
      id: "8",
      to: "/shop/men",
      img: `${BestBuy8}`,
    },
    {
      id: "9",
      to: "/shop/men",
      img: `${BestBuy9}`,
    },
    {
      id: "10",
      to: "/shop/men",
      img: `${BestBuy10}`,
    },

    {
      id: "11",
      to: "/shop/men",
      img: `${BestBuy11}`,
    },
    {
      id: "12",
      to: "/shop/men",
      img: `${BestBuy12}`,
    },
    {
      id: "13",
      to: "/shop/men",
      img: `${BestBuy13}`,
    },
    {
      id: "14",
      to: "/shop/men",
      img: `${BestBuy14}`,
    },
    {
      id: "15",
      to: "/shop/men",
      img: `${BestBuy15}`,
    },
    {
      id: "16",
      to: "/shop/men",
      img: `${BestBuy16}`,
    },
  ];
  return (
    <>
      <Navbar />
      <SliderWrapper>
        <Slider sliders={sliders} />
      </SliderWrapper>
      <Div>
        <HeaderContainer>
          <HeaderText>Deal of the day</HeaderText>
        </HeaderContainer>
        <DealOfTheDayContainer>
          {DealOfTheDayImages?.map((item) => (
            <DealOfTheDayWrapper key={item.id}>
              <NavLink to={item.to} key={item.id}>
                <LazyComponent>
                  <Img data-src={item.img} key={item.id} />
                </LazyComponent>
              </NavLink>
            </DealOfTheDayWrapper>
          ))}
        </DealOfTheDayContainer>
        <BestOfMyntraHeaderContainer>
          <HeaderText>BEST OF MYNTRA EXCLUSIVE BRANDS</HeaderText>
        </BestOfMyntraHeaderContainer>
        <BestOfMyntraContainer>
          <BestOfMyntraRowBasedContainer>
            {BestOfMyntraContainer1?.map((item) => (
              <BestOfMyntraRowBasedWrapper key={item.id}>
                <BestOfMyntraContainerBase>
                  <BestOfMyntraContainer>
                    <BestOfMyntraRowBasedContainer>
                      <BestOfMyntraRowBasedWrapper>
                        <BestOfMyntraContainerBase>
                          <div>
                            <BestOfMyntraContainer className="aspectcontainer">
                              <BestOfMyntraRowBasedContainer>
                                <BestOfMyntraRowBasedWrapper>
                                  <NavLink to={item.to}>
                                    <LazyComponent>
                                      <Img data-src={item.img} />
                                    </LazyComponent>
                                  </NavLink>
                                </BestOfMyntraRowBasedWrapper>
                              </BestOfMyntraRowBasedContainer>
                            </BestOfMyntraContainer>
                          </div>
                        </BestOfMyntraContainerBase>
                      </BestOfMyntraRowBasedWrapper>
                    </BestOfMyntraRowBasedContainer>
                  </BestOfMyntraContainer>
                </BestOfMyntraContainerBase>
              </BestOfMyntraRowBasedWrapper>
            ))}
          </BestOfMyntraRowBasedContainer>
        </BestOfMyntraContainer>
        <BestOfMyntraContainer>
          <BestOfMyntraRowBasedContainer>
            {BestOfMyntraContainer2?.map((item) => (
              <BestOfMyntraRowBasedWrapper key={item.id}>
                <BestOfMyntraContainerBase>
                  <BestOfMyntraContainer>
                    <BestOfMyntraRowBasedContainer>
                      <BestOfMyntraRowBasedWrapper>
                        <BestOfMyntraContainerBase>
                          <div>
                            <BestOfMyntraContainer className="aspectcontainer">
                              <BestOfMyntraRowBasedContainer>
                                <BestOfMyntraRowBasedWrapper>
                                  <NavLink to={item.to}>
                                    <LazyComponent>
                                      <Img data-src={item.img} />
                                    </LazyComponent>
                                  </NavLink>
                                </BestOfMyntraRowBasedWrapper>
                              </BestOfMyntraRowBasedContainer>
                            </BestOfMyntraContainer>
                          </div>
                        </BestOfMyntraContainerBase>
                      </BestOfMyntraRowBasedWrapper>
                    </BestOfMyntraRowBasedContainer>
                  </BestOfMyntraContainer>
                </BestOfMyntraContainerBase>
              </BestOfMyntraRowBasedWrapper>
            ))}
          </BestOfMyntraRowBasedContainer>
        </BestOfMyntraContainer>
        <HeaderContainer>
          <HeaderText>Top Picks</HeaderText>
        </HeaderContainer>
        <BestOfMyntraContainer>
          <BestOfMyntraRowBasedContainer>
            {TopPicks?.map((item) => (
              <BestOfMyntraRowBasedWrapper key={item.id}>
                <BestOfMyntraContainerBase>
                  <BestOfMyntraContainer>
                    <BestOfMyntraRowBasedContainer>
                      <BestOfMyntraRowBasedWrapper>
                        <BestOfMyntraContainerBase>
                          <div>
                            <BestOfMyntraContainer className="aspectcontainer">
                              <BestOfMyntraRowBasedContainer>
                                <BestOfMyntraRowBasedWrapper>
                                  <NavLink to={item.to}>
                                    <LazyComponent>
                                      <Img data-src={item.img} />
                                    </LazyComponent>
                                  </NavLink>
                                </BestOfMyntraRowBasedWrapper>
                              </BestOfMyntraRowBasedContainer>
                            </BestOfMyntraContainer>
                          </div>
                        </BestOfMyntraContainerBase>
                      </BestOfMyntraRowBasedWrapper>
                    </BestOfMyntraRowBasedContainer>
                  </BestOfMyntraContainer>
                </BestOfMyntraContainerBase>
              </BestOfMyntraRowBasedWrapper>
            ))}
          </BestOfMyntraRowBasedContainer>
        </BestOfMyntraContainer>
        <HeaderContainer>
          <HeaderText>CATEGORIES TO BAG</HeaderText>
        </HeaderContainer>
        <BestOfMyntraContainer>
          <BestOfMyntraRowBasedContainer>
            {CategoriesContainer1?.map((item) => (
              <BestOfMyntraRowBasedWrapper key={item.id}>
                <BestOfMyntraContainerBase style={{ paddingRight: "0px" }}>
                  <BestOfMyntraContainer>
                    <BestOfMyntraRowBasedContainer>
                      <BestOfMyntraRowBasedWrapper>
                        <BestOfMyntraContainerBase
                          style={{ paddingRight: "0px" }}
                        >
                          <div>
                            <BestOfMyntraContainer className="aspectcontainer">
                              <BestOfMyntraRowBasedContainer>
                                <BestOfMyntraRowBasedWrapper>
                                  <NavLink to={item.to}>
                                    <LazyComponent>
                                      <Img data-src={item.img} />
                                    </LazyComponent>
                                  </NavLink>
                                </BestOfMyntraRowBasedWrapper>
                              </BestOfMyntraRowBasedContainer>
                            </BestOfMyntraContainer>
                          </div>
                        </BestOfMyntraContainerBase>
                      </BestOfMyntraRowBasedWrapper>
                    </BestOfMyntraRowBasedContainer>
                  </BestOfMyntraContainer>
                </BestOfMyntraContainerBase>
              </BestOfMyntraRowBasedWrapper>
            ))}
          </BestOfMyntraRowBasedContainer>
        </BestOfMyntraContainer>
        <BestOfMyntraContainer>
          <BestOfMyntraRowBasedContainer>
            {CategoriesContainer2?.map((item) => (
              <BestOfMyntraRowBasedWrapper key={item.id}>
                <BestOfMyntraContainerBase style={{ paddingRight: "0px" }}>
                  <BestOfMyntraContainer>
                    <BestOfMyntraRowBasedContainer>
                      <BestOfMyntraRowBasedWrapper>
                        <BestOfMyntraContainerBase
                          style={{ paddingRight: "0px" }}
                        >
                          <div>
                            <BestOfMyntraContainer className="aspectcontainer">
                              <BestOfMyntraRowBasedContainer>
                                <BestOfMyntraRowBasedWrapper>
                                  <NavLink to={item.to}>
                                    <LazyComponent>
                                      <Img data-src={item.img} />
                                    </LazyComponent>
                                  </NavLink>
                                </BestOfMyntraRowBasedWrapper>
                              </BestOfMyntraRowBasedContainer>
                            </BestOfMyntraContainer>
                          </div>
                        </BestOfMyntraContainerBase>
                      </BestOfMyntraRowBasedWrapper>
                    </BestOfMyntraRowBasedContainer>
                  </BestOfMyntraContainer>
                </BestOfMyntraContainerBase>
              </BestOfMyntraRowBasedWrapper>
            ))}
          </BestOfMyntraRowBasedContainer>
        </BestOfMyntraContainer>
        <BestOfMyntraContainer>
          <BestOfMyntraRowBasedContainer>
            {CategoriesContainer3?.map((item) => (
              <BestOfMyntraRowBasedWrapper key={item.id}>
                <BestOfMyntraContainerBase style={{ paddingRight: "0px" }}>
                  <BestOfMyntraContainer>
                    <BestOfMyntraRowBasedContainer>
                      <BestOfMyntraRowBasedWrapper>
                        <BestOfMyntraContainerBase
                          style={{ paddingRight: "0px" }}
                        >
                          <div>
                            <BestOfMyntraContainer className="aspectcontainer">
                              <BestOfMyntraRowBasedContainer>
                                <BestOfMyntraRowBasedWrapper>
                                  <NavLink to={item.to}>
                                    <LazyComponent>
                                      <Img data-src={item.img} />
                                    </LazyComponent>
                                  </NavLink>
                                </BestOfMyntraRowBasedWrapper>
                              </BestOfMyntraRowBasedContainer>
                            </BestOfMyntraContainer>
                          </div>
                        </BestOfMyntraContainerBase>
                      </BestOfMyntraRowBasedWrapper>
                    </BestOfMyntraRowBasedContainer>
                  </BestOfMyntraContainer>
                </BestOfMyntraContainerBase>
              </BestOfMyntraRowBasedWrapper>
            ))}
          </BestOfMyntraRowBasedContainer>
        </BestOfMyntraContainer>
        <HeaderContainer>
          <HeaderText>DEALS ON TOP BRANDS</HeaderText>
        </HeaderContainer>
        <BestOfMyntraContainer>
          <BestOfMyntraRowBasedContainer>
            {TopBrands1?.map((item) => (
              <BestOfMyntraRowBasedWrapper key={item.id}>
                <BestOfMyntraContainerBase style={{ paddingRight: "0px" }}>
                  <BestOfMyntraContainer>
                    <BestOfMyntraRowBasedContainer>
                      <BestOfMyntraRowBasedWrapper>
                        <BestOfMyntraContainerBase
                          style={{ paddingRight: "0px" }}
                        >
                          <div>
                            <BestOfMyntraContainer className="aspectcontainer">
                              <BestOfMyntraRowBasedContainer>
                                <BestOfMyntraRowBasedWrapper>
                                  <NavLink to={item.to}>
                                    <LazyComponent>
                                      <Img data-src={item.img} />
                                    </LazyComponent>
                                  </NavLink>
                                </BestOfMyntraRowBasedWrapper>
                              </BestOfMyntraRowBasedContainer>
                            </BestOfMyntraContainer>
                          </div>
                        </BestOfMyntraContainerBase>
                      </BestOfMyntraRowBasedWrapper>
                    </BestOfMyntraRowBasedContainer>
                  </BestOfMyntraContainer>
                </BestOfMyntraContainerBase>
              </BestOfMyntraRowBasedWrapper>
            ))}
          </BestOfMyntraRowBasedContainer>
        </BestOfMyntraContainer>
        <BestOfMyntraContainer>
          <BestOfMyntraRowBasedContainer>
            {TopBrands2?.map((item) => (
              <BestOfMyntraRowBasedWrapper key={item.id}>
                <BestOfMyntraContainerBase style={{ paddingRight: "0px" }}>
                  <BestOfMyntraContainer>
                    <BestOfMyntraRowBasedContainer>
                      <BestOfMyntraRowBasedWrapper>
                        <BestOfMyntraContainerBase
                          style={{ paddingRight: "0px" }}
                        >
                          <div>
                            <BestOfMyntraContainer className="aspectcontainer">
                              <BestOfMyntraRowBasedContainer>
                                <BestOfMyntraRowBasedWrapper>
                                  <NavLink to={item.to}>
                                    <LazyComponent>
                                      <Img data-src={item.img} />
                                    </LazyComponent>
                                  </NavLink>
                                </BestOfMyntraRowBasedWrapper>
                              </BestOfMyntraRowBasedContainer>
                            </BestOfMyntraContainer>
                          </div>
                        </BestOfMyntraContainerBase>
                      </BestOfMyntraRowBasedWrapper>
                    </BestOfMyntraRowBasedContainer>
                  </BestOfMyntraContainer>
                </BestOfMyntraContainerBase>
              </BestOfMyntraRowBasedWrapper>
            ))}
          </BestOfMyntraRowBasedContainer>
        </BestOfMyntraContainer>
        <BestOfMyntraContainer>
          <BestOfMyntraRowBasedContainer>
            {TopBrands3?.map((item) => (
              <BestOfMyntraRowBasedWrapper key={item.id}>
                <BestOfMyntraContainerBase style={{ paddingRight: "0px" }}>
                  <BestOfMyntraContainer>
                    <BestOfMyntraRowBasedContainer>
                      <BestOfMyntraRowBasedWrapper>
                        <BestOfMyntraContainerBase
                          style={{ paddingRight: "0px" }}
                        >
                          <div>
                            <BestOfMyntraContainer className="aspectcontainer">
                              <BestOfMyntraRowBasedContainer>
                                <BestOfMyntraRowBasedWrapper>
                                  <NavLink to={item.to}>
                                    <LazyComponent>
                                      <Img data-src={item.img} />
                                    </LazyComponent>
                                  </NavLink>
                                </BestOfMyntraRowBasedWrapper>
                              </BestOfMyntraRowBasedContainer>
                            </BestOfMyntraContainer>
                          </div>
                        </BestOfMyntraContainerBase>
                      </BestOfMyntraRowBasedWrapper>
                    </BestOfMyntraRowBasedContainer>
                  </BestOfMyntraContainer>
                </BestOfMyntraContainerBase>
              </BestOfMyntraRowBasedWrapper>
            ))}
          </BestOfMyntraRowBasedContainer>
        </BestOfMyntraContainer>
        <HeaderContainer>
          <HeaderText>BRANDS AT SLASHED PRICES</HeaderText>
        </HeaderContainer>
        <BestOfMyntraContainer style={{ marginTop: "4px" }}>
          <BestOfMyntraRowBasedContainer>
            {BrandSlashPrice?.slice(7, 14).map((item) => (
              <BestOfMyntraRowBasedWrapper key={item.id}>
                <BestOfMyntraContainerBase style={{ paddingRight: "0px" }}>
                  <BestOfMyntraContainer>
                    <BestOfMyntraRowBasedContainer>
                      <BestOfMyntraRowBasedWrapper>
                        <BestOfMyntraContainerBase
                          style={{ paddingRight: "0px" }}
                        >
                          <div>
                            <BestOfMyntraContainer className="aspectcontainer">
                              <BestOfMyntraRowBasedContainer>
                                <BestOfMyntraRowBasedWrapper>
                                  <NavLink to={item.to}>
                                    <LazyComponent>
                                      <Img data-src={item.img} />
                                    </LazyComponent>
                                  </NavLink>
                                </BestOfMyntraRowBasedWrapper>
                              </BestOfMyntraRowBasedContainer>
                            </BestOfMyntraContainer>
                          </div>
                        </BestOfMyntraContainerBase>
                      </BestOfMyntraRowBasedWrapper>
                    </BestOfMyntraRowBasedContainer>
                  </BestOfMyntraContainer>
                </BestOfMyntraContainerBase>
              </BestOfMyntraRowBasedWrapper>
            ))}
          </BestOfMyntraRowBasedContainer>
        </BestOfMyntraContainer>
        <HeaderContainer>
          <HeaderText>Best Buy</HeaderText>
        </HeaderContainer>
        <BestOfMyntraContainer>
          <BestOfMyntraRowBasedContainer>
            {BestBuy?.slice(0, 7).map((item) => (
              <BestOfMyntraRowBasedWrapper key={item.id}>
                <BestOfMyntraContainerBase>
                  <BestOfMyntraContainer>
                    <BestOfMyntraRowBasedContainer>
                      <BestOfMyntraRowBasedWrapper>
                        <BestOfMyntraContainerBase
                          style={{ paddingRight: "0px" }}
                        >
                          <div>
                            <BestOfMyntraContainer className="aspectcontainer">
                              <BestOfMyntraRowBasedContainer>
                                <BestOfMyntraRowBasedWrapper>
                                  <NavLink to={item.to}>
                                    <LazyComponent>
                                      <Img data-src={item.img} />
                                    </LazyComponent>
                                  </NavLink>
                                </BestOfMyntraRowBasedWrapper>
                              </BestOfMyntraRowBasedContainer>
                            </BestOfMyntraContainer>
                          </div>
                        </BestOfMyntraContainerBase>
                      </BestOfMyntraRowBasedWrapper>
                    </BestOfMyntraRowBasedContainer>
                  </BestOfMyntraContainer>
                </BestOfMyntraContainerBase>
              </BestOfMyntraRowBasedWrapper>
            ))}
          </BestOfMyntraRowBasedContainer>
        </BestOfMyntraContainer>
        <BestOfMyntraContainer>
          <BestOfMyntraRowBasedContainer>
            {BestBuy?.slice(7, 14).map((item) => (
              <BestOfMyntraRowBasedWrapper key={item.id}>
                <BestOfMyntraContainerBase style={{ paddingRight: "0px" }}>
                  <BestOfMyntraContainer>
                    <BestOfMyntraRowBasedContainer>
                      <BestOfMyntraRowBasedWrapper>
                        <BestOfMyntraContainerBase
                          style={{ paddingRight: "0px" }}
                        >
                          <div>
                            <BestOfMyntraContainer className="aspectcontainer">
                              <BestOfMyntraRowBasedContainer>
                                <BestOfMyntraRowBasedWrapper>
                                  <NavLink to={item.to}>
                                    <LazyComponent>
                                      <Img data-src={item.img} />
                                    </LazyComponent>
                                  </NavLink>
                                </BestOfMyntraRowBasedWrapper>
                              </BestOfMyntraRowBasedContainer>
                            </BestOfMyntraContainer>
                          </div>
                        </BestOfMyntraContainerBase>
                      </BestOfMyntraRowBasedWrapper>
                    </BestOfMyntraRowBasedContainer>
                  </BestOfMyntraContainer>
                </BestOfMyntraContainerBase>
              </BestOfMyntraRowBasedWrapper>
            ))}
          </BestOfMyntraRowBasedContainer>
        </BestOfMyntraContainer>
        <HeaderContainer>
          <HeaderText>MYNTRA LUXE</HeaderText>
        </HeaderContainer>
        <BestOfMyntraContainer>
          <BestOfMyntraRowBasedContainer>
            {MytraLuxe?.slice(0, 7).map((item) => (
              <BestOfMyntraRowBasedWrapper key={item.id}>
                <BestOfMyntraContainerBase style={{ paddingRight: "0px" }}>
                  <BestOfMyntraContainer>
                    <BestOfMyntraRowBasedContainer>
                      <BestOfMyntraRowBasedWrapper>
                        <BestOfMyntraContainerBase
                          style={{ paddingRight: "0px" }}
                        >
                          <div>
                            <BestOfMyntraContainer className="aspectcontainer">
                              <BestOfMyntraRowBasedContainer>
                                <BestOfMyntraRowBasedWrapper>
                                  <NavLink to={item.to}>
                                    <LazyComponent>
                                      <Img data-src={item.img} />
                                    </LazyComponent>
                                  </NavLink>
                                </BestOfMyntraRowBasedWrapper>
                              </BestOfMyntraRowBasedContainer>
                            </BestOfMyntraContainer>
                          </div>
                        </BestOfMyntraContainerBase>
                      </BestOfMyntraRowBasedWrapper>
                    </BestOfMyntraRowBasedContainer>
                  </BestOfMyntraContainer>
                </BestOfMyntraContainerBase>
              </BestOfMyntraRowBasedWrapper>
            ))}
          </BestOfMyntraRowBasedContainer>
        </BestOfMyntraContainer>
        <BestOfMyntraContainer>
          <BestOfMyntraRowBasedContainer>
            {MytraLuxe?.slice(7, 14).map((item) => (
              <BestOfMyntraRowBasedWrapper key={item.id}>
                <BestOfMyntraContainerBase style={{ paddingRight: "0px" }}>
                  <BestOfMyntraContainer>
                    <BestOfMyntraRowBasedContainer>
                      <BestOfMyntraRowBasedWrapper>
                        <BestOfMyntraContainerBase
                          style={{ paddingRight: "0px" }}
                        >
                          <div>
                            <BestOfMyntraContainer className="aspectcontainer">
                              <BestOfMyntraRowBasedContainer>
                                <BestOfMyntraRowBasedWrapper>
                                  <NavLink to={item.to}>
                                    <LazyComponent>
                                      <Img data-src={item.img} />
                                    </LazyComponent>
                                  </NavLink>
                                </BestOfMyntraRowBasedWrapper>
                              </BestOfMyntraRowBasedContainer>
                            </BestOfMyntraContainer>
                          </div>
                        </BestOfMyntraContainerBase>
                      </BestOfMyntraRowBasedWrapper>
                    </BestOfMyntraRowBasedContainer>
                  </BestOfMyntraContainer>
                </BestOfMyntraContainerBase>
              </BestOfMyntraRowBasedWrapper>
            ))}
          </BestOfMyntraRowBasedContainer>
        </BestOfMyntraContainer>
        <HeaderContainer>
          <HeaderText>Gift Cards</HeaderText>
        </HeaderContainer>
        <BestOfMyntraContainer>
          <BestOfMyntraRowBasedContainer>
            {GiftCards?.slice(0, 4).map((item) => (
              <BestOfMyntraRowBasedWrapper key={item.id}>
                <BestOfMyntraContainerBase style={{ paddingRight: "0px" }}>
                  <BestOfMyntraContainer>
                    <BestOfMyntraRowBasedContainer>
                      <BestOfMyntraRowBasedWrapper>
                        <BestOfMyntraContainerBase
                          style={{ paddingRight: "0px" }}
                        >
                          <div>
                            <BestOfMyntraContainer className="aspectcontainer">
                              <BestOfMyntraRowBasedContainer>
                                <BestOfMyntraRowBasedWrapper>
                                  <NavLink to={item.to}>
                                    <LazyComponent>
                                      <Img data-src={item.img} />
                                    </LazyComponent>
                                  </NavLink>
                                </BestOfMyntraRowBasedWrapper>
                              </BestOfMyntraRowBasedContainer>
                            </BestOfMyntraContainer>
                          </div>
                        </BestOfMyntraContainerBase>
                      </BestOfMyntraRowBasedWrapper>
                    </BestOfMyntraRowBasedContainer>
                  </BestOfMyntraContainer>
                </BestOfMyntraContainerBase>
              </BestOfMyntraRowBasedWrapper>
            ))}
          </BestOfMyntraRowBasedContainer>
        </BestOfMyntraContainer>
      </Div>
      <Banner />
      <Footer />
    </>
  );
};

export default Home;
