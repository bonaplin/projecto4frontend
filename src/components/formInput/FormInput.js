import React from "react";
import "./FormInput.css";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const FormInput = ({ placeholder, type, name, value, onChange }) => {
  const getIcon = (name) => {
    switch (name) {
      case "username":
        return (
          <Person2OutlinedIcon
            style={{ marginRight: "10px", marginLeft: "10px" }}
          />
        );
      case "password":
        return <LockIcon style={{ marginRight: "10px", marginLeft: "10px" }} />;
      case "email":
        return (
          <EmailIcon style={{ marginRight: "10px", marginLeft: "10px" }} />
        );
      case "firstname":
        return (
          <BadgeIcon style={{ marginRight: "10px", marginLeft: "10px" }} />
        );
      case "lastname":
        return (
          <BadgeIcon style={{ marginRight: "10px", marginLeft: "10px" }} />
        );
      case "phone":
        return (
          <ContactPhoneIcon
            style={{ marginRight: "10px", marginLeft: "10px" }}
          />
        );
      case "photoURL":
        return (
          <AddAPhotoIcon style={{ marginRight: "10px", marginLeft: "10px" }} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="form-input">
      {getIcon(name)}
      <input
        type={type}
        name={name}
        defaultValue={value || ""}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};
export default FormInput;
