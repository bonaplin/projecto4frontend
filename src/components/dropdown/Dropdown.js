import React from "react";

const Dropdown = ({ data, onChange, type }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };
  return (
    <select onChange={handleChange} style={{ width: "100%" }}>
      <option value="" disabled selected>
        {type}
      </option>
      {data.map((item, index) => (
        <option key={index} value={item.value}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
