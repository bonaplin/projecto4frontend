import React from "react";
import { userStore } from "../../../stores/UserStore.js";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  async function handleClick() {
    console.log("LogoutButton click");

    // Get the token from the userStore
    const token = userStore.getState().token;

    // Make a request to the logout endpoint
    const response = await fetch(
      "http://localhost:8080/demo-1.0-SNAPSHOT/rest/user/logout",
      {
        method: "POST", // or 'GET'
        headers: {
          "Content-Type": "application/json",
          // Use the token in the Authorization header
          token: token,
        },
      }
    );

    // Check if the request was successful
    if (response.ok) {
      // Clear the userStore
      await userStore.getState().updateUsername("");
      await userStore.getState().updateToken("");
      await userStore.getState().updateRole("");
      await userStore.getState().updateFirstname("");
      await userStore.getState().updateLastname("");
      await userStore.getState().updatePhotoUrl("");
      // Navigate to the login page
      navigate("/login");
    } else {
      console.error("Logout failed");
    }
  }

  return <div onClick={handleClick}>Logout</div>;
}
