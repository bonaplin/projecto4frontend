import React from "react";
import "./TaskElement.css";

export function TaskElement(props) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "100":
        return "green";
      case "200":
        return "yellow";
      case "300":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <div className="task">
      <div className="owner text">{props.owner}</div>
      <div className="category text">{props.category}</div>
      <div className="">{props.title}</div>
      <div className="priority">
        <div
          className="circle"
          style={{ backgroundColor: getPriorityColor(props.priority) }}
        ></div>
      </div>
    </div>
  );
}
