import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

const WriteReviewModalWrapper = styled.div`
  background: rgba(0, 0, 0, 0.69);
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 11;
`;

const WriteReviewModalContainer = styled.div`
  position: fixed;
  background-color: #f5f5f6;
  text-align: left;
  box-sizing: border-box;
  color: #535766;
  overflow-y: scroll;
  top: 40%;
  left: 50%;
  width: 550px;
  height: 55%;
  transform: translate(-50%, -50%);
  background: #fff;
  z-index: 12;

  .writeReview-subContainer {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    text-align: center;
    padding: 20px;
  }
  .write-reviewHeading {
    margin-bottom: 25px;
    position: relative;
    text-transform: uppercase;
  }
  .cancelIcon {
    position: absolute;
    left: 0;
    cursor: pointer;
  }
  .write-ReviewText {
    font-size: 16px;
    font-weight: 700;
  }
  .write-reviewProductInfo {
    display: flex;
    /* align-items: center; */
    justify-content: flex-start;
    margin-bottom: 25px;
  }
  .write-reviewImage {
    width: 58px;
    max-height: 77px;
    object-fit: contain;
    border-radius: 2px;
  }
  .write-reviewProductDetails {
    margin-left: 15px;
    text-align: left;
  }
  .write-reviewProductDetails .productBrand {
    font-size: 14px;
    font-weight: 700;
  }
  .write-reviewProductDetails .productDescription {
    margin: 1px 0px 3px 0px;
  }
  .start {
    font-size: 14px;
  }
  .starComp {
    color: lightGrey;
  }
  .starSelected {
    color: #ff3f6c;
    cursor: pointer;
  }
  .writeReview-textarea {
    height: 180px;
    width: 100%;
    overflow: auto;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #eaeaec;
    margin-bottom: 24px;
    /* border: none; */
  }
  textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
    outline: none;
  }
  .submit-buttonClass {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .submit-button {
    border-radius: 2px;
    background-color: #ff3e6c;
    color: #fff;
    letter-spacing: 2px;
    font-weight: 700;
    font-size: 14px;
    width: 137px;
    padding: 13px;
    text-transform: uppercase;
    cursor: pointer;
  }
`;

const WriteReview = ({
  handleShowModal,
  product,
  productId,
  selectedStars,
  callAddReview,
  userComment,
}) => {
  const [comment, setComment] = useState(userComment);
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);
  console.log("comment", comment);
  return (
    <>
      <WriteReviewModalWrapper onClick={handleShowModal} />
      <WriteReviewModalContainer>
        <div className="writeReview-subContainer">
          <div className="write-reviewHeading">
            <span className="cancelIcon" onClick={handleShowModal}>
              <CloseRoundedIcon />
            </span>
            <span className="write-ReviewText">Write Review</span>
          </div>
          <div className="write-reviewProductInfo">
            <img
              className="write-reviewImage"
              src={product.images[0].url}
              alt={product.images[0].name}
            />
            <div className="write-reviewProductDetails">
              <div className="productBrand">{product?.brand}</div>
              <div className="productDescription">{product?.description}</div>
              <div>
                {[1, 2, 3, 4, 5].map((num) => (
                  <span key={num}>
                    {selectedStars < num ? (
                      <StarOutlineRoundedIcon
                        key={num}
                        className=" start starComp"
                      />
                    ) : (
                      <StarRoundedIcon
                        key={num}
                        className=" start starSelected"
                      />
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div>
            <textarea
              placeholder="Please write product review here."
              className="writeReview-textarea"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="submit-buttonClass">
            <div
              className="submit-button"
              onClick={() => {
                callAddReview(productId, selectedStars, comment);
                handleShowModal();
              }}
            >
              Submit
            </div>
          </div>
        </div>
      </WriteReviewModalContainer>
    </>
  );
};

export default WriteReview;
