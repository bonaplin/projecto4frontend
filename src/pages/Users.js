import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import "./Users.css";
export default function () {
  return (
    <>
      <Header />
      <div>
        <h1>Users</h1>
      </div>
    </>
  );
}
