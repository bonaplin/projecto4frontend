import React from "react";

const UserRow = ({
  item,
  columns,
  handleEdit,
  handleDelete,
  handleDeleteTasks,
  handleActiveChange,
}) => {
  // Define the keys in the order you want them to be displayed

  return (
    <tr>
      {columns.map((column) => (
        <td key={column}>
          {column === "photoURL" ? (
            <img
              src={item[column]}
              alt="User"
              style={{ width: "50px", height: "50px" }}
            />
          ) : column === "active" ? (
            <input
              type="checkbox"
              className="my-checkbox"
              checked={item[column]}
              onChange={() => handleActiveChange(item)}
            />
          ) : column === "actions" ? (
            <>
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item)}>Delete</button>
              <button onClick={() => handleDeleteTasks(item)}>DTasks</button>
            </>
          ) : (
            item[column]
          )}
        </td>
      ))}
    </tr>
  );
};

export default UserRow;
