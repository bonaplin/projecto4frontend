import React from "react";

const Row = ({ item, columns, handleEdit, handleDelete, type }) => {
  return (
    <tr>
      {columns.map((column) => (
        <td key={column}>
          {column === "actions" ? (
            <>
              {type === "category" ? (
                <button onClick={() => handleEdit(item)}>Edit</button>
              ) : (
                <button onClick={() => handleEdit(item)}>Restore</button>
              )}
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

export default Row;
