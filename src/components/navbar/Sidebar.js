/* CRIAR ELEMENTO SIDEBAR PARA INSERIR ICONS */
import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import "./Sidebar.css";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const [isDeletedOpen, setIsDeletedOpen] = useState(false);

  function handleDeletedClick(e) {
    e.preventDefault();
    setIsDeletedOpen(() => !isDeletedOpen);
  }

  return (
    <Menu isOpen={props.isOpen}>
      <a className="menu-item" href="/home">
        Home
      </a>

      <a className="menu-item" href="/activity">
        Users
      </a>

      <a className="menu-item" href="/profile">
        Categories
      </a>

      <a className="menu-item" href="" onClick={handleDeletedClick}>
        Deleted
      </a>
      {isDeletedOpen && (
        <ul>
          <li>
            <a className="menu-item">Users</a>
          </li>
          <li>
            <a className="menu-item">Tasks</a>
          </li>
          <li>
            <a className="menu-item">Categories</a>
          </li>
        </ul>
      )}
      <a className="menu-item" href="">
        Logout
      </a>
    </Menu>
  );
};
