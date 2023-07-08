import axios from "axios";

const BASE_URL = "http://localhost:8080/api/";
const TOKEN = "";

//JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
//   .currentUser?.AccessToken;

// console.log(
//   "Local Storage: ",
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     ?.AccessToken
// );

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { authorization: `Bearer ${TOKEN}` },
});
