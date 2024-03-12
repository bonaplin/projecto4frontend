import React, { useState } from "react";
import "./Header.css";
// import Sidebar from "../navbar/Sidebar.js";
//import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import DropdownMenu from "../dropdown/DropdownMenu.js";
import SubDropdownMenu from "../dropdown/submenu/SubdropdownMenu.js";
import icon from "../../assets/icon/tc.png";
function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    console.log("Dropdown clicked", isDropdownOpen);
  };

  return (
    <>
      <header className="header">
        <div className="header__left dropdown-container">
          <button onClick={handleDropdown}>M</button>
          <DropdownMenu isOpen={isDropdownOpen}>
            <button>Tasks</button>
            <button>Users</button>
            <button>Categories</button>
            <SubDropdownMenu father="Delete">
              <button>Deleted item1</button>
              <button>Deleted item2</button>
              <button>Deleted item3</button>
            </SubDropdownMenu>
          </DropdownMenu>
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
    </>
  );
}

export default Header;
