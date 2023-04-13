import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
const ProfileEditCard = styled.div`
  background-color: white;
  text-align: justify;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.25);
  padding: 24px 0;
  width: 100%;
  position: relative;

  .profileEdit-infoLabel {
    color: #282c3f;
    font-weight: 700;
    font-size: 20px;
    border-bottom: 1px solid #eaeaec;
    margin: 0;
    font-family: Assistant;
    padding: 0 24px 24px 24px;
  }
  .mobileNumber-verifiedNumber {
    position: relative;
    bottom: 4px;
    font-size: 16px;
  }
  .mobileNumber-pmn {
    padding: 12px;
    background-color: #ffffff;
    border: solid 1px #d4d5d9;
    margin: 20px 24px 30px 24px;
    border-radius: 2px;
    display: -webkit-box;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: space-between;
  }

  .mobileNumber-pmn .mobileNumber-verifiedIcon {
    position: relative;
    top: 7px;
  }
  .mobileNumber-pmn > div {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -moz-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }
  .subcomponents-btn {
    padding: 11px 0;
    border: 1px solid #ff3f6c;
    border-radius: 2px;
    background-color: #ffffff;
    color: #ff3f6c;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 14px;
    width: 100%;
    outline: 0;
    cursor: pointer;
    touch-action: manipulation;
    user-select: none;
  }
  .profileEdit-updatedBtn {
    border: 1px solid #d4d5d9;
    padding: 12px 32px;
    color: #282c3f;
    font-weight: 700;
    font-family: Assistant-Bold, Assistant;
  }

  @media (min-width: 780px) {
    padding-top: 55px;
    padding-bottom: 40px;
    border: 1px solid #d4d4d9;

    .profileEdit-infoLabel {
      margin: 0 40px 0 40px;
    }
  }
`;

const ProfileEditEntries = styled.div`
  padding: 0 24px;
  .profileEdit-formElement {
    width: 100%;
    margin: 24px 0;
  }
  .textInput-form-group {
    position: relative;
    margin-bottom: 16px;
  }

  .textInput-form-group input:focus {
    border: 1px solid #282c3f;
  }
  .textInput-form-group input {
    caret-color: #ff3f6c;
  }
  .textInput-form-group .textInput-form-control {
    border: solid 1px #d4d5d9;
    font-size: 16px;
    padding: 12px;
    height: auto;
    color: #282c3f;
    width: 100%;
    outline: none;
  }

  .textInput-form-control:focus ~ .placeholderAlternative {
    top: -8px;
    left: 12px;
    background-color: white;
    padding: 0 2px;
    color: #282c3f;
    position: absolute;
    transition: 0.2s;
  }

  .full-name:not([value=""]) ~ .placeholderAlternative {
    transition: 0.2s;
    color: #282c3f;
    padding: 0 2px;
    top: -8px;
    left: 12px;
    background-color: #fff;
  }
  .email:not([value=""]) ~ .placeholderAlternative {
    transition: 0.2s;
    color: #282c3f;
    padding: 0 2px;
    top: -8px;
    left: 12px;
    background-color: #fff;
  }
  .placeholderAlternative {
    color: #94969f;
    top: 14px;
    left: 12px;
    font-size: 12px;
    position: absolute;
    pointer-events: none;
  }
  .profile-genderSelection {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .profile-genderSelection .profile-gender {
    background-color: #ffffff;
    /* padding: 7px 0; */
    border: 1px solid rgba(40, 44, 63, 0.2);
    width: 50%;
    height: 40px;
    min-height: 40px;
    vertical-align: middle;
    display: flex;
    justify-content: center;
  }

  .profile-gender label {
    cursor: pointer;
    width: 100%;
    height: 100%;
    text-align: center;
    vertical-align: center;
    padding: 7px 0px;
  }
  .profile-genderSelection input {
    outline: 0;
  }
  .profile-gender input[type="radio"] {
    display: none;
    outline: 0;
  }

  .mobileNumber {
    color: #94969f;
    top: 14px;
    left: 12px;
    font-size: 12px;
    position: absolute;
    pointer-events: none;
  }
  .phoneNumber:not([value=""]) {
    transition: none;
    padding: 12px 0px 12px 50px;
  }
  .phoneNumber:focus {
    transition: none;
    padding: 12px 0px 12px 50px;
  }

  .phoneNumber:focus ~ .mobileNumber {
    transition: 0.2s;
    color: #282c3f;
    padding: 0 2px;
  }
  .phoneNumber:focus ~ .mobileNumber .mobileNumberPlacholder {
    display: none;
  }
  .phoneNumber:not([value=""]) ~ .mobileNumber .mobileNumberPlacholder {
    /* transition: 0.2s;
    top: -9px;
    background-color: #fff;
    padding: 0 2px;
    color: #282c3f;
    position: absolute;
    zoom: 1px; */
    display: none;
  }

  .profileEdit-buttonSaveDetails {
    margin-top: 20px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10;
    padding: 12px 24px;
    background-color: #ffffff;
    width: 100%;
    -webkit-box-shadow: 0 -1px 4px 0 rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 -1px 4px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 -1px 4px 0 rgba(0, 0, 0, 0.1);
  }
  @media (min-width: 780px) {
    .profileEdit-buttonSaveDetails {
      margin-top: 0px;
      position: relative;
      z-index: 8;
      padding: 0;
      background-color: #ffffff;
      width: inherit;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      margin-bottom: 32px;
    }
  }
  .subcomponents-btn.subcomponents-primary {
    background-color: #ff3f6c;
    color: #ffffff;
  }
  .subcomponents-btn {
    padding: 11px px 0;
    border: 1px solid #ff3f6c;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    background-color: #ffffff;
    /* color: #ff3f6c; */
    /* font-weight: 600; */
    text-transform: uppercase;
    font-size: 14px;
    width: 100%;
    outline: 0;
    cursor: pointer;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`;
const ProfileEdit = () => {
  const initialState = {
    email: "",
    password: "",
    gender: "",
    name: "",
    altPhone: "",
    hint: "",
    dob: "",
    location: "",
  };
  const [formData, setFormData] = useState(initialState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const { currentUser } = useSelector((state) => ({ ...state.user }));
  console.log("formData", formData);
  const handelChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <ProfileEditCard>
      <div className="profileEdit-infoLabel">Edit Profile</div>
      <div className="mobileNumber-pmn">
        <div>
          <p
            style={{
              fontSize: "12px",
              marginTop: "0px",
              marginBottom: "0px",
              color: "rgba(39, 43, 65, 0.7)",
            }}
          >
            Mobile Number*
          </p>
          <div className="mobileNumber-verifiedNumber">
            <span>9901145387</span>
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              className="mobileNumber-verifiedIcon"
            >
              <title>Icon_Verified</title>
              <g
                id="Icon_Verified"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g id="Group-2">
                  <rect
                    id="Rectangle"
                    x="0"
                    y="0"
                    width="24"
                    height="24"
                  ></rect>
                  <g
                    id="Group"
                    transform="translate(4.000000, 4.000000)"
                    fill-rule="nonzero"
                  >
                    <path
                      d="M15.4098644,7.16362903 C15.0413176,6.7950822 14.9031125,6.08102272 15.0873859,5.597305 C15.2946935,5.11358729 15.0643517,4.53773286 14.5575998,4.33042527 C14.0738821,4.12311768 13.6592669,3.52422907 13.6592669,2.994443 C13.6592669,2.46465693 13.2216176,2.02700757 12.6918315,2.02700757 C12.1620454,2.02700757 11.5631568,1.63542656 11.3558492,1.12867467 C11.1485416,0.644956955 10.5957214,0.391581008 10.0889695,0.598888601 C9.60525179,0.806196194 8.89119231,0.667991132 8.52264548,0.276410124 C8.15409864,-0.0921367078 7.53217587,-0.0921367078 7.16362903,0.276410124 C6.7950822,0.644956955 6.08102272,0.783162017 5.597305,0.598888601 C5.11358729,0.391581008 4.53773286,0.621922778 4.33042527,1.12867467 C4.12311768,1.61239239 3.52422907,2.02700757 2.994443,2.02700757 C2.46465693,2.02700757 2.02700757,2.46465693 2.02700757,2.994443 C2.02700757,3.52422907 1.63542656,4.12311768 1.12867467,4.33042527 C0.644956955,4.53773286 0.391581008,5.09055311 0.598888601,5.597305 C0.806196194,6.08102272 0.667991132,6.7950822 0.276410124,7.16362903 C-0.0921367078,7.53217587 -0.0921367078,8.15409864 0.276410124,8.52264548 C0.644956955,8.89119231 0.783162017,9.60525179 0.598888601,10.0889695 C0.391581008,10.5726872 0.621922778,11.1485416 1.12867467,11.3558492 C1.61239239,11.5631568 2.02700757,12.1620454 2.02700757,12.6918315 C2.02700757,13.2216176 2.46465693,13.6592669 2.994443,13.6592669 C3.52422907,13.6592669 4.12311768,14.0508479 4.33042527,14.5575998 C4.53773286,15.0413176 5.09055311,15.2946935 5.597305,15.0873859 C6.08102272,14.8800783 6.7950822,15.0182834 7.16362903,15.4098644 C7.53217587,15.7784112 8.15409864,15.7784112 8.52264548,15.4098644 C8.89119231,15.0413176 9.60525179,14.9031125 10.0889695,15.0873859 C10.5726872,15.2946935 11.1485416,15.0643517 11.3558492,14.5575998 C11.5631568,14.0738821 12.1620454,13.6592669 12.6918315,13.6592669 C13.2216176,13.6592669 13.6592669,13.2216176 13.6592669,12.6918315 C13.6592669,12.1620454 14.0508479,11.5631568 14.5575998,11.3558492 C15.0413176,11.1485416 15.2946935,10.5957214 15.0873859,10.0889695 C14.8800783,9.60525179 15.0182834,8.89119231 15.4098644,8.52264548 C15.7784112,8.15409864 15.7784112,7.55521004 15.4098644,7.16362903 Z"
                      id="Shape"
                      fill="#03A685"
                    ></path>
                    <path
                      d="M11.0240367,5.03144654 C10.8342658,5.03135699 10.6522754,5.11115578 10.5182946,5.2532034 L7.20553975,8.75411993 L5.56390107,7.01885781 C5.38318288,6.82708509 5.1193057,6.75195524 4.87190118,6.82183492 C4.62449667,6.8917146 4.43125601,7.09595788 4.36514077,7.35744898 C4.29902552,7.61894008 4.37010811,7.89784175 4.55154999,8.08884957 L6.69936421,10.3591076 C6.83357288,10.5010718 7.01566369,10.5808361 7.20553975,10.5808361 C7.39541581,10.5808361 7.57750662,10.5010718 7.71171529,10.3591076 L11.5302122,6.32319517 C11.735044,6.10682348 11.7963538,5.78132616 11.6855423,5.49853779 C11.5747308,5.21574942 11.3136305,5.03138567 11.0240367,5.03144654 Z"
                      id="Shape"
                      fill="#FFFFFF"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div>
          <button className="subcomponents-btn profileEdit-updatedBtn">
            Change
          </button>
        </div>
      </div>
      <form>
        <ProfileEditEntries>
          <div className="profileEdit-formElement">
            <div className="textInput-form-group">
              <input
                type="text"
                autocomplete="new-password"
                value={formData.name}
                name="name"
                className="textInput-form-control full-name"
                placeholder=""
                onChange={handelChange}
              />
              <span className="placeholderAlternative ">Full Name</span>
            </div>
          </div>
          <div className="profileEdit-formElement">
            <div className="textInput-form-group">
              <input
                type="text"
                autocomplete="new-password"
                value={formData.email}
                name="email"
                className="textInput-form-control email"
                placeholder=""
                onChange={handelChange}
              />
              <span className="placeholderAlternative">Email</span>
            </div>
          </div>
          <div className="profileEdit-formElement">
            <div className="profile-genderSelection">
              <div className="profile-gender">
                <input
                  type="radio"
                  value="male"
                  id="genderMen"
                  name="gender"
                  checked={Boolean(formData?.gender == "male")}
                  onChange={handelChange}
                />
                <span class="subcomponents-selected">
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    version="1.1"
                  >
                    <title>icons/controls/check/active</title>
                    <g
                      id="icons/controls/check/active"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <path
                        d="M16.7746405,8.22735801 C16.478929,7.91934842 16.0050049,7.92494859 15.716079,8.24015841 L10.3732719,14.0147382 C10.3368437,14.0543394 10.2772014,14.0547394 10.240416,14.0155382 L8.27793445,11.9086726 C7.98579433,11.5966629 7.51151306,11.5962629 7.21937294,11.9078726 C6.92687569,12.2194823 6.92687569,12.723498 7.21937294,13.0351077 L9.78399176,15.7767931 C9.92434758,15.9263977 10.1147029,16 10.3132725,16 L10.3175582,16 C10.5175563,16 10.7089831,15.9227976 10.8486246,15.7699928 L16.7867832,9.35379308 C17.0757091,9.03858326 17.070352,8.5353676 16.7746405,8.22735801"
                        id="Fill-1"
                        fill="#FF3F6C"
                      ></path>
                    </g>
                  </svg>
                  Male
                </span>
                <label htmlFor="genderMen">Male</label>
              </div>
              <div className="profile-gender">
                <input
                  type="radio"
                  id="genderFemale"
                  value="female"
                  name="gender"
                  checked={Boolean(formData?.gender == "female")}
                  onChange={handelChange}
                />
                <label htmlFor="genderFemale">Female</label>
              </div>
            </div>
          </div>
          <div className="profileEdit-formElement">
            <div className="textInput-form-group">
              <input
                type="tel"
                autocomplete="new-password"
                value={formData.dob}
                name="dob"
                className="textInput-form-control alt-phone"
                placeholder=""
                onChange={handelChange}
              />
              <span className="placeholderAlternative ">
                Birthday (dd/mm/yyy)
              </span>
            </div>
          </div>

          <div className="profileEdit-formElement">
            <div className="textInput-form-group">
              <input
                type="text"
                autocomplete="new-password"
                value={formData.location}
                className="textInput-form-control location"
                placeholder=""
                name="location"
                onChange={handelChange}
              />
              <span className="placeholderAlternative ">location</span>
            </div>
          </div>

          <div className="profileEdit-formElement">
            <p
              style={{
                fontSize: "14px",
                fontWeight: "700",
                marginBottom: "24px",
                color: "rgb(62, 65, 82)",
              }}
            >
              Alternate mobile details
            </p>
            <div className="textInput-form-group ">
              <input
                type="tel"
                autocomplete="new-password"
                value={formData.altPhone}
                name="altPhone"
                className="textInput-form-control phoneNumber"
                placeholder=""
                maxLength="10"
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
                <span className="mobileNumberPlacholder">Mobile Number</span>
              </span>
            </div>
            <div className="profileEdit-disabled">
              <div className="textInput-form-group ">
                <input
                  type="text"
                  autocomplete="new-password"
                  value={formData.hint}
                  name="hint"
                  className="textInput-form-control"
                  placeholder=""
                />
                <span className="placeholderAlternative">Hint name</span>
              </div>
            </div>
          </div>
          <div className="profileEdit-buttonSaveDetails">
            <button className="subcomponents-btn subcomponents-primary">
              Save Details
            </button>
          </div>
        </ProfileEditEntries>
      </form>
    </ProfileEditCard>
  );
};

export default ProfileEdit;
