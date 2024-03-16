import React from "react";
import "./Table.css"; // Importing the CSS
import UserRow from "../table/rowelement/UserRow"; // Import the UserRow component
import Row from "./rowelement/Row"; // Import the DeletedTasksRow component
const Table = ({
  data,
  columns,
  handleEdit,
  handleDelete,
  handleDeleteTasks,
  handleActiveChange,
  type,
}) => {
  // If data is not empty, get the columns from the first object

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>
                {column === "actions-category"
                  ? "Actions"
                  : column.charAt(0).toUpperCase() + column.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) =>
            type === "user" ? (
              <UserRow
                key={index}
                item={item}
                columns={columns}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleDeleteTasks={handleDeleteTasks}
                handleActiveChange={handleActiveChange}
              />
            ) : (
              <Row
                type={type}
                key={index}
                item={item}
                columns={columns}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
