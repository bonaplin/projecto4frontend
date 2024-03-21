import React from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

function View({ onClick }) {
  return (
    <button className="tasks-button" onClick={onClick}>
      <VisibilityOutlinedIcon />
    </button>
  );
}

export default View;
