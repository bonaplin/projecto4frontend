import React from "react";
import EditIcon from "@mui/icons-material/Edit";

const Edit = ({ onClick }) => (
  <button className="icon-edit tasks-button" onClick={onClick}>
    <EditIcon />
  </button>
);

export default Edit;
