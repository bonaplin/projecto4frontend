import React from "react";

const RowElement = ({ item, columns }) => {
  return (
    <tr>
      {columns.map((column, index) => (
        <td key={index}>{item[column]}</td>
      ))}
      <td>
        <button>Edit</button>
        <button>Delete</button>
      </td>
    </tr>
  );
};

export default RowElement;
