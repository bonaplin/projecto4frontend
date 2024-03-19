import React from "react";
import { userStore } from "../../../stores/UserStore.js";

const Row = ({ item, columns, handleEdit, handleDelete, type }) => {
  const role = userStore.getState().role; // Get the role from the store
  return (
    <tr>
      {columns.map((column) => (
        <td key={column}>
          {column === "actions" ? (
            <>
              {type === "category" && role !== "sm" && (
                <button onClick={() => handleEdit(item)}>Edit</button>
              )}
              {type === "deleted_tasks" && role === "sm" && (
                <button onClick={() => handleEdit(item)}>Restore</button>
              )}
              {role !== "sm" && (
                <button onClick={() => handleDelete(item)}>Delete</button>
              )}
            </>
          ) : (
            item[column]
          )}
        </td>
      ))}
    </tr>
  );
};

export default Row;
