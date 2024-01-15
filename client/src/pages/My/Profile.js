import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment';
import {Link} from "react-router-dom"

const ProfileWrapper = styled.div`
    width: 100%;
    margin: 15px;
    /* height: 200px; */
    background-color: red;

@media screen and (min-width: 980px) {
    /* background: #ffffff; */
}
`

const ProfileContainer = styled.div`
    background-color: white;
    padding: 10px 0px 20px;
    margin-bottom: 10px;
    text-align: justify;
    padding: 24px 0 42px 0px;
    overflow-x: scroll;
      
    .profile-infoLabel {
    color: #282C3F;
    font-weight: 600;
    font-size: 18px;
    border-bottom: 1px solid #eaeaec;
    padding-bottom: 15px;
    font-family: Assistant-Bold, Assistant!important;
    padding: 0 24px 24px 24px;
}
.profile-infoTable {
    margin: 25px 0 25px 0;
    padding: 0 24px;
    font-family: Assistant-Regular , Assistant !important;
}

.profile-infoTable tr {
    height: 43px;
    text-align: left;
}

.profile-infoTable td {
    width: 200px;
    margin: 10px;
    padding: 0 4px;
    text-decoration: none;
    color: #282C3F !important;
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
 .td_gender{
  text-transform: uppercase;
}
.profile-editButton {
    cursor: pointer;
    text-transform: uppercase;
    padding: 15px;
    text-align: center;
    font-weight: 800;
    background-color: #FF3F6C;
    margin: 30px 24px;
    color: white;
    border-radius: 2px;
}
    @media screen  and (min-width: 780px) {
      padding: 42px 130px;
    border: 1px solid #d4d4d9;
    }
`

const InitialData={
     name: '- not added -',
      email: "- not added -",
      altPhone: "- not added -",
      hint: "- not added -",
      location: "- not added -",
      gender: "- not added -",
      dob: "- not added -"
}

const Profile = () => {
  const { currentUser } = useSelector((state) => ({ ...state.user }));
  const [User,SetUser]=useState({InitialData})
const user= JSON.parse(localStorage.getItem('user'))


  useEffect(()=>{
    (currentUser || user ) && SetUser({
      name: currentUser?.name ? currentUser?.name:user?.name,
      email: currentUser?.email?currentUser?.email:user?.email,
      altPhone: currentUser?.altPhone?currentUser?.altPhone:user?.altPhone,
      phone: currentUser?.phonenumber?currentUser?.phonenumber:user?.phonenumber,
      hint: currentUser?.hint?currentUser?.hint:user?.hint,
      location: currentUser?.location?currentUser?.location:user?.location,
      gender: currentUser?.gender?currentUser?.gender:user?.gender,
      dob: moment(currentUser?.dob).format("DD/MM/YYYY")?moment(currentUser?.dob).format("DD/MM/YYYY"):moment(user?.dob).format("DD/MM/YYYY"),
})
  },[currentUser])
  return (
    <ProfileWrapper>
      <ProfileContainer>
      <div class="profile-infoLabel">Profile Details</div>
      
      <table class="profile-infoTable"><tbody><tr><td>Full Name</td><td>{User?.name}</td></tr><tr><td>Mobile Number</td><td>{User?.phone}</td></tr><tr><td>Email ID</td><td>{User?.email}</td></tr><tr><td>Gender</td><td className="td_gender">{User?.gender}</td></tr><tr><td>Date of Birth</td><td>{User?.dob}</td></tr><tr><td>Location</td><td>{User?.location}</td></tr><tr><td>Alternate Mobile</td><td>{User?.altPhone}</td></tr><tr><td>Hint Name</td><td>{User?.hint}</td></tr></tbody></table>
      
      <Link to="profile/edit"><div class="profile-editButton"> EDIT </div></Link>
      </ProfileContainer>
    </ProfileWrapper>
  )
}

export default Profile