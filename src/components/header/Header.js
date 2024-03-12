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
import { userStore } from "../../stores/UserStore.js";

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

  const token = userStore.getState().token; // Get the token from the store

  // Get the username from the DB and the imgURL
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "http://localhost:8080/demo-1.0-SNAPSHOT/rest/user/getPartial",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token, // Use the token from the store
          },
        }
      );
      const data = await response.json();
      userStore.getState().updateUsername(data.firstname); // Update the username in the store
      userStore.getState().updatePhotoUrl(data.photourl); // Update the photo URL in the store
      console.log(userStore.getState().photourl); // Log the username to the console
    }
    fetchData();
  }, [token]); // Run the effect when the token changes

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

      <div className="header__right">
        <label>{userStore.getState().username}</label>
        <img
          onClick={handleProfileDropdown}
          className="profile-icon"
          src={userStore.getState().photourl}
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
