import React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/formInput/FormInput";
import Layout from "../components/layout/Layout";
import "../pages/Singup.css";
import { userStore } from "../stores/UserStore";

function Singup() {
  const navigate = useNavigate();
  const [imgURL, setImgURL] = useState("");
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    photoURL: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8080/demo-1.0-SNAPSHOT/rest/user/add", // "http://localhost:8080/my_activities_backend/rest/user/login
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputs), // inputs should contain the username and password}
        }
      );
      console.log(inputs);
      if (!response.ok) {
        throw new Error("Registo failed. Please try again.");
      } else if (response.ok) {
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <Layout>
      <div className="signup-outer-container">
        <div className="signup-page-wrap">
          <h1>Sign Up </h1>
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
            <FormInput
              placeholder="Enter your email address"
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
            />
            <FormInput
              placeholder="Enter your first name"
              type="text"
              name="firstname"
              value={inputs.firstname}
              onChange={handleChange}
            />
            <FormInput
              placeholder="Enter your last name"
              type="text"
              name="lastname"
              value={inputs.lastname}
              onChange={handleChange}
            />
            <FormInput
              placeholder="Enter your phone number"
              type="tel"
              name="phone"
              value={inputs.phone}
              onChange={handleChange}
            />
            <FormInput
              id="photoURL"
              placeholder="Enter your photo URL"
              type="url"
              name="photoURL"
              value={inputs.photoURL}
              onChange={(e) => {
                setImgURL(e.target.value);
                handleChange(e);
              }}
            />

            <div className="button-group">
              <input type="submit" value="Submit" />
              <input
                type="button"
                value="Login"
                onClick={() => navigate("/login")}
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Singup;
