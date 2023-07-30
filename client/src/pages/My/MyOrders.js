import React, { useState, useEffect } from "react";
// import MyMainPage from "./MyMainPage";
import styled from "styled-components";
import noOrders from "../../Assets/png/noOrders.png";
import { request } from "../../api/axios";
import moment from "moment";
import { NavLink } from "react-router-dom";
import StarComp from "./StarComp";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrderItems } from "../../redux/features/orders/ordersSlice";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const MainContainerWrapper = styled.div`
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  display: inline-block;
  margin: 5px;
  position: relative;

  .heading-label {
    font-size: 18px;
    line-height: 21px;
    font-weight: 700;
    color: #282c3f;
  }
  .subHeaderLabel {
    font-size: 14px;
    line-height: 16px;
    color: #282c3f;
  }
`;
const MainOrderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .text-common {
    font-family: Assistant;
    color: #282c3f;
    margin: 0;
  }

  .text-h5 {
    font-size: 16px;
    line-height: 24px;
    font-family: Assistant !important;
    font-weight: 700;
  }
  .illustration-text {
    margin: 12px auto;
  }

  .text-common {
    font-family: Assistant;
    color: #282c3f;
    margin: 0;
  }
  .text-body2 {
    font-size: 14px;
    line-height: 18px;
  }
`;

const Image = styled.img`
  width: 50%;
  margin-bottom: 20px;
`;

const OrderList = styled.div`
  background-color: #f5f5f5;
  padding: 10px;
  margin-top: 20px;
  max-height: 900px;
  overflow: scroll;

  .orders-heading {
    text-align: left;
  }
  .orderItemList-itemView {
    height: auto;
    background: #fff;
    padding: 10px 3.37% 5px 3.33%;
    /* margin-top: 12px; */
  }
  .orderItemDate {
    color: rgb(104, 107, 119);
    font-family: Assistant;
    color: #282c3f;
    margin: 0;
    font-size: 14px;
    line-height: 18px;
  }
  .orderStatusInfo {
    padding: 12px 0px;
  }
  .orderStatusText {
    font-weight: 700;
    color: rgb(3, 166, 133);
    font-size: 14px;
    line-height: 1;
    text-transform: capitalize;
  }
  .orderItems {
    display: flex;
    background-color: #f5f5f5;
    text-align: left;
    padding: 10px 0px;
  }
  .ordersItemImage {
    background: rgb(244, 255, 249);
    height: 70px;
    width: 53px;
    border-radius: 2px;
    object-fit: scale-down;
  }
  /* .orderItemImage {
    float: left;
  } */
  .orderItemInfo {
    padding-left: 20px;
  }
  .orderItemHeading {
    font-family: Assistant;
    font-size: 14px;
    line-height: 1;
    color: #282c3f;
    font-weight: 700;
    padding: 5px 0px;
  }
  .Text-Text {
    font-family: Assistant;
    font-size: 14px;
    line-height: 1;
    color: #282c3f;
    margin: 5px 0px;
  }
`;

// const OrdersContentPage = styled.div``;
const MyOrders = () => {
  const [orders, setOrders] = useState(null);

  const { isLoading, isError, orderItems } = useSelector((state) => ({
    ...state.order,
  }));
  const [allUserReviews, setAllUserReviews] = useState(null);

  const dispatch = useDispatch();
  const getOrders = async () => {
    // const allMyOrders = await request.get("/order/getOrders");
    // setOrders(allMyOrders.data.orders);
    // console.log("orders", allMyOrders);
    dispatch(fetchOrderItems());
  };
  const getAllUserReviews = async () => {
    const allUserReviews = await request.get("/review/getAllUser");
    setAllUserReviews(allUserReviews.data.allReviews);
    console.log("allUserReviews", allUserReviews);
  };

  const addReview = async (productId, ratingNo, comment = "") => {
    // console.log("calling Add Review in MyOrded Page");
    console.log("productId", productId, ratingNo, comment);
    const userReview = await request.post("/review", {
      productId,
      comment,
      ratingNo,
    });
    if (userReview) getAllUserReviews();
  };
  useEffect(() => {
    getOrders();
    getAllUserReviews();
  }, []);

  if (isLoading) return <LoadingSpinner loading={isLoading} />;
  return (
    <MainContainerWrapper>
      {orderItems && orderItems.length > 0 ? (
        <>
          <div className="orders-heading">
            <div className="heading-label">All orders</div>
            <div className="subHeaderLabel">for any time</div>
          </div>
          <OrderList>
            {orderItems?.map((order, index) => (
              <div className="orderItemList-itemView" key={index}>
                {order?.items.map((orderItem, index) => (
                  <div key={index}>
                    <div className="orderStatusInfo">
                      <div className="orderStatusText">
                        {order?.orderStatus[0]?.type}
                      </div>
                      <div className="orderItemDate">
                        {`on ${moment(order?.orderStatus[-1]?.date).format(
                          "ddd,DD-MMM-YYYY"
                        )}`}
                      </div>
                    </div>
                    <NavLink
                      target="_blank"
                      to={`/${orderItem.productId?.gender.toLowerCase()}/${orderItem.productId?.brand
                        .replaceAll(" ", "-")
                        .toLowerCase()}/${orderItem.productId?.description
                        .replaceAll(" ", "-")
                        .toLowerCase()}/${orderItem.productId?._id}/buy`}
                    >
                      <div className="orderItems">
                        <img
                          src={orderItem.productId?.images[0].url}
                          className="ordersItemImage"
                        />
                        <div className="orderItemInfo">
                          <div className="orderItemHeading">
                            {orderItem?.productId?.brand}
                          </div>
                          <div className="Text-Text">
                            {orderItem?.productId?.description}
                          </div>
                          <div className="Text-Text">
                            {`Size : ${orderItem?.selectedSize}`}
                          </div>
                        </div>
                      </div>
                    </NavLink>
                    {allUserReviews && (
                      <StarComp
                        userRatingForProduct={allUserReviews?.filter(
                          (obj) => obj?.productId == orderItem?.productId?._id
                        )}
                        productId={orderItem?.productId?._id}
                        product={orderItem?.productId}
                        addReview={addReview}
                        getAllUserReviews={getAllUserReviews}
                      />
                    )}
                  </div>
                ))}
                {/* {order?.orderStatus.map((status, i) => (
                  <div key={i}>
                    {status?.isCompleted ? (
                      <>
                        <div className="orderStatusText"> {status.type}</div>
                        <div className="orderItemDate">
                          {`on ${moment(status.date).format(
                            "ddd,DD-MMM-YYYY"
                          )}`}
                        </div>
                      </>
                    ) : null}
                  </div>
                ))} */}
              </div>
            ))}
          </OrderList>
        </>
      ) : (
        <MainOrderContainer>
          <>
            <Image src={noOrders} alt="You haven't placed any order yet!" />
            <p className="text-common text-h5  ">
              You haven't placed any order yet!
            </p>
            <p className="text-common text-body2 illustration-text ">
              Order section is empty. After placing order, You can track them
              from here!
            </p>
          </>
        </MainOrderContainer>
      )}
    </MainContainerWrapper>
  );
};

export default MyOrders;
