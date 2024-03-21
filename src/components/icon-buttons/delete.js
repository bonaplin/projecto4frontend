import React from "react";
import DeleteIcon from "@mui/icons-material/DeleteOutline";

const Delete = ({ onClick }) => (
  <button className="icon-delete tasks-button" onClick={onClick}>
    <DeleteIcon />
  </button>
);

export default Delete;
