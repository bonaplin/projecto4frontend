import React, { useState } from "react";
import "./SubdropdownMenu.css";

const SubDropdownMenu = ({ father, children }) => {
  return (
    <div className="subdropdown">
      <li className="father">{father}</li>
      {<div className="subdropdown-content">{children}</div>}
    </div>
  );
};

export default SubDropdownMenu;
