import React, { useState } from "react";
import styled from "styled-components";
import { request } from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

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
  font-family: Assistant, -apple-system BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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
  padding: 10px 10%;
  text-align: left;
  .signUpHeader {
    font-size: 16px;
    font-weight: 700;
    padding: 11px 0 0;
    margin-left: 15px;
    color: #282c3f;
    /* font-size: 20px;
    font-weight: 600;
    padding: 11px 0px 0px;
    color: rgb(40, 44, 63);
    text-align: left; */
    @media (min-width: 600px) {
      margin-left: 0px;
      padding: 22px 0px 0px;
    }
  }

  .phoneNumber {
    margin: 24px 0px 16px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .form-control {
    display: block;
    width: 100%;
    height: 40px;
    padding: 10px 0;
    font-size: 13px;
    line-height: 1.42857143;
    color: #3e4152;
    background-color: #fff;
    background-image: none;
    border: none;
    box-sizing: border-box;
  }
  .form-control {
    border: 1px solid #d4d5d9;
    font-size: 12px;
    padding: 11px 12px;
    height: auto;
    line-height: 16px;
    color: #282c3f;
  }

  .form-group {
    margin-bottom: 14px;
    position: relative;
  }
  .form-group .placeholderAlternative {
    color: #94969f;
    top: 12px;
    left: 12px;
    font-size: 12px;
    position: absolute;
    pointer-events: none;
  }
  .form-group input {
    caret-color: #ff3f6c;
  }
  .form-group input:focus {
    transition: 0.4s;
    border: 1px solid #282c3f;
  }
  .form-control:focus {
    outline: 0;
  }
  .form-group .placeholderAlternative {
    color: #94969f;
    top: 12px;
    left: 12px;
    font-size: 12px;
    position: absolute;
    pointer-events: none;
  }

  .form-group .alt-phone-number .mobileNumber {
    color: #94969f;
    top: 12px;
    left: 12px;
    font-size: 12px;
    position: absolute;
    pointer-events: none;
  }
  .form-group input:focus ~ .placeholderAlternative {
    transition: 0.2s;
    top: -9px;
    background-color: #fff;
    padding: 0 2px;
    color: #282c3f;
    position: absolute;
  }
  .form-group .alt-phone-number input:focus {
    transition: none;
    padding: 11px 0px 11px 50px;
  }
  .form-group .alt-phone-number input:not([value=""]) {
    transition: none;
    padding: 11px 0px 11px 50px;
  }
  .form-group
    .alt-phone-number
    input:focus
    ~ .mobileNumber
    .mobileNumberPlacholder {
    /* transition: 0.2s;
    top: -9px;
    background-color: #fff;
    padding: 0 2px;
    color: #282c3f;
    position: absolute;
    zoom: 1px; */
    display: none;
  }
  .form-group
    .alt-phone-number
    input:not([value=""])
    ~ .mobileNumber
    .mobileNumberPlacholder {
    /* transition: 0.2s;
    top: -9px;
    background-color: #fff;
    padding: 0 2px;
    color: #282c3f;
    position: absolute;
    zoom: 1px; */
    display: none;
  }
  .form-group .alt-phone-number input:focus ~ .mobileNumber {
    transition: 0.2s;
    color: #282c3f;
    padding: 0 2px;
  }
  .form-group .alt-phone-number input:not([value=""]) ~ .mobileNumber {
    transition: 0.2s;
    color: #282c3f;
    padding: 0 2px;
  }
  .form-group .password input:not([value=""]) ~ .placeholderAlternative {
    transition: 0.2s;
    top: -9px;
    background-color: #fff;
    padding: 0 2px;
    color: #282c3f;
    position: absolute;
  }

  .form-group .name input:not([value=""]) ~ .placeholderAlternative {
    transition: 0.2s;
    top: -9px;
    background-color: #fff;
    padding: 0 2px;
    color: #282c3f;
    position: absolute;
  }
  .form-group .email input:not([value=""]) ~ .placeholderAlternative {
    transition: 0.2s;
    top: -9px;
    background-color: #fff;
    padding: 0 2px;
    color: #282c3f;
    position: absolute;
  }
  .form-group .hint input:not([value=""]) ~ .placeholderAlternative {
    transition: 0.2s;
    top: -9px;
    background-color: #fff;
    padding: 0 2px;
    color: #282c3f;
    position: absolute;
  }
  /* .form-group .alt-phone-number input:not([value=""]) ~ .mobileNumber {
    transition: 0.2s;
    top: -9px;
    background-color: #fff;
    padding: 0 2px;
    color: #282c3f;
    position: absolute;
    zoom: 1px;
  } */

  .form-group .topPlaceholderAlternative {
    color: #94969f;
    top: -9px;
    left: 12px;
    font-size: 12px;
    padding: 0 2px;
    position: absolute;
    background-color: #fff;
  }

  .form-group .form-control-feedback {
    right: 10px;
    cursor: pointer;
  }
  .form-group .form-control-feedback {
    position: absolute;
    top: 4px;
    right: 0;
    z-index: 2;
    display: block;
    width: 34px;
    height: 34px;
    font-size: 11px;
    line-height: 34px;
    text-align: center;
    color: #ff3e6c;
    font-weight: 700;
  }

  .textInputInfo {
    position: relative;
    bottom: 10px;
    margin-bottom: 10px;
    color: #94969f;
    font-size: 10px;
  }
`;

// const Input = styled.input`
//   outline: none;
//   width: 100%;
//   border: 1px solid #d4d5d9;
//   padding: 2px 5px;
//   height: 30px;
//   border-radius: 2px;
//   margin-top: 20px;
// `;
const PhoneNumberLabel = styled.div`
  opacity: 0.6;
  font-size: 10px;
  color: #282c3f;
`;

const SelectGender = styled.div`
  width: 100%;
  display: inline-block;
  color: #94969f;
  font-size: 14px;
  position: relative;
  vertical-align: top;
  top: 2px;
  margin: 15px 0px;
  .radio-item {
    display: inline-block;
    position: relative;
    padding: 0 6px;
  }

  .radio-item input[type="radio"] {
    display: none;
  }

  .radio-item label {
    color: #666;
    font-weight: normal;
    cursor: pointer;
  }

  .radio-item label:before {
    content: " ";
    display: inline-block;
    position: relative;
    top: 2px;
    left: 0px;
    margin: 0 5px 0 0;
    width: 14px;
    height: 14px;
    border-radius: 11px;
    border: 1px solid #0bc6a0;
    background-color: transparent;
  }

  .radio-item input[type="radio"]:checked + label:after {
    border-radius: 11px;
    width: 10px;
    height: 10px;
    position: absolute;
    top: 5px;
    left: 9px;
    content: " ";
    display: block;
    background: #0bc6a0;
  }
`;

const GenderSpan = styled.span`
  margin: 0px 20px;
  float: right;
  text-align: center;
  /* input {
    accent-color: #5f8d4e;
  } */
`;

const CreateAccountButton = styled.button`
  width: 400px;
  position: fixed;
  margin-left: -200px;
  left: 50%;
  bottom: 26px;
  color: #fff;
  background-color: #ff3e6c;
  border-color: #ff2459;
  margin-top: 4px;
  padding: 11px 16px;
  font-size: 14px;
  letter-spacing: 0.6px;
  border-radius: 2px;
  line-height: 16px;
  margin-bottom: 0;
  text-transform: uppercase;
  font-weight: 700;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  outline: 0;
`;
const CreateAccount = () => {
  // const { currentUser } = useSelector((state) => ({ ...state.user }));

  const initialState = {
    email: "",
    password: "",
    gender: "",
    name: "",
    altPhone: "",
    hint: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const phoneNumber = localStorage.getItem("mobileNumber");
  console.log("PhoneNumber", phoneNumber);
  const handelChange = (e) => {
    // e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createAccount = async () => {
    const useAccount = await request.put(
      `http://localhost:8080/api/auth/createAccount/${phoneNumber}`,
      formData
    );
    console.log("useAccount", useAccount);
    if (useAccount) navigate("/");
  };
  console.log(formData);
  return (
    <>
      <Navbar />
      <FixedBackground></FixedBackground>
      <Main>
        <Wrapper>
          <Container>
            <div className="signUpHeader">Complete your sign up</div>
            <div className="phoneNumber">
              <div>
                <PhoneNumberLabel>Mobile Number</PhoneNumberLabel>
                <div>{phoneNumber}</div>
              </div>
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
              {/* <Input
                type="password"
                name="password"
                placeholder="Create password"
                required
              /> */}

              <div className="form-group ">
                <div className="password">
                  <input
                    autoComplete="new-password"
                    id=""
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder=""
                    aria-autocomplete="list"
                    value={formData?.password}
                    name="password"
                    onChange={handelChange}
                  />
                  <span className="placeholderAlternative">
                    Create Password
                    <span style={{ color: "rgb(255, 87, 34)" }}>*</span>{" "}
                  </span>
                  {formData?.password ? (
                    <span
                      className="form-control-feedback"
                      style={{ marginTop: "4px" }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg
                          style={{
                            width: "32px",
                            height: "24px",
                            viewBox: "0 0 32 24",
                            style: "margin-top: 4px",
                          }}
                        >
                          <g
                            style={{
                              transform: "translate(4)",
                              stroke: "none",
                              strokeWidth: "1",
                              fill: "none",
                              fillRule: "evenodd",
                            }}
                          >
                            <path d="M0 0L24 0 24 24 0 24z"></path>
                            <path
                              d="M0 0h20v20H0V0zm0 0h20v20H0V0zm0 0h20v20H0V0zm0 0h20v20H0V0z"
                              transform="translate(2 2)"
                            ></path>
                            <path
                              d="M10 5.833c2.3 0 4.167 1.867 4.167 4.167 0 .542-.109 1.05-.3 1.525l2.433 2.433A9.848 9.848 0 0019.158 10c-1.441-3.658-5-6.25-9.166-6.25a9.704 9.704 0 00-3.317.583l1.8 1.8c.475-.191.983-.3 1.525-.3zM1.667 3.558l1.9 1.9.383.384A9.837 9.837 0 00.833 10c1.442 3.658 5 6.25 9.167 6.25 1.292 0 2.525-.25 3.65-.7l.35.35 2.442 2.433 1.058-1.058L2.725 2.5 1.667 3.558zm4.608 4.609l1.292 1.291A2.351 2.351 0 007.5 10c0 1.383 1.117 2.5 2.5 2.5.183 0 .367-.025.542-.067l1.291 1.292a4.13 4.13 0 01-1.833.442A4.168 4.168 0 015.833 10c0-.658.167-1.275.442-1.833zm3.592-.65l2.625 2.625.016-.134c0-1.383-1.116-2.5-2.5-2.5l-.141.009z"
                              fill="#94969F"
                              fillRule="nonzero"
                              transform="translate(2 2)"
                            ></path>
                          </g>
                        </svg>
                      ) : (
                        <svg
                          style={{
                            width: "32px",
                            height: "24px",
                            viewBox: "0 0 32 24",
                            style: "margin-top: 4px",
                          }}
                        >
                          <g
                            style={{
                              transform: "translate(4)",
                              stroke: "none",
                              strokeWidth: "1",
                              fill: "none",
                              fillRule: "evenodd",
                            }}
                          >
                            <path d="M0 0L24 0 24 24 0 24z"></path>
                            <g transform="translate(2 2)">
                              <path d="M0 0L20 0 20 20 0 20z"></path>
                              <path
                                d="M10 3.75C5.833 3.75 2.275 6.342.833 10c1.442 3.658 5 6.25 9.167 6.25s7.725-2.592 9.167-6.25c-1.442-3.658-5-6.25-9.167-6.25zm0 10.417A4.168 4.168 0 015.833 10C5.833 7.7 7.7 5.833 10 5.833S14.167 7.7 14.167 10 12.3 14.167 10 14.167zM10 7.5A2.497 2.497 0 007.5 10c0 1.383 1.117 2.5 2.5 2.5s2.5-1.117 2.5-2.5-1.117-2.5-2.5-2.5z"
                                fill="#94969F"
                                fillRule="nonzero"
                              ></path>
                            </g>
                          </g>
                        </svg>
                      )}

                      {/* {true ? <VisibilityIcon /> : <VisibilityOffIcon />} */}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <div className="form-group ">
                <div className="name">
                  <input
                    // autocomplete="new-password"
                    // id=""
                    type="text"
                    className="form-control has-feedback"
                    placeholder=""
                    aria-autocomplete="list"
                    name="name"
                    value={formData?.name}
                    onChange={handelChange}
                  />
                  <span className="placeholderAlternative">FullName</span>
                </div>
              </div>
              {/* <Input type="text" name="fullName" placeholder="Full Name" />
              <Input type="email" name="email" placeholder="email" /> */}

              <div className="form-group ">
                <div className="email">
                  <input
                    type="text"
                    className="form-control has-feedback"
                    placeholder=""
                    aria-autocomplete="list"
                    name="email"
                    value={formData?.email}
                    onChange={handelChange}
                  />
                  <span className="placeholderAlternative">
                    Email(Optional)
                  </span>
                </div>
              </div>
              <div className="form-group">
                <SelectGender>
                  Select Gender:
                  <GenderSpan className="radio-item">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      id="genderMen"
                      checked={Boolean(formData?.gender == "male")}
                      onChange={handelChange}
                    />

                    <label htmlFor="genderMen">Men</label>
                  </GenderSpan>
                  <GenderSpan className="radio-item">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      id="ritemb"
                      checked={Boolean(formData?.gender == "female")}
                      onChange={handelChange}
                    />
                    <label htmlFor="ritemb">Women</label>
                  </GenderSpan>
                </SelectGender>
              </div>
              <div className="form-group ">
                <div className="alt-phone-number">
                  <input
                    // autocomplete="new-password"
                    // id=""
                    type="tel"
                    className="form-control mobileNumberInput"
                    placeholder=""
                    maxLength="10"
                    name="altPhone"
                    onChange={handelChange}
                    value={formData?.altPhone}
                  />
                  <span className="mobileNumber">
                    +91
                    <span
                      style={{
                        padding: "0px 10px",
                        position: "relative",
                        bottom: "1px",
                      }}
                    >
                      |
                    </span>
                    <span className="mobileNumberPlacholder">
                      Alternate Mobile Number
                    </span>
                  </span>
                </div>
                <i className="bar"></i>
              </div>
              <div className="textInputInfo">
                This will help recover your account if needed
              </div>

              <div className="form-group ">
                <div className="hint">
                  <input
                    type="text"
                    className="form-control has-feedback"
                    placeholder=""
                    aria-autocomplete="list"
                    name="hint"
                    value={formData?.hint}
                    onChange={handelChange}
                  />
                  <span className="placeholderAlternative">
                    Hint(Alternate Number)
                  </span>
                </div>
              </div>
              <div className="textInputInfo">
                This name will be a hint for your alternate number
              </div>
            </form>
          </Container>
        </Wrapper>
        <div className="form-group">
          <CreateAccountButton onClick={createAccount}>
            Create Account
          </CreateAccountButton>
        </div>
      </Main>
    </>
  );
};

export default CreateAccount;
