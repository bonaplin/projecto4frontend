import React, { useState } from "react";
import Modal from "./Modal";
import FormInput from "../formInput/FormInput";

const UserModal = ({ open, onClose, onSubmit, title, user = {} }) => {
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);
  const [email, setEmail] = useState(user.email);
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [phone, setPhone] = useState(user.phone);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [role, setRole] = useState(user.role);

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
      role,
    });
  };

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit}>
        <select
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="form-input"
        >
          <option value="po">Product Owner</option>
          <option value="sm">Scrum Master</option>
          <option value="dev">Developer</option>
        </select>
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
          value={""}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          placeholder="Enter first name"
          type="text"
          name="firstname"
          value={""}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <FormInput
          placeholder="Enter last name"
          type="text"
          name="lastname"
          value={""}
          onChange={(e) => setLastname(e.target.value)}
        />
        <FormInput
          placeholder="Enter phone number"
          type="tel"
          name="phone"
          value={""}
          onChange={(e) => setPhone(e.target.value)}
        />
        <FormInput
          placeholder={photoURL}
          type="url"
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
