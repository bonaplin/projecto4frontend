import React, { useState } from "react";
import "./Sidebar.css"; // Assuming you have a CSS file for styling
import SidebarButton from "./button/SidebarButton";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isDeletedOpen, setIsDeletedOpen] = useState(false);

  const handleDeletedClick = (e) => {
    e.preventDefault();
    setIsDeletedOpen(!isDeletedOpen);
  };

  return (
    isOpen && (
      <div id="mySidebar" className={`sidebar ${isOpen ? "open" : ""}`}>
        <SidebarButton href="/home" onClick={toggleSidebar}>
          Home
        </SidebarButton>
        <SidebarButton href="/activity" onClick={toggleSidebar}>
          Users
        </SidebarButton>
        <SidebarButton href="/profile" onClick={toggleSidebar}>
          Categories
        </SidebarButton>
        <SidebarButton href="#" onClick={handleDeletedClick}>
          Deleted
        </SidebarButton>
        {isDeletedOpen && (
          <ul>
            <li>
              <SidebarButton href="#">Deleted Users</SidebarButton>
            </li>
            <li>
              <SidebarButton href="#">Deleted Categories</SidebarButton>
            </li>
          </ul>
        )}
      </div>
    )
  );
};

export default Sidebar;
