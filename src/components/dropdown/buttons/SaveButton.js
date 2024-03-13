import { userStore } from "../../../stores/UserStore.js";
import { useNavigate } from "react-router-dom";

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
    }
  }

  return <button onClick={handleClick}>Save</button>;
}
