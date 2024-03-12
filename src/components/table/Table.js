import React from "react";
import "./Table.css"; // Importing the CSS

const Table = ({ data }) => {
  // If data is not empty, get the columns from the first object
  const columns = [
    "photoURL",
    "username",
    "firstname",
    "lastname",
    "email",
    "active",
    "actions",
  ];

  console.log("Table.js", data, columns);

  const handleEdit = (item) => {
    // Handle edit action here
    console.log("Edit", item);
  };

  const handleDelete = (item) => {
    // Handle delete action here
    console.log("Delete", item);
  };
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
                <td key={column}>
                  {column === "photoURL" ? (
                    <img
                      src={item[column]}
                      alt="User"
                      style={{ width: "50px", height: "50px" }}
                    />
                  ) : column === "active" ? (
                    <input type="checkbox" checked={item[column]} disabled />
                  ) : column === "actions" ? (
                    <>
                      <button onClick={() => handleEdit(item)}>Edit</button>
                      <button onClick={() => handleDelete(item)}>Delete</button>
                    </>
                  ) : (
                    item[column]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
