// UserRow.js
import React from "react";

const UserRow = ({ item, handleEdit, handleDelete }) => {
  return (
    <tr>
      {Object.keys(item).map((key) => (
        <td key={key}>
          {key === "photoURL" ? (
            <img
              src={item[key]}
              alt="User"
              style={{ width: "50px", height: "50px" }}
            />
          ) : key === "active" ? (
            <input type="checkbox" checked={item[key]} disabled />
          ) : key === "actions" ? (
            <>
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item)}>Delete</button>
            </>
          ) : (
            item[key]
          )}
        </td>
      ))}
    </tr>
  );
};

export default UserRow;
