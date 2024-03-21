import React, { useState, useEffect } from "react";
import "./Header.css";
// import Sidebar from "../navbar/Sidebar.js";
//import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import DropdownMenu from "../dropdown/DropdownMenu.js";
// import icon from "../../assets/icon/tc.png";
import icon from "../../assets/icon/output-onlinepngtools.png";
import UsersButton from "../dropdown/buttons/UsersButton.js";
import TasksButton from "../dropdown/buttons/TasksButton.js";
import CategoriesButton from "../dropdown/buttons/CategoriesButton.js";
import LogoutButton from "../dropdown/buttons/LogoutButton.js";
import ProfileButton from "../dropdown/buttons/ProfileButton.js";
import { userStore } from "../../stores/UserStore.js";
import { useNavigate } from "react-router-dom";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

function Header() {
  const navigate = useNavigate();
  const role = userStore.getState().role; // Get the role from the store
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
  const [user, setUser] = useState(userStore.getState()); // Get the user from the store
  useEffect(() => {
    //subscribe -> Este método é usado para registrar uma função callback que será chamada sempre que um evento específico ocorrer. No seu caso, a função callback é chamada sempre que o estado do userStore muda.
    //unsubstube -> Este método é usado para cancelar uma assinatura que foi criada anteriormente com subscribe. Ele impede que a função callback seja chamada no futuro. No seu caso, unsubscribe é chamado quando o seu componente é desmontado para evitar vazamentos de memória.
    const unsubscribe = userStore.subscribe(() => {
      setUser(userStore.getState());
    });

    return unsubscribe;
  }, []);
  // Get the username from the DB and the imgURL
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "http://localhost:8080/demo-1.0-SNAPSHOT/rest/user/getDetails",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token, // Use the token from the store
            selectedUser: user.username, // Use the username from the store
          },
        }
      );
      const data = await response.json();
      userStore.getState().updatePhotoUrl(data.photoURL); // Update the photo URL in the store
      userStore.getState().updateUsername(data.username); // Update the username in the store
      userStore.getState().updateFirstname(data.firstname); // Update the firstname in the store
      userStore.getState().updateLastname(data.lastname); // Update the lastname in the store
      userStore.getState().updateEmail(data.email); // Update the email in the store
      userStore.getState().updatePhone(data.phone); // Update the phone in the store
      userStore.getState().updateRole(data.role); // Update the role in the store
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

  const handleTasksDeletedClick = () => {
    navigate("/deletedtasks");
  };

  return (
    <header className="header">
      <div className="header__left dropdown-container">
        <img
          id="logo-menu"
          onClick={handleDropdown}
          className="icon"
          src={icon}
          alt="Icon"
          draggable="false"
        />
        <DropdownMenu isOpen={isDropdownOpen} side="dropdown">
          <li>
            <TasksButton />
          </li>
          {role === "po" || role === "sm" ? (
            <li>
              <UsersButton />
            </li>
          ) : null}
          {role === "po" ? (
            <li>
              <CategoriesButton />
            </li>
          ) : null}
          {role === "po" || role === "sm" ? (
            <li onClick={handleTasksDeletedClick} className="dropdown-button">
              <DeleteOutlineOutlinedIcon /> Deleted Tasks
            </li>
          ) : null}
        </DropdownMenu>
      </div>

      <div className="header__right dropdown-container">
        <label className="header-name">{userStore.getState().username}</label>
        <img
          onClick={handleProfileDropdown}
          className="profile-icon"
          src={userStore.getState().photoURL}
          alt="Profile"
        />
        <DropdownMenu isOpen={isProfileDropdownOpen} side="dropdown-right">
          <li>
            <ProfileButton />
          </li>
          <li>
            <LogoutButton />
          </li>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default Header;

/* 
<SubDropdownMenu father="Delete">
            <li onClick={handleTasksDeletedClick}>Tasks</li>
            <li>Users</li>
            <li>Categories</li>
          </SubDropdownMenu>
*/
