import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { userStore } from "../stores/UserStore";
import Layout from "../components/layout/Layout";
import FormInput from "../components/formInput/FormInput";
import "./EditProfile.css";
import Header from "../components/header/Header";
import "react-responsive-modal/styles.css";
// import { Modal } from "react-responsive-modal";
import Modal from "../components/modal/Modal";

function EditProfile() {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  // const location = useLocation();
  //const userDetails = userStore.getState().userDetails; // Adicione esta linha
  // console.log(JSON.stringify(userDetails) + "user details");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: userStore.getState().username,
    email: userStore.getState().email,
    firstname: userStore.getState().firstname,
    lastname: userStore.getState().lastname,
    phone: userStore.getState().phone,
    photoURL: userStore.getState().photoURL,
    role: userStore.getState().role,
  });

  console.log("inputs", JSON.stringify(inputs));
  const handleChange = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  /*Editar profile*/
  async function handleSubmit(event) {
    event.preventDefault();

    const token = userStore.getState().token; // Obtenha o token da store do Zustand
    const selectedUser = userStore.getState().username; // Obtenha o nome de usuário da store do Zustand

    console.log("inputs", JSON.stringify(inputs));
    const response = await fetch(
      "http://localhost:8080/demo-1.0-SNAPSHOT/rest/user/update",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token,
          selectedUser: selectedUser,
        },
        body: JSON.stringify(inputs), // Envie os inputs como o corpo da requisição
      }
    );
    if (response.ok) {
      // Se a resposta for bem-sucedida, atualize os detalhes do usuário na store do Zustand
      const data = await response.json();
    } else {
      // Trate o erro aqui
      console.error(
        "Erro ao atualizar o perfil do usuário:",
        response.statusText
      );
    }
    navigate("/home");
  }
  const handleChangePassword = () => {
    setIsChangingPassword(!isChangingPassword);
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    if (name === "oldPassword") {
      setOldPassword(value);
      console.log("oldPassword", value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "newPasswordAgain") {
      setNewPassword(value);
    }
  };
  const handleClickSavePassword = () => {
    if (oldPassword === newPassword) {
      return;
    }
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
                src={inputs.photoURL}
                alt="Profile"
                className="edit-profile-img"
              />{" "}
            </div>
            <form onSubmit={handleSubmit}>
              {inputs.role === "po" && (
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
                placeholder="Enter your photo URL"
                type="url"
                name="photoURL"
                value={inputs.photoURL}
                onChange={handleChange}
              />

              <div className="button-group">
                <input type="submit" value="Save" />
                <input
                  type="button"
                  value="Cancel"
                  onClick={() => navigate("/home")}
                />
              </div>
            </form>

            <button
              type="submit"
              value="Change Password"
              onClick={onOpenModal}
              style={{
                color: "blue",
                textDecoration: "underline",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Change Password
            </button>
            <Modal
              open={open}
              onClose={onCloseModal}
              center
              title="Change Password"
            >
              <FormInput
                placeholder="Enter your old password"
                type="password"
                name="password"
                value={oldPassword}
                onChange={handlePasswordChange}
              />
              <FormInput
                placeholder="Enter your new password"
                type="password"
                name="password"
                value={newPassword}
                onChange={handlePasswordChange}
              />

              <button
                type="submit"
                value="Change Password"
                onClick={handleClickSavePassword}
                className="login-page-wrap form input"
              >
                Save
              </button>
            </Modal>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default EditProfile;
