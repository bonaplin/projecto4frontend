import React from "react";
import { useNavigate } from "react-router-dom";

export default function UsersButton() {
  function handleClick() {
    console.log("UsersButton click");
    navigate("/users");
  }
  const navigate = useNavigate();

  console.log("UsersButton");
  return <div onClick={handleClick}>Users</div>;
}
