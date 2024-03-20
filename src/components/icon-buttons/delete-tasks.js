import React from "react";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";
const DeleteTasks = ({ onClick }) => (
  <button className="icon-delete-tasks tasks-button" onClick={onClick}>
    <RemoveShoppingCartOutlinedIcon />
  </button>
);

export default DeleteTasks;
