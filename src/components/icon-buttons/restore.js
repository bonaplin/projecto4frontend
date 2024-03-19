import React from "react";
import RestoreIcon from "@mui/icons-material/Restore";

const Restore = ({ onClick }) => (
  <button className="icon-restore tasks-button" onClick={onClick}>
    <RestoreIcon />
  </button>
);

export default Restore;
