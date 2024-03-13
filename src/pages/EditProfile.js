import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { userStore } from "../stores/UserStore";
import Layout from "../components/layout/Layout";
import FormInput from "../components/formInput/FormInput";
import "./EditProfile.css";
import Header from "../components/header/Header";
import SaveButton from "../components/dropdown/buttons/SaveButton";

function EditProfile() {
  const location = useLocation();
  const userDetails = location.state ? location.state.userDetails : null;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    photoURL: "",
    // Add more fields as needed
  });

  // Fetch the user's current details when the component mounts
  useEffect(() => {
    const userDetails = userStore.getState(); // Replace this with the actual method to get the user's details
    setInputs(userDetails);
  }, []);

  const handleChange = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <Header />
      <Layout>
        <div className="edit-profile-outer-container">
          <div className="edit-profile-page-wrap">
            <div className="header-profile">
              <h1>Edit Profile</h1>
              <img
                src={userDetails.photoURL}
                alt="Profile"
                className="edit-profile-img"
              />{" "}
            </div>
            <form>
              {userDetails.role === "po" && (
                <select
                  name="role"
                  value={inputs.role}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="po">Product Owner</option>
                  <option value="sm">Scrum Master</option>
                  <option value="dev">Developer</option>
                </select>
              )}
              <FormInput
                placeholder={userDetails.email}
                type="email"
                name="email"
                value={inputs.email}
                onChange={handleChange}
              />
              <FormInput
                placeholder={userDetails.firstname}
                type="text"
                name="firstname"
                value={inputs.firstname}
                onChange={handleChange}
              />
              <FormInput
                placeholder={userDetails.lastname}
                type="text"
                name="lastname"
                value={inputs.lastname}
                onChange={handleChange}
              />
              <FormInput
                placeholder={userDetails.phone}
                type="tel"
                name="phone"
                value={inputs.phone}
                onChange={handleChange}
              />
              <FormInput
                placeholder={userDetails.photoURL}
                type="url"
                name="photoURL"
                value={inputs.photoURL}
                onChange={handleChange}
              />

              <div className="button-group">
                <button> Change Password </button>
                <SaveButton inputs={inputs} />
                <input
                  type="button"
                  value="Cancel"
                  onClick={() => navigate("/profile")}
                />
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default EditProfile;
