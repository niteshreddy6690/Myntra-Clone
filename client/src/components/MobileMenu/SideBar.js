import React, { useState } from "react";
import styled from "styled-components";
import Ripples from "react-ripples";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const NaviContainer = styled.div`
  .naviWrapper {
    font-size: 15px;
    text-decoration: none;
    color: #3e4152;
    display: block;
    cursor: pointer;
  }
  .rippleeffect {
    display: block;
    overflow: hidden;
    width: 100%;
  }
  .naviLevel {
    position: relative;
    font-size: 14px;
    border: none;
    padding: 14px 20px;
    width: 100%;
    overflow: hidden;
  }
  .navi .naviWrapper .naviWrapper {
    padding-left: 20px;
  }
  .title {
    float: left;
    text-transform: capitalize;
  }
  .icon {
    float: right;
  }
`;

const SideBar = ({ item, handleMobileNav }) => {
  const [open, setOpen] = useState(false);
  const hasChild = item?.childrens?.length > 0 ? true : false;

  if (hasChild) {
    return (
      <NaviContainer>
        <div className="navi">
          <div className="naviWrapper">
            <Ripples
              color="#f99393"
              className="rippleeffect"
              style={{ display: "block" }}
              onClick={() => setOpen(!open)}
            >
              <div className="naviLevel">
                <span className="title">{item.title}</span>
                <span className="icon">
                  {open ? (
                    <KeyboardArrowDownIcon fontSize="small" className="md-12" />
                  ) : (
                    <KeyboardArrowRightIcon fontSize="small" />
                  )}
                </span>
              </div>
            </Ripples>
            <div className="naviWrapper">
              {open &&
                item.childrens?.map((item, index) => (
                  <SideBar item={item} key={index} />
                ))}
            </div>
          </div>
        </div>
      </NaviContainer>
    );
  } else {
    return (
      <NaviContainer>
        <div className="navi">
          <div className="naviWrapper">
            <Link
              to={item.path ? `${item?.path}` : "#"}
              onClick={() => handleMobileNav()}
            >
              <div className="naviLevel">
                <span className="title">{item.title} </span>
              </div>
            </Link>
          </div>
        </div>
      </NaviContainer>
    );
  }
};

export default SideBar;
