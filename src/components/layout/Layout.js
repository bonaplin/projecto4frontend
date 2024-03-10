import React from "react";
import Sidebar from "../navbar/Sidebar";
import Footer from "../footer/Footer";
import "./Layout.css";
import Header from "../header/Header";

function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <div className="main-content">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
