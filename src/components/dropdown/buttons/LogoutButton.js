import React from "react";
import { userStore } from "../../../stores/UserStore.js";
import { useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { tsuccess, terror } from "../../messages/Message";
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

    const data = await response.json();

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
      tsuccess(data.message); // User is logged out
    } else {
      switch (response.status) {
        case 401:
          terror(data.message); // Unauthorized
          break;
        default:
          terror("An error occurred: " + data.message);
          break;
      }
    }
  }

  return (
    <div onClick={handleClick} className="dropdown-button">
      <LogoutOutlinedIcon />
      Logout
    </div>
  );
}
