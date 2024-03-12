import React, { useState } from "react";
import "./Header.css";
import Sidebar from "../navbar/Sidebar.js";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import icon from "../../assets/icon/tc.png";
function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="header">
        <div className="header__left">
          <button className="burger-icon" onClick={toggleSidebar}>
            <MenuOutlinedIcon fontSize="large" />
          </button>
          {icon && (
            <img
              className="icon"
              src={icon}
              alt="Icon"
              onClick={toggleSidebar}
            />
          )}
        </div>
        <div className="header__center">
          <input type="text" placeholder="Search" />
          <button>Search</button>
        </div>
        <div className="header__right">
          <img className="profile-icon" src="profile.png" alt="Profile" />
        </div>
      </header>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
    </>
  );
}

export default Header;
