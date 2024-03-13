import React from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../../stores/UserStore"; // Import the store

export default function ProfileButton() {
  const navigate = useNavigate();
  const token = userStore.getState().token; // Get the token from the store
  const username = userStore.getState().username; // Get the username from the store

  async function handleClick() {
    console.log("ProfileButton click");
    const response = await fetch(
      "http://localhost:8080/demo-1.0-SNAPSHOT/rest/user/getDetails",
      {
        headers: {
          "Content-Type": "application/json",
          token: token,
          selectedUser: username,
        },
      }
    );
    let userDetails = await response.json();

    console.log(userDetails); // Log the userDetails to the console
    navigate("/edit-profile", { state: { userDetails: userDetails } });
  }
  console.log("ProfileButton");
  return <div onClick={handleClick}>Profile</div>;
}
