import React from "react";

const Dropdown = ({ data, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };
  return (
    <select onChange={handleChange}>
      {data.map((value, index) => (
        <option key={index} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
