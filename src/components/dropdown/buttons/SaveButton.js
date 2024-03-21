import { userStore } from "../../../stores/UserStore.js";
import { useNavigate } from "react-router-dom";
import { tsuccess, twarn, terror } from "../../messages/Message";

export default function SaveButton({ inputs }) {
  const navigate = useNavigate();

  async function handleClick() {
    console.log("SaveButton click");

    // Get the token from the userStore
    const token = userStore.getState().token;
    // Get the selected user from the userStore
    const selectedUser = userStore.getState().username;
    // Make a request to the save endpoint
    const response = await fetch(
      "http://localhost:8080/demo-1.0-SNAPSHOT/rest/user/update",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Use the token in the Authorization header
          token: token,
          selectedUser: selectedUser,
        },
        body: JSON.stringify(inputs), // Send the inputs as the request body
      }
    );

    const data = await response.json();

    // Check if the request was successful
    if (response.ok) {
      // Update the userStore
      await userStore.getState().updateUsername(inputs.username);
      await userStore.getState().updateToken(inputs.token);
      await userStore.getState().updateRole(inputs.role);
      await userStore.getState().updateFirstname(inputs.firstname);
      await userStore.getState().updateLastname(inputs.lastname);
      // Navigate to another page if needed
      navigate("/home");
      tsuccess(data.message); // User is updated
    } else {
      switch (response.status) {
        case 400:
          twarn(data.message); // Invalid email format, Invalid phone number format, Invalid URL format
          break;
        case 401:
          terror(data.message); // Unauthorized
          break;
        case 409:
          twarn(data.message); // Email already exists
          break;
        default:
          terror("An error occurred: " + data.message);
          break;
      }
    }
  }

  return <button onClick={handleClick}>Save</button>;
}
