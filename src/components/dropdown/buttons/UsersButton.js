import React from "react";
import { useNavigate } from "react-router-dom";

export default function UsersButton() {
  const navigate = useNavigate();

  async function handleClick() {
    console.log("UsersButton click");
    const response = await fetch(
      "http://localhost:8080/demo-1.0-SNAPSHOT/rest/user/all",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );
    const userData = await response.json();
    console.log(userData); // Log the userData to the console
    navigate("/users", { state: { userData: userData } });
  }

  console.log("UsersButton");
  return <div onClick={handleClick}>Users</div>;
}
