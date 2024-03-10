import React from "react";

const FormInput = ({ placeholder, type, name, value, onChange }) => (
  <input
    type={type}
    name={name}
    defaultValue={value || ""}
    onChange={onChange}
    placeholder={placeholder}
  />
);

export default FormInput;
