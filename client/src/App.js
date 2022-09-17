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

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shop/men" element={<Men />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
