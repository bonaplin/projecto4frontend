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
    resetForm();
  };

  const resetForm = () => {
    setRole("");
    setUsername("");
    setPassword("");
    setEmail("");
    setFirstname("");
    setLastname("");
    setPhone("");
    setPhotoURL("");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={title}>
      {title === "Delete User" || title === "Delete User Tasks" ? (
        <form onSubmit={handleSubmit}>
          <div className="delete-modal-headers">
            {title === "Delete User" ? (
              <p>Are you sure you want to delete this user?</p>
            ) : (
              <p>Are you sure you want to delete this user's tasks?</p>
            )}
            <img src={user.photoURL} />
          </div>
          <button type="submit">Yes</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <img src={photoURL} alt="User" />
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

            {title === "Create User" && (
              <>
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
              </>
            )}
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
              type="tel"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <FormInput
              placeholder="Enter photo URL"
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
        </>
      )}
    </Modal>
  );
};

export default UserModal;
