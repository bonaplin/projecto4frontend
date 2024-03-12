import React from "react";
import "./TaskColumn.css";
function TaskColumn({ children, title }) {
  return (
    <div className="task-column">
      <div className="title-column">
        <h3>{title}</h3>
      </div>
      <div className="container-tasks">{children}</div>
    </div>
  );
}

export default TaskColumn;
