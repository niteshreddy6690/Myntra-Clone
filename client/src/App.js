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
import ProductPage from "./pages/ProductPage";
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
import Test8 from "./pages/Test8";
import TempProduct from "./pages/TempProduct";
import LazyComponent from "./components/LazyComponent";
import Toast from "./pages/Toast";
import Category from "./pages/Category";
import MyMainPage from "./pages/My/MyMainPage";
import MyOrders from "./pages/My/MyOrders";
import OverView from "./pages/My/OverView";
import ProfileEdit from "./pages/My/ProfileEdit";
import Checkout from "./pages/Checkout";
import MyAddress from "./pages/My/MyAddress";

// import "./fonts/whitneybold.otf";
import "./fonts/whitneybook.ttf";
import "./fonts/whitneymedium.ttf";
// import "./fonts/whitneylight.otf";
import "./fonts/whitneysemibold.ttf";

import "./fonts/RishgularTryttf.ttf";
import "./fonts/whitneymedium.woff";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import "./fonts/MemphisRiver.otf";
import LocalStorageService from "../src/api/localStorage";
import { fetchUserById } from "../src/redux/features/user/userSlice";
import { isFulfilled } from "@reduxjs/toolkit";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shop/:id" element={<Men />} />
          <Route path="/:id/" element={<TempProduct />} />
          {/* <Route path="/:id/" element={<Products />} /> */}

          <Route path="/:id/:id/:id/:id/buy" element={<ProductPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/accountlink" element={<AccountLink />} />
          <Route path="/createaccount" element={<CreateAccount />} />
          <Route path="/verifyotp" element={<VerifyOtp />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/checkout/cart" element={<Cart />} />
          <Route path="/checkbox" element={<Checkbox />} />
          <Route path="/similar" element={<Similar />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/category" element={<Category />} />
          <Route path="/my/" element={<MyMainPage />}>
            <Route path="orders" element={<MyOrders />} />
            <Route path="dashboard" element={<OverView />} />
            <Route path="profile/edit" element={<ProfileEdit />} />
            <Route path="address" element={<MyAddress />} />
          </Route>

          <Route path="/test" element={<Test3 />} />
          <Route path="/addimages" element={<Test5 />} />
          <Route path="/radio" element={<Test8 />} />
          <Route path="/toast" element={<Toast />} />
          <Route path="/checkout/cart" element={<Cart />} />
          <Route path="/checkout/payment" element={<Checkout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
