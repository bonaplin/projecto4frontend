import React from "react";
import { useNavigate } from "react-router-dom";

export default function TasksButton() {
  function handleClick() {
    console.log("TasksButton click");
    navigate("/scrum-board");
  }
  const navigate = useNavigate();

  console.log("TasksButton");
  return <div onClick={handleClick}>Tasks</div>;
}
