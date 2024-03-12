import React, { useState } from "react";
import "./SubdropdownMenu.css";

const SubDropdownMenu = ({ father, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="subdropdown">
      <button onClick={handleDropdown}>{father}</button>
      {isOpen && <div className="subdropdown-content">{children}</div>}
    </div>
  );
};

export default SubDropdownMenu;
