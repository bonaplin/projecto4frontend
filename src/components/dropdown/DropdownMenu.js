// DropdownMenu.js
import React from "react";
import "./DropdownMenu.css";

const DropdownMenu = ({ isOpen, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="dropdown">
      <button>{children}</button>
    </div>
  );
};

export default DropdownMenu;
