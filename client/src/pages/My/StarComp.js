import React, { useEffect, useState } from "react";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import styled from "styled-components";
import WriteReview from "../My/Modals/WriteReview";

const StartContainer = styled.div`
  .starComp {
    color: lightGrey;
    /* cursor: pointer; */
    /* border: 1px solid black; */
  }
  .starSelected {
    color: #f75278;
    cursor: pointer;
  }
  .star.selected {
    color: red;
  }

  .review-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f5f5f5c7;
    margin: 2px 0px;
    padding: 5px 10px 0px 10px;
  }
  .reviewContainer {
    margin-top: 2px;
  }
  .write-review {
    color: #f75278;
    cursor: pointer;
    font-size: 14px;
    font-weight: 700;
  }
`;
const StarComp = ({
  userRatingForProduct,
  product,
  addReview,
  productId,
  getAllUserReviews,
}) => {
  const [selectedStars, setSelectedStars] = useState(
    userRatingForProduct[0]?.rating
      ? Number(userRatingForProduct[0]?.rating)
      : null
  );

  const [showWriteReview, setShowWriteReview] = useState(false);

  const mouseLeave = () => {
    setSelectedStars(
      userRatingForProduct[0]?.rating
        ? Number(userRatingForProduct[0]?.rating)
        : null
    );
  };

  const handleStarClick = (num) => {
    setSelectedStars(num);
    // getAllUserReviews();
  };
  const callAddReview = (productId, ratingNo = 1, comment = "") => {
    // console.log("Nostar", ratingNo);
    if (ratingNo) addReview(productId, ratingNo, comment);
  };
  console.log(selectedStars);

  const handleShowModal = () => {
    setShowWriteReview(!showWriteReview);
  };
  return (
    <StartContainer>
      <div className="review-section">
        <div className="reviewContainer">
          {[1, 2, 3, 4, 5].map((num) => (
            <span key={num} onMouseLeave={() => mouseLeave()}>
              {selectedStars < num ? (
                <StarOutlineRoundedIcon
                  key={num}
                  onMouseEnter={() => handleStarClick(num)}
                  // onMouseLeave={() => handleStarClick(selectedStars)}
                  className="starComp"
                />
              ) : (
                <StarRoundedIcon
                  key={num}
                  onMouseEnter={() => handleStarClick(num)}
                  // onMouseLeave={() => handleStarClick(selectedStars)}
                  className="starSelected"
                  onClick={() => callAddReview(productId, selectedStars)}
                />
              )}
            </span>
          ))}
        </div>

        <div className="write-review" onClick={handleShowModal}>
          Write Review
        </div>
      </div>
      {showWriteReview && (
        <WriteReview
          handleShowModal={handleShowModal}
          product={product}
          selectedStars={selectedStars}
          callAddReview={callAddReview}
          productId={productId}
          userComment={
            userRatingForProduct[0]?.comment
              ? userRatingForProduct[0]?.comment
              : ""
          }
        />
      )}
    </StartContainer>
  );
};

export default StarComp;
