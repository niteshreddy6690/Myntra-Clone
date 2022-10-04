import "./App.css";
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

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shop/men" element={<Men />} />
          <Route path="/:id/:id" element={<Products />} />
          <Route path="/:id/:id/:id" element={<ProductPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
