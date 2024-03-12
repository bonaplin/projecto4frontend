import React from "react";
import "./SidebarButton.css";
const SidebarButton = ({ href, onClick, children }) => {
  return (
    <div class="sidebar-button-main">
      <div href={href} onClick={onClick} className="sidebar-button">
        {children}
      </div>
    </div>
  );
};

export default SidebarButton;
