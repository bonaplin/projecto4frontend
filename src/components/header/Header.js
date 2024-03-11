import React, { useState } from "react";
import "./Header.css";
import Sidebar from "../navbar/Sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import icon from "../../assets/icon/tc.png";
function Header() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  function toggleNavbar() {
    setIsNavbarVisible(!isNavbarVisible);
  }
  return (
    <header className="header">
      <div className="header__left">
        <button className="burger-icon" onClick={toggleNavbar}>
          <MenuIcon />
        </button>
        {icon && <img className="icon" src={icon} alt="Icon" />}
      </div>
      <div className="header__center">
        <input type="text" placeholder="Search" />
        <button>Search</button>
      </div>
      <div className="header__right">
        <img className="profile-icon" src="profile.png" alt="Profile" />
      </div>
    </header>
  );
}

export default Header;
