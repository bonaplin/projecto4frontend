import React from "react";
import "./Table.css"; // Importing the CSS
import UserRow from "../table/rowelement/UserRow"; // Import the UserRow component

const Table = ({
  data,
  columns,
  handleEdit,
  handleDelete,
  handleDeleteTasks,
  handleActiveChange,
}) => {
  // If data is not empty, get the columns from the first object

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
            <UserRow
              key={index}
              item={item}
              columns={columns}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleDeleteTasks={handleDeleteTasks}
              handleActiveChange={handleActiveChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
