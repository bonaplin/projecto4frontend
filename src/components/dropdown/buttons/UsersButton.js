import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../../stores/UserStore"; // Import the store

export default function UsersButton() {
  const navigate = useNavigate();
  const token = userStore.getState().token; // Get the token from the store

  async function handleClick() {
    console.log("UsersButton click");
    const response = await fetch(
      "http://localhost:8080/demo-1.0-SNAPSHOT/rest/user/all",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );
    let userData = await response.json();

    // Filter the data
    userStore.getState().setUsers(userData); // Update the store
    console.log(userData); // Log the filtered userData to the console
    navigate("/users");
  }
  console.log("UsersButton");
  return <div onClick={handleClick}>Users</div>;
}
