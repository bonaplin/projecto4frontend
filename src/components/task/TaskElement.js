import React from "react";
import "./TaskElement.css";

export function TaskElement(props) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 100:
        return "green";
      case 200:
        return "yellow";
      case 300:
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <div className="task">
      <div className="owner text">
        {props.owner.length > 12
          ? props.owner.substring(0, 12) + "..."
          : props.owner}
      </div>
      <div className="category text">
        {props.category.length > 12
          ? props.category.substring(0, 12) + "..."
          : props.category}
      </div>
      <div className="title">
        {props.title.length > 12
          ? props.title.substring(0, 12) + "..."
          : props.title}
      </div>
      <div className="priority">
        <div
          className="circle"
          style={{ backgroundColor: getPriorityColor(props.priority) }}
        ></div>
      </div>
    </div>
  );
}
