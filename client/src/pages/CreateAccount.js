import React from "react";
import styled from "styled-components";

const FixedBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  background: red;
  background: linear-gradient(to bottom right, #feedf6, #fcf0e2);
`;

const Main = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow-y: hidden;
`;

const Wrapper = styled.div`
  position: relative;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  min-height: 600px;
  height: calc(100% - 10%);
  background-color: #ffffff;
  text-align: center;
`;
const Container = styled.div`
  padding: 50px;
  text-align: left;
  .signUpHeader {
    font-size: 20px;
    font-weight: 600;
    padding: 11px 0px 0px;
    color: rgb(40, 44, 63);
    text-align: left;
    @media (min-width: 600px) {
      margin-left: 0px;
      padding: 22px 0px 0px;
    }
  }

  .phoneNumber {
    margin: 24px 0px 16px;
    position: relative;
  }
`;

const Input = styled.input`
  outline: none;
  width: 220px;
  border: 1px solid #d4d5d9;
  padding: 2px 5px;
  height: 30px;
  border-radius: 2px;
  margin-top: 20px;
`;

const CreateAccount = () => {
  return (
    <>
      <FixedBackground></FixedBackground>
      <Main>
        <Wrapper>
          <Container>
            <div className="signUpHeader">Complete your sign up</div>
            <div className="phoneNumber">
              <span>9901145387</span>
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                className="verifiedIcon"
              >
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <path d="M0 0H24V24H0z"></path>
                  <g fillRule="nonzero">
                    <path
                      d="M15.41 7.164c-.369-.369-.507-1.083-.323-1.567a.965.965 0 00-.53-1.267c-.483-.207-.898-.806-.898-1.336a.973.973 0 00-.967-.967c-.53 0-1.129-.392-1.336-.898a.976.976 0 00-1.267-.53C9.605.806 8.891.668 8.523.276a.973.973 0 00-1.36 0C6.796.645 6.082.783 5.598.6a.965.965 0 00-1.267.53c-.207.483-.806.898-1.336.898a.973.973 0 00-.967.967c0 .53-.392 1.13-.898 1.336a.976.976 0 00-.53 1.267c.207.484.069 1.198-.323 1.567a.973.973 0 000 1.359c.369.368.507 1.082.323 1.566a.965.965 0 00.53 1.267c.483.207.898.806.898 1.336s.438.967.967.967c.53 0 1.13.392 1.336.899a.976.976 0 001.267.53c.484-.208 1.198-.07 1.567.322a.973.973 0 001.359 0c.368-.369 1.082-.507 1.566-.323a.965.965 0 001.267-.53c.207-.483.806-.898 1.336-.898s.967-.437.967-.967.392-1.129.899-1.336a.976.976 0 00.53-1.267c-.208-.484-.07-1.198.322-1.566a.973.973 0 000-1.36z"
                      fill="#03A685"
                      transform="translate(4 4)"
                    ></path>
                    <path
                      d="M11.024 5.031c-.19 0-.372.08-.506.222L7.206 8.754 5.564 7.02a.69.69 0 00-.692-.197.737.737 0 00-.507.535.786.786 0 00.187.732l2.147 2.27a.697.697 0 00.507.222c.19 0 .372-.08.506-.222l3.818-4.036a.788.788 0 00.156-.824.717.717 0 00-.662-.468z"
                      fill="#FFF"
                      transform="translate(4 4)"
                    ></path>
                  </g>
                </g>
              </svg>
            </div>
            <form>
              <Input
                type="password"
                name="password"
                placeholder="Create password"
                required
              />
              <Input type="email" name="email" placeholder="email" />
            </form>
          </Container>
        </Wrapper>
      </Main>
    </>
  );
};

export default CreateAccount;
