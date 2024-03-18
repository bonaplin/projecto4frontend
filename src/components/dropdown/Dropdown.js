import React from "react";

const Dropdown = ({ data }) => {
  return (
    <select>
      {data.map((value, index) => (
        <option key={index} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
