import React from "react";
// import "./Login.css";
import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import FormInput from "../components/formInput/FormInput";

import { userStore } from "../stores/UserStore";

function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  console.log(inputs);
  const updateName = userStore((state) => state.updateName);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send a POST request to the login endpoint
      const response = await fetch(
        "http://localhost:8080/demo-1.0-SNAPSHOT/rest/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            username: inputs.username,
            password: inputs.password,
          },
          //body: JSON.stringify(inputs), // inputs should contain the username and password
        }
      );

      console.log(inputs);
      if (!response.ok) {
        throw new Error("Login failed. Please try again.");
      }

      const data = await response.json();

      // Store the token in local storage
      localStorage.setItem("token", data.token);
      console.log("token" + data.token);

      // Continue with your existing code...
      updateName(inputs.username);
      navigate("/home", { replace: true });
    } catch (error) {
      console.log(error);
      // Optionally, we can set an error state variable to display the error message
    }
  };

  return (
    <div className="Login" id="profile-outer-container">
      <div className="page-wrap" id="login-page-wrap">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <FormInput
            placeholder="Enter your username"
            type="text"
            name="username"
            value={inputs.username}
            onChange={handleChange}
          />
          <FormInput
            placeholder="Enter your password"
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
          />
          <input type="submit" value="Login" />
        </form>
        <button onClick={() => navigate("/singup")}>Registo</button>
      </div>
    </div>
  );
}
export default Login;
