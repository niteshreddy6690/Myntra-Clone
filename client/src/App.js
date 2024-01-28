import "./App.css";
// import "./index.css";
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Men from "./pages/Men";
import Products from "./pages/Products";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Test3 from "./pages/Test3";
import Studio from "./pages/Studio";
import Cart from "./pages/Cart";
import Checkbox from "./pages/Checkbox";
import Similar from "./components/ViewSimilar/Similar";
import VerifyOtp from "./pages/VerifyOtp";
import AccountLink from "./pages/AccountLink";
import CreateAccount from "./pages/CreateAccount";
import Wishlist from "./pages/Wishlist";
import Test5 from "./pages/Test5";
import Test1 from "./pages/Test";
import PreviewImg from "./pages/PreviewImg";
import Test8 from "./pages/Test8";
import ListOfProducts from "./pages/ListOfProducts";
import Toast from "./pages/Toast";
import MyMainPage from "./pages/My/MyMainPage";
import MyOrders from "./pages/My/MyOrders";
import OverView from "./pages/My/OverView";
import ProfileEdit from "./pages/My/ProfileEdit";
import Checkout from "./pages/Checkout";
import MyAddress from "./pages/My/MyAddress";

import Profile from "./pages/My/Profile";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LocalStorageService from "../src/api/localStorage";
import {
  fetchUserById,
  logOutUser,
} from "../src/redux/features/user/userSlice";
import { isFulfilled } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { fetchCartItems } from "../src/redux/features/cart/cartSlice";

// import "./fonts/whitneybold.otf";
// import "./fonts/whitneybook.ttf";
// import "./fonts/whitneymedium.ttf";
// // import "./fonts/whitneylight.otf";
// import "./fonts/whitneysemibold.ttf";
// import "./fonts/RishgularTryttf.ttf";
// import "./fonts/whitneymedium.woff";

import "./fonts/Assistant/Assistant-Light.ttf";
import "./fonts/Assistant/Assistant-Regular.ttf";
import "./fonts/Assistant/Assistant-SemiBold.ttf";

// const isAuthenticated = /* your authentication logic here */ true; // Replace with your actual authentication logic

function App() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => ({ ...state.user }));

  const isAuthenticated =
    currentUser || JSON.parse(localStorage.getItem("user"))?._id;

  console.log(isAuthenticated);
  // console.log("Is authenticated",isAuthenticated);
  // const PrivateRoute = ({ element, path }) => {
  //   return isAuthenticated ? element : <Navigate to="/login" />;
  // };

  //   const apiCall = async (decoded) => {
  //     const action = await dispatch(fetchUserById({ id: decoded.id }));
  //     if ( JSON.parse(localStorage.getItem("user"))?._id || isFulfilled(action)) {
  //       dispatch(fetchCartItems());
  //     }
  //   };

  // useEffect(()=>{
  //   const token = LocalStorageService.getAccessToken();
  //   if (token) {
  //     var decoded = jwt_decode(token);
  //     if (decoded) {
  //       if(window.location.pathname !== "/login"){
  //         apiCall(decoded);
  //       }

  //     }
  //   }
  // },[])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <Login />}
          />
          <Route path="/shop/:id" element={<Men />} />
          <Route path="/:id" element={<ListOfProducts />} />
          <Route path="/:id/:id/:id/:id/buy" element={<ProductDetailsPage />} />
          <Route
            path="/accountlink"
            element={isAuthenticated ? <Navigate to="/" /> : <AccountLink />}
          />
          <Route
            path="/createaccount"
            element={
              isAuthenticated?.isExistingUser ? (
                <Navigate to="/" />
              ) : (
                <CreateAccount />
              )
            }
          />
          .
          <Route
            path="/verifyotp"
            element={isAuthenticated ? <Navigate to="/" /> : <VerifyOtp />}
          />
          <Route path="/similar" element={<Similar />} />
          <Route
            path="/wishlist"
            element={isAuthenticated ? <Wishlist /> : <Navigate to="/login" />}
          />
          {/* <Route path="/category" element={<Category />} /> */}
          <Route
            path="/my/"
            element={
              isAuthenticated ? <MyMainPage /> : <Navigate to="/login" />
            }
          >
            <Route path="orders" element={<MyOrders />} />
            <Route path="dashboard" element={<OverView />} />
            <Route path="profile/edit" element={<ProfileEdit />} />
            <Route path="address" element={<MyAddress />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          {/* <Route path="/test1" element={<Test1 />} />
          <Route path="/test3" element={<Test3 />} />
          <Route path="/PreviewImg" element={<PreviewImg />} />
          <Route path="/addimages" element={<Test5 />} />
          <Route path="/radio" element={<Test8 />} />
          <Route path="/toast" element={<Toast />} /> */}
          <Route
            path="/checkout/cart"
            element={isAuthenticated ? <Cart /> : <Navigate to="/login" />}
          />
          <Route
            path="/checkout/payment"
            element={isAuthenticated ? <Checkout /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
