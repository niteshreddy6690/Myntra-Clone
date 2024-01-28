import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from "../Assets/Images/login.webp";
import { request } from "../api/axios";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
const LoginContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100vw;
  /* min-height: 100vh; */
  /* background: linear-gradient(to bottom right, #feedf6, #fcf0e2); */
  line-height: 1.42857143;
  color: #424553;
`;
const NavLink = styled(Link)`
  box-sizing: border-box;
  font-size: 13px;
  text-decoration: none;
  cursor: pointer;
  color: #ff3c6f;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: 1px;
`;
const LoginWrapper = styled.div`
  position: relative;
  width: 400px;
  background-color: #fff;
  /* top: 50%;
  left: 50%; */
  margin: 28px auto;
  min-height: calc(100vh - 50px);
  /* transform: translate(-50%, 0); */

  @media (min-width: 800px) {
    min-height: calc(100vh - 136px);
  }
`;

const Img = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
`;

const LoginContent = styled.div`
  display: block;
  padding: 36px 36px 0;
`;

const LoginWelcomeHeader = styled.div`
  text-align: start;
  font-size: 23px;
  /* font-family: Whitney; */
  font-weight: 500;
  margin-bottom: 24px;
`;

const LoginSpan = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #535766;
`;

const MobileContainer = styled.div`
  position: relative;
  text-align: start;
`;
const FormGroup = styled.div`
  margin-bottom: 24px;
  position: relative;
`;
const Input = styled.input`
  box-sizing: border-box;
  border: 1px solid #d4d5d9;
  font-size: 14px;
  padding: 11px 55px;
  line-height: 16px;
  height: auto;
  color: #282c3f;
  outline: none;
  width: 100%;

  &:focus {
    transition: 0.4s;
    border: 1px solid #282c3f;
  }
`;
const Span = styled.span`
  top: 10px;
  left: 12px;
  font-size: 14px;
  position: absolute;
  pointer-events: none;
  color: ${({ isFocus }) => (isFocus ? "#282c3f" : "#94969f")};
  .Placeholder {
    color: ${({ isFocus }) => (isFocus ? "#282c3f" : "#94969f")};
  }
  .mobileNumberPlacholder {
    display: ${({ isFocus, phoneNumber }) =>
      isFocus || phoneNumber ? "none" : "inline"};
  }
`;
const MediaLinkDiv = styled.div`
  margin: 0 0 21px;
  color: rgba(40, 44, 63, 0.8);
  font-size: 14px;
  letter-spacing: 0.5px;
`;
const Button = styled.button`
  cursor: pointer;
  background-color: #ff3f6c;
  text-align: center;
  padding: 12px;
  color: #fff;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  border: none;
  width: 100%;
`;

const ErrorParagraph = styled.p`
  color: #ff5a5a;
  margin: 3px 0px;
  font-size: 12px;
  letter-spacing: 0.5px;
`;
const Login = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
    getValues,
    watch,
  } = useForm({
    mode: "all",
  });

  const [isFocus, setFocus] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  // const handelLogin = async (e) => {
  //   e.preventDefault();

  //   localStorage.setItem("mobileNumber", phoneNumber);
  //   try {
  //     if (phoneNumber) {
  //       const login = await request.post("auth/registermobile", {
  //         phonenumber: phoneNumber,
  //       });

  //       if (login.data?.user) {
  //         console.log("Login -data", login);
  //         toast(`OTP : ${login?.data?.otp}`, {
  //           position: "top-right",
  //           autoClose: 2000,
  //           hideProgressBar: true,
  //           closeOnClick: true,
  //           pauseOnHover: false,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "colored",
  //         });
  //         setTimeout(() => {
  //           navigate("/verifyotp");
  //         }, 3000);
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const onSubmit = async (data) => {
    console.log("Data", data);
    setPhoneNumber(data?.phone);
    localStorage.setItem("mobileNumber", data?.phone);
    try {
      if (data?.phone) {
        const login = await request.post("auth/registermobile", {
          phonenumber: data?.phone,
        });
        if (login.data?.user) {
          console.log("Login -data", login);
          toast(`OTP : ${login?.data?.otp}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setTimeout(() => {
            navigate("/verifyotp");
          }, 3500);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <FixedBackground />
      <ToastContainer
        style={{ position: "absolute", top: "90px", right: "-100px" }}
        toastStyle={{
          backgroundColor: "#171830",
          width: "120px",
          height: "20px",
          color: "white",
          zIndex: "100",
          fontSize: "18px",
          fontWeight: "700",
          letterSpacing: "0.5px",
        }}
      />
      <LoginContainer>
        <Navbar />
        <LoginWrapper>
          <Img src={LoginImage} alt="login Image" />
          <LoginContent>
            <LoginWelcomeHeader>
              Login <LoginSpan> or </LoginSpan> Signup
            </LoginWelcomeHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <MobileContainer>
                <FormGroup>
                  <Input
                    type="tel"
                    maxLength="10"
                    name="phone"
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    // value={phoneNumber}
                    // onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    {...register("phone", {
                      required: "Please enter your phone number",
                      pattern: {
                        value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                        message: "Please enter valid Mobile Number",
                      },
                    })}
                  />
                  <ErrorParagraph>{errors?.phone?.message}</ErrorParagraph>
                  <Span
                    className="Placeholder"
                    isFocus={isFocus}
                    phoneNumber={phoneNumber}
                  >
                    +91
                    <span
                      style={{ padding: "0px 10px" }}
                      className="Placeholder"
                    >
                      |
                    </span>
                    <span className="mobileNumberPlacholder">
                      Mobile Number
                      <span
                        style={{ color: "rgb(255, 87, 34)" }}
                        className="mobileNumberPlacholder"
                      >
                        *
                      </span>
                    </span>
                  </Span>
                </FormGroup>
                <MediaLinkDiv>
                  By continuing, I agree to the
                  <NavLink to="/termsofuse"> Terms of Use </NavLink>&
                  <NavLink to="/termsofuse">Privacy Policy</NavLink>
                </MediaLinkDiv>
                <Button
                  // onClick={handelLogin}

                  type="submit"
                >
                  Continue
                </Button>
                <MediaLinkDiv style={{ marginTop: "30px" }}>
                  Have trouble logging in?
                  <NavLink to="/termsofuse">Get help</NavLink>
                </MediaLinkDiv>
              </MobileContainer>
            </form>
          </LoginContent>
          {/* <DevTool control={control} /> */}
        </LoginWrapper>
      </LoginContainer>
    </>
  );
};

export default Login;
