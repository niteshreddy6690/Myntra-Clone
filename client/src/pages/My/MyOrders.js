import React from "react";
import MyMainPage from "./MyMainPage";
import styled from "styled-components";

import noOrders from "../../Assets/png/noOrders.png";
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
const MyOrders = () => {
  return (
    <MainOrderContainer>
      {/* <MyMainPage></MyMainPage> */}
      <Image src={noOrders} alt="You haven't placed any order yet!" />
      <p class="text-common text-h5  ">You haven't placed any order yet!</p>
      <p class="text-common text-body2 illustration-text ">
        Order section is empty. After placing order, You can track them from
        here!
      </p>
    </MainOrderContainer>
  );
};

export default MyOrders;
