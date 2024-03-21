import React from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../../stores/UserStore"; // Import the store
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { tsuccess, terror, twarn } from "../../messages/Message";

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

    if (response.ok) {
      let userDetails = await response.json();
      console.log(userDetails); // Log the userDetails to the console
      navigate("/edit-profile", { state: { userDetails: userDetails } });
    } else {
      const data = await response.json();
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
  console.log("ProfileButton");
  return (
    <div onClick={handleClick} className="dropdown-button">
      <AccountCircleOutlinedIcon />
      Profile
    </div>
  );
}
