import React, { useState, useEffect } from "react";
import "./Header.css";
// import Sidebar from "../navbar/Sidebar.js";
//import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import DropdownMenu from "../dropdown/DropdownMenu.js";
import SubDropdownMenu from "../dropdown/submenu/SubdropdownMenu.js";
import icon from "../../assets/icon/tc.png";
import UsersButton from "../dropdown/buttons/UsersButton.js";
import TasksButton from "../dropdown/buttons/TasksButton.js";
import CategoriesButton from "../dropdown/buttons/CategoriesButton.js";

function Header() {
  /*dropdown main*/
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    console.log("Dropdown clicked", isDropdownOpen);
  };
  /*dropdown profile*/
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const handleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    console.log("Profile Dropdown clicked", isProfileDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setIsDropdownOpen(false);
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="header__left dropdown-container">
        <button onClick={handleDropdown} className="menu-button">
          M
        </button>
        <DropdownMenu isOpen={isDropdownOpen} side="dropdown">
          <li>
            <TasksButton />
          </li>
          <li>
            <UsersButton />
          </li>
          <li>
            <CategoriesButton />
          </li>
          <SubDropdownMenu father="Delete">
            <li>Tasks</li>
            <li>Users</li>
            <li>Categories</li>
          </SubDropdownMenu>
        </DropdownMenu>
        {icon && <img className="icon" src={icon} alt="Icon" />}
      </div>
      <div className="header__center">
        <input type="text" placeholder="Search" />
        <button>Search</button>
      </div>
      <div className="header__right">
        <img
          onClick={handleProfileDropdown}
          className="profile-icon"
          src="https://cdn.vectorstock.com/i/preview-1x/15/40/blank-profile-picture-image-holder-with-a-crown-vector-42411540.jpg"
          alt="Profile"
        />
        {isProfileDropdownOpen && (
          <DropdownMenu isOpen={isProfileDropdownOpen} side="dropdown-right">
            <li>Profile</li>
            <li>Logout</li>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}

export default Header;
