import React from "react";
import "./Table.css"; // Importing the CSS

const Table = ({ data }) => {
  // If data is not empty, get the columns from the first object
  const columns = [
    "username",
    "firstname",
    "lastname",
    "email",
    "role",
    "actions",
  ];

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column}>{item[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
