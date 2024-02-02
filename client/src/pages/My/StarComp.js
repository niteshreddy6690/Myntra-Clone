import React, { useEffect, useState } from "react";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import styled from "styled-components";
import WriteReview from "../My/Modals/WriteReview";

const StartContainer = styled.div`
  .starComp {
    color: lightGrey;
    cursor: pointer;
    /* border: 1px solid black; */
  }
  .starSelected {
    color: #f75278;
    cursor: pointer;
    transition: all 0.5 ease-in-out;
  }
  .starSelected:hover {
    scale: 1.4;
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

  const [selectedHoverStars, setSelectedHoverStars] = useState(0);
  const [commentValue, SetCommentValue] = useState("");
  const [showWriteReview, setShowWriteReview] = useState(false);

  useEffect(() => {
    SetCommentValue(
      userRatingForProduct[0]?.comment ? userRatingForProduct[0]?.comment : ""
    );
  }, []);

  const mouseLeave = () => {
    setSelectedStars(selectedStars);
    setSelectedHoverStars(0);
  };

  const handleStarClick = (num) => {
    setSelectedStars(num);
    callAddReview(productId, num, commentValue);
  };
  const handleMouseEnter = (num) => {
    setSelectedHoverStars(num);
    SetCommentValue(
      userRatingForProduct[0]?.comment ? userRatingForProduct[0]?.comment : ""
    );
  };
  const callAddReview = (productId, ratingNo = 1, comment = "") => {
    if (ratingNo) addReview(productId, ratingNo, comment);
  };
  const handleShowModal = () => {
    setShowWriteReview(!showWriteReview);
  };

  return (
    <StartContainer>
      <div className="review-section">
        <div className="reviewContainer">
          {[1, 2, 3, 4, 5].map((num) => (
            <span key={num} onMouseLeave={() => mouseLeave()}>
              {(selectedHoverStars || selectedStars) < num ? (
                <StarOutlineRoundedIcon
                  key={num}
                  onMouseEnter={() => handleMouseEnter(num)}
                  // onMouseLeave={() => handleStarClick(selectedStars)}
                  className="starComp"
                />
              ) : (
                <StarRoundedIcon
                  key={num}
                  onMouseEnter={() => handleMouseEnter(num)}
                  // onMouseLeave={() => handleStarClick(selectedStars)}
                  className="starSelected"
                  onClick={() => handleStarClick(num)}
                />
              )}
            </span>
          ))}
        </div>
        <div className="write-review" onClick={handleShowModal}>
          {userRatingForProduct[0]?.comment ? "Edit Review" : "Write Review"}
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
