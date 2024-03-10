import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
function Header() {
  return (
    <header>
      <h1>Scrum App</h1>
      <nav style={{ backgroundColor: "black" }}>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="outros">Back</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
