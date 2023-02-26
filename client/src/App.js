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
import TempProduct from "./pages/TempProduct";
import LazyComponent from "./components/LazyComponent";
import Toast from "./pages/Toast";

// import "./fonts/whitneybold.otf";
import "./fonts/whitneybook.ttf";
import "./fonts/whitneymedium.ttf";
// import "./fonts/whitneylight.otf";
import "./fonts/whitneysemibold.ttf";

import "./fonts/RishgularTryttf.ttf";
import "./fonts/whitneymedium.woff";

// import "./fonts/MemphisRiver.otf";

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
          {/* <Route path="/test" element={<Test3 />} />
          <Route path="/addimages" element={<Test5 />} /> */}
          <Route path="/toast" element={<Toast />} />
          <Route path="/checkout/cart" element={<Cart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
