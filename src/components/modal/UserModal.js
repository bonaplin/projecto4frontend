import React, { useState } from "react";
import Modal from "./Modal";
import FormInput from "../formInput/FormInput";

const UserModal = ({ open, onClose, onSubmit, user = {} }) => {
  const [username, setUsername] = useState(user.username || "");
  const [password, setPassword] = useState(user.password || "");
  const [email, setEmail] = useState(user.email || "");
  const [firstname, setFirstname] = useState(user.firstname || "");
  const [lastname, setLastname] = useState(user.lastname || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [photoURL, setPhotoURL] = useState(user.photoURL || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      username,
      password,
      email,
      firstname,
      lastname,
      phone,
      photoURL,
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={user.id ? "Edit User" : "Create User"}
    >
      <form onSubmit={handleSubmit}>
        <FormInput
          placeholder="Enter username"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormInput
          placeholder="Enter password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormInput
          placeholder="Enter email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          placeholder="Enter first name"
          type="text"
          name="firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <FormInput
          placeholder="Enter last name"
          type="text"
          name="lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <FormInput
          placeholder="Enter phone number"
          type="text"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <FormInput
          placeholder="Enter photo URL"
          type="text"
          name="photoURL"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
        />

        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </Modal>
  );
};

export default UserModal;
