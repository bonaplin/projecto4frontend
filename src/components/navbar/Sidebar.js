import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import "./Sidebar.css";

export default (props) => {
  return (
    <Menu>
      <a className="menu-item" href="/home">
        Home
      </a>

      <a className="menu-item" href="/activity">
        Users
      </a>

      <a className="menu-item" href="/profile">
        Categories
      </a>

      <a className="menu-item" href="/profile">
        Deleted
      </a>
    </Menu>
  );
};
