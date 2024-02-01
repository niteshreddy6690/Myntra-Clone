import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MobileVerify from "../Assets/Images/mobile-verification.webp";
import LocalStorageService from "../api/localStorage";
import { request } from "../api/axios";
import Navbar from "../components/Navbar/Navbar";
const BACKSPACE = 8;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const DELETE = 46;
const SPACEBAR = 32;

const FixedBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;

  background: linear-gradient(to bottom right, #feedf6, #fcf0e2);
`;

const Main = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow-y: hidden;
`;
const OtpContainer = styled.div`
  margin-top: 50px;
`;
// const ImageWrapper = styled.div``;
const Image = styled.img`
  position: relative;
  top: 10%;
  width: 30%;
  height: 15%;
  display: block;
`;

const Input = styled.input`
  outline: none;
  width: 30px;
  padding: 9px 0;
  caret-color: #ff2459;
  border: 1px solid #d4d5d9;
  font-size: 14px;
  text-align: center;
  border-radius: 5px;
  margin: 0 16px 0 0;
  &:focus {
    border: 1px solid #111;
  }
`;

const ResendOtp = styled.div`
  font-family: Whitney;
  margin-top: 30px;
  color: #ff2459;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.002em;
  text-transform: uppercase;
  cursor: pointer;
  display: inline-block;
`;
const Section = styled.div`
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  height: calc(100% - 10%);
  min-height: 600px;
  background-color: white;
`;

const TimerDiv = styled.div`
  margin-top: 30px;
  font-size: 14px;
  color: #94969f;
`;
const TimerSpan = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: black;
`;
const Container = styled.div`
  padding: 50px;
`;
const VerifyOtp = () => {
  const otpInputsArray = Array.from({ length: 4 });
  const [mobileNumber, setMobileNumber] = useState("");
  const [displayTimer, setDisplayTimer] = useState(true);
  const [Timer, setTimer] = useState(30);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const phoneNumber = localStorage.getItem("mobileNumber");
  const handler = (idx) => (e) => {
    inputsRef.current[idx].value = e.target.value;
    const next = inputsRef.current[idx + 1];
    if (next && inputsRef.current[idx].value) {
      next.focus();
    }
    const otp = inputsRef.current.map((item) => item?.value).join("");

    if (otp.length == 4) {
      request
        .put(`auth/otpverify/`, {
          otp: otp,
          phoneNumber,
        })
        .then((response) => {
          LocalStorageService.setToken(response?.data);
          localStorage.setItem("user", JSON.stringify(response?.data?.user));
          if (response?.data?.user?.isExistingUser) {
            navigate("/");
          } else {
            navigate("/createaccount");
          }
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    }
  };

  useEffect(() => {
    // const mobileno = localStorage.getItem('mobileNumber');

    const Interval = setInterval(() => {
      if (Timer >= 1) {
        setTimer(Timer - 1);
      }
      if (Timer === 1) {
        setDisplayTimer(false);
      }
    }, 1000);

    return () => {
      clearInterval(Interval);
    };
  }, [Timer]);

  useEffect(() => {
    setMobileNumber(localStorage.getItem("mobileNumber"));
  }, []);

  const handleOnKeyDown = (idx) => (e) => {
    if (e.keyCode === BACKSPACE || e.key === "Backspace") {
      e.preventDefault();
      const previous = inputsRef.current[idx - 1];
      inputsRef.current[idx].value = "";
      if (previous) {
        previous.focus();
      }
    } else if (e.keyCode === DELETE || e.key === "Delete") {
      e.preventDefault();
      const previous = inputsRef.current[idx - 1];
      inputsRef.current[idx].value = "";
      if (previous) {
        previous.focus();
      }
    } else if (e.keyCode === LEFT_ARROW || e.key === "ArrowLeft") {
      e.preventDefault();
      const previous = inputsRef.current[idx - 1];
      if (previous) {
        previous.focus();
      }
    } else if (e.keyCode === RIGHT_ARROW || e.key === "ArrowRight") {
      e.preventDefault();
      const next = inputsRef.current[idx + 1];
      if (next) {
        next.focus();
      }
    } else if (
      e.keyCode === SPACEBAR ||
      e.key === " " ||
      e.key === "Spacebar" ||
      e.key === "Space"
    ) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (inputsRef.current) {
      inputsRef.current[0].focus();
    }
  }, []);

  const handelResendOtp = () => {
    // setMobileNumber(localStorage.getItem("mobileNumber"));
    setDisplayTimer(true);
    setTimer(30);
    request
      .post("/auth/registermobile", {
        phonenumber: mobileNumber,
      })
      .then((response) => {
        LocalStorageService.setToken(response.data);
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  };

  return (
    <>
      <Navbar />
      <FixedBackground />
      <Main>
        <Section>
          <Container>
            <Image src={MobileVerify} />
            <h2 style={{ fontSize: "20px", fontWeight: "500" }}>
              Verify with OTP
            </h2>
            <p style={{ fontSize: "13px", color: "grey" }}>
              Sent to {mobileNumber}
            </p>
            <OtpContainer>
              {otpInputsArray.map((_, index) => (
                <Input
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  maxLength="1"
                  required
                  onChange={handler(index)}
                  onKeyDown={handleOnKeyDown(index)}
                  key={index}
                />
              ))}
            </OtpContainer>

            {displayTimer ? (
              <TimerDiv>
                Resend OTP in:
                <TimerSpan>00:{Timer < 10 ? `0${Timer}` : Timer}</TimerSpan>
              </TimerDiv>
            ) : (
              <ResendOtp onClick={handelResendOtp}>Resend otp</ResendOtp>
            )}
            {/* <ResendOtp onClick={handelResendOtp}>Resend otp</ResendOtp> */}
          </Container>
        </Section>
      </Main>
    </>
  );
};

VerifyOtp.defaultProps = {
  otpLength: 4,
  separator: "|",
  gap: "10px",
  isSecure: false,
};
export default VerifyOtp;
