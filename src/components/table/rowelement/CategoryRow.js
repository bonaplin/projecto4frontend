import React from "react";

const CategoryRow = ({ item, columns, handleEdit, handleDelete }) => {
  return (
    <tr>
      {columns.map((column) => (
        <td key={column}>
          {column === "actions" ? (
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
  );
};

export default CategoryRow;
