import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import VerifyOtp from "./pages/login/VerifyOtp";
import CreateCategory from "./pages/CreateCategory/CreateCategory.jsx";
import { useSelector } from "react-redux";

function App() {
  // const admin = useSelector((state) => state.user.currentUser?.isAdmin);
  const admin = true;
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/VerifyOtp" element={<VerifyOtp />} />
      </Routes>
      {admin && (
        <>
          <div>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/user/:userId" element={<User />} />
                <Route path="/newUser" element={<NewUser />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/product/:productId" element={<Product />} />
                <Route path="/newproduct" element={<NewProduct />} />
                <Route path="/category" element={<CreateCategory />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </Router>
  );
}

export default App;
