import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";

import {
  WomenIndianfestival,
  WomenBelts,
  WomenWatches,
  WomenWesternWear,
  WomenPlusSize,
  WomenMaternity,
  WomenSunglasses,
  WomenFootWear,
  WomenSportsWear,
  WomenLingerie,
  WomenBeauty,
  WomenGadgets,
  WomenJewellery,
  WomenBackpacks,
  WomenHandbags,
  WomenLuggage,
} from "../Navbar/NavBardata";

const fade = keyframes`
from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
`;
const MainPane = styled.div`
  position: absolute;
  top: 80px;
  left: 120px;
  height: 440px;
  width: 1135px;
  display: block;
  text-align: left;
  transition: all 0.3s ease-out;
  z-index: 1;
  background-color: #fff;
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.1);
  animation: ${fade} 1s ease-in-out;
  overflow: hidden;

  @media (max-width: 1200px) {
    font-size: 14px;
    width: 100%;
  }
  .desktop-categoryContainer {
    width: 100%;
    padding: 0 10px 10px 15px;
    transition: all 0.2s ease-out;

    .desktop-oddColumnsContent {
      float: left;
      display: block;
      position: relative;
      height: 436px;
      padding-top: 4px;
    }
    .desktop-navBlock {
      display: block;
      position: relative;
      float: left;
      width: 220px;
      margin: 0;
      padding: 0;
    }
    .desktop-navBlock > li {
      padding-left: 25px;
    }

    .desktop-hrLine {
      width: 140px;
      height: 1px;
      margin: 12px 0 0 25px;
      background-color: #eaeaec;
    }

    .desktop-evenColumnContent {
      background-color: rgba(245, 245, 246, 0.4);
    }

    .desktop-oddColumnContent {
      float: left;
      display: block;
      position: relative;
      height: 436px;
      padding-top: 4px;
    }

    /* @media (max-width: 1024px) {
      font-size: 14px;
      display: none !important;
    } */
  }

  @media (max-width: 1200px) {
    .desktop-categoryContainer {
      /* width: 80%;
      padding: 0 10px 10px 15px;
      transition: all 0.2s ease-out; */
      font-size: 12px;
      width: 100%;
    }
    .desktop-navBlock {
      width: 150px;
    }
    .desktop-hrLine {
      width: 100px;
      margin: 5px 0;
    }
  }
`;

export const SubLinksGroup = styled(Link)`
  padding: 12px 0 2px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 25px;
  font-weight: 700;
  text-decoration: none;
  text-transform: capitalize;
  color: #fb56c1;
  transition: all 6s linear;
  display: block;
  font-size: 14px;
  text-decoration: none;
`;
const NavSubLinks = styled(Link)`
  display: block;
  font-size: 14px;
  text-decoration: none;
  text-transform: none;
  color: #282c3f;
  line-height: 23px !important;
  font-weight: 400;
  &:hover {
    outline-width: 0;
    color: #282c3f;
    font-weight: 700;
    font-size: 15px;
  }
`;

const Women = () => {
  return (
    <MainPane>
      <div className="desktop-categoryContainer">
        <li className="desktop-oddColumnsContent">
          <ul className="desktop-navBlock">
            {WomenIndianfestival.map((link, i = 0) => (
              <>
                <li key={link?.group}>
                  <SubLinksGroup to={link?.to}>{link?.group}</SubLinksGroup>
                </li>
                {link?.links.map((subLinks, index = 0) => (
                  <>
                    <li key={index}>
                      <NavSubLinks to={subLinks.to}>
                        {subLinks.name}
                      </NavSubLinks>
                    </li>
                  </>
                ))}
              </>
            ))}
            <div className="desktop-hrLine"></div>
            {WomenBelts?.map((link, i = 0) => (
              <>
                <li key={link?.group}>
                  <SubLinksGroup to={link?.to} key={link?.group}>
                    {link?.group}
                  </SubLinksGroup>
                </li>
                {link?.links?.map((subLinks, index = 0) => (
                  <>
                    <li key={index}>
                      <NavSubLinks to={subLinks.to}>
                        {subLinks.name}
                      </NavSubLinks>
                    </li>
                  </>
                ))}
              </>
            ))}
            {WomenWatches.map((link, i = 0) => (
              <>
                <li key={link?.group}>
                  <SubLinksGroup to={link.to}>{link.group}</SubLinksGroup>
                </li>
                {link?.links?.map((subLinks, index = 0) => (
                  <li key={index}>
                    <NavSubLinks to={subLinks.to}>{subLinks.name}</NavSubLinks>
                  </li>
                ))}
              </>
            ))}
          </ul>
        </li>
        <li className="desktop-evenColumnContent  desktop-oddColumnsContent">
          <ul className="desktop-navBlock">
            {WomenWesternWear.map((link, i = 0) => (
              <>
                <li key={link?.group}>
                  <SubLinksGroup to={link.to}>{link.group}</SubLinksGroup>
                </li>
                {link?.links?.map((subLinks, index = 0) => (
                  <li key={index}>
                    <NavSubLinks to={subLinks.to}>{subLinks.name}</NavSubLinks>
                  </li>
                ))}
              </>
            ))}
            <div className="desktop-hrLine"></div>
            {WomenPlusSize.map((link, i = 0) => (
              <>
                <li key={link?.group}>
                  <SubLinksGroup to={link.to}>{link.group}</SubLinksGroup>
                </li>
                {link?.links?.map((subLinks, index = 0) => (
                  <li key={index}>
                    <NavSubLinks to={subLinks.to}>{subLinks.name}</NavSubLinks>
                  </li>
                ))}
              </>
            ))}
          </ul>
        </li>
        <li className=" desktop-oddColumnsContent">
          <ul className="desktop-navBlock">
            {WomenMaternity.map((link, i = 0) => (
              <>
                <li key={link?.group}>
                  <SubLinksGroup to={link.to}>{link.group}</SubLinksGroup>
                </li>
                {link?.links?.map((subLinks, index = 0) => (
                  <li key={index}>
                    <NavSubLinks to={subLinks.to}>{subLinks.name}</NavSubLinks>
                  </li>
                ))}
              </>
            ))}
            {WomenSunglasses.map((link, i = 0) => (
              <>
                <li key={link?.group}>
                  <SubLinksGroup to={link.to}>{link.group}</SubLinksGroup>
                </li>
                {link?.links?.map((subLinks, index = 0) => (
                  <li key={index}>
                    <NavSubLinks to={subLinks.to}>{subLinks.name}</NavSubLinks>
                  </li>
                ))}
              </>
            ))}
            {WomenFootWear.map((link, i = 0) => (
              <>
                <li key={link?.group}>
                  <SubLinksGroup to={link.to}>{link.group}</SubLinksGroup>
                </li>
                {link?.links?.map((subLinks, index = 0) => (
                  <li key={index}>
                    <NavSubLinks to={subLinks.to}>{subLinks.name}</NavSubLinks>
                  </li>
                ))}
              </>
            ))}
            <div className="desktop-hrLine"></div>
            {WomenSportsWear.map((link, i = 0) => (
              <>
                <li key={link?.group}>
                  <SubLinksGroup to={link.to}>{link.group}</SubLinksGroup>
                </li>
                {link?.links?.map((subLinks, index = 0) => (
                  <li key={index}>
                    <NavSubLinks to={subLinks.to}>{subLinks.name}</NavSubLinks>
                  </li>
                ))}
              </>
            ))}
          </ul>
        </li>
        <li className=" desktop-evenColumnContent desktop-oddColumnsContent">
          <ul className="desktop-navBlock">
            {WomenLingerie.map((link, i = 0) => (
              <>
                <li key={link?.group}>
                  <SubLinksGroup to={link?.to}>{link?.group}</SubLinksGroup>
                </li>
                {link?.links.map((subLinks, index = 0) => (
                  <>
                    <li key={index}>
                      <NavSubLinks to={subLinks.to}>
                        {subLinks.name}
                      </NavSubLinks>
                    </li>
                  </>
                ))}
              </>
            ))}
            <div className="desktop-hrLine"></div>
            {WomenBeauty.map((link, i = 0) => (
              <>
                <li key={link?.group}>
                  <SubLinksGroup to={link?.to}>{link?.group}</SubLinksGroup>
                </li>
                {link?.links.map((subLinks, index = 0) => (
                  <>
                    <li key={index}>
                      <NavSubLinks to={subLinks.to}>
                        {subLinks.name}
                      </NavSubLinks>
                    </li>
                  </>
                ))}
              </>
            ))}
          </ul>
        </li>
        <li className="desktop-oddColumnsContent">
          <ul className="desktop-navBlock">
            {WomenGadgets.map((link, i = 0) => (
              <>
                <li key={link?.group}>
                  <SubLinksGroup to={link?.to}>{link?.group}</SubLinksGroup>
                </li>
                {link?.links.map((subLinks, index = 0) => (
                  <>
                    <li key={index}>
                      <NavSubLinks to={subLinks.to}>
                        {subLinks.name}
                      </NavSubLinks>
                    </li>
                  </>
                ))}
              </>
            ))}
            <div className="desktop-hrLine"></div>
            {WomenJewellery?.map((link, i = 0) => (
              <>
                <li key={link?.group}>
                  <SubLinksGroup to={link?.to}>{link?.group}</SubLinksGroup>
                </li>
                {link?.links.map((subLinks, index = 0) => (
                  <>
                    <li key={index}>
                      <NavSubLinks to={subLinks.to}>
                        {subLinks.name}
                      </NavSubLinks>
                    </li>
                  </>
                ))}
              </>
            ))}
            {WomenBackpacks.map((link, i = 0) => (
              <>
                <li key={link?.group}>
                  <SubLinksGroup to={link?.to}>{link?.group}</SubLinksGroup>
                </li>
                {link?.links?.map((subLinks, index = 0) => (
                  <>
                    <li key={index}>
                      <NavSubLinks to={subLinks.to}>
                        {subLinks.name}
                      </NavSubLinks>
                    </li>
                  </>
                ))}
              </>
            ))}
            {WomenHandbags.map((link, i = 0) => (
              <>
                <li key={link?.group}>
                  <SubLinksGroup to={link?.to}>{link?.group}</SubLinksGroup>
                </li>
                {link?.links?.map((subLinks, index = 0) => (
                  <>
                    <li key={index}>
                      <NavSubLinks to={subLinks.to}>
                        {subLinks.name}
                      </NavSubLinks>
                    </li>
                  </>
                ))}
              </>
            ))}
            {WomenLuggage?.map((link, i = 0) => (
              <>
                <li key={link?.group}>
                  <SubLinksGroup to={link?.to}>{link?.group}</SubLinksGroup>
                </li>
                {link?.links?.map((subLinks, index = 0) => (
                  <>
                    <li key={index}>
                      <NavSubLinks to={subLinks.to}>
                        {subLinks.name}
                      </NavSubLinks>
                    </li>
                  </>
                ))}
              </>
            ))}
          </ul>
        </li>
      </div>
    </MainPane>
  );
};

export default Women;
