import React, { useState } from "react";
import Men from "../components/SubMenu/Men";
import Women from "../components/SubMenu/Women";
import Kids from "../components/SubMenu/Kids";

const NavText = () => {
  const [activeItem, setActiveItem] = useState(null);

  const handleMouseEnter = (item) => {
    setActiveItem(item);
  };

  const handleMouseLeave = () => {
    setActiveItem(null);
  };
  return (
    <div>
      <nav>
        <ul style={{ display: "flex", flexDirection: "row" }}>
          <li
            onMouseEnter={() => handleMouseEnter("men")}
            onMouseLeave={handleMouseLeave}
            style={{ padding: "20px" }}
          >
            Men
          </li>
          <li
            onMouseEnter={() => handleMouseEnter("women")}
            onMouseLeave={handleMouseLeave}
            style={{ padding: "20px" }}
          >
            Women
          </li>
          <li
            onMouseEnter={() => handleMouseEnter("kids")}
            onMouseLeave={handleMouseLeave}
            style={{ padding: "20px" }}
          >
            Kid
          </li>
        </ul>
      </nav>
      <div>
        {activeItem === "men" && <Men />}
        {activeItem === "women" && <Women />}
        {activeItem === "kids" && <Kids />}
      </div>
    </div>
  );
};

export default NavText;
