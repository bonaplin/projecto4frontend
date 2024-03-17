import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "./Task.css";

export default function Task({ task, index }) {
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
    <Draggable draggableId={`${task.id}`} key={`${task.id}`} index={index}>
      {(provided, snapshot) => (
        <div
          className={`task ${snapshot.isDragging ? "dragging" : ""}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="owner text">
            {task.owner.length > 12
              ? task.owner.substring(0, 12) + "..."
              : task.owner}
          </div>
          <div className="category text">
            {task.category.length > 12
              ? task.category.substring(0, 12) + "..."
              : task.category}
          </div>
          <div className="title">
            {task.title.length > 12
              ? task.title.substring(0, 12) + "..."
              : task.title}
          </div>
          <div className="priority">
            <div
              className="circle"
              style={{ backgroundColor: getPriorityColor(task.priority) }}
            ></div>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
}
