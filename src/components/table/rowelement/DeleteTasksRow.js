import React from "react";

const DeleteTasksRow = ({ item, columns, handleEdit, handleDelete }) => {
  return (
    <tr>
      {columns.map((column) => (
        <td key={column}>
          {column === "actions" ? (
            <>
              <button onClick={() => handleEdit(item)}>Restore</button>
              <button onClick={() => handleDelete(item)}>Delete</button>
            </>
          ) : (
            item[column]
          )}
        </td>
      ))}
    </tr>
  );
};

export default DeleteTasksRow;
