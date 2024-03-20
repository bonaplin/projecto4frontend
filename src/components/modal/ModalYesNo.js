import React from "react";
import Modal from "./Modal";

function ModalYesNo({ open, onClose, title, message, onYes, onNo }) {
  return (
    <Modal open={open} onClose={onClose} title={title} center>
      <p>{message}</p>
      <div className="button-container">
        <button onClick={onYes}>Yes</button>
        <button onClick={onNo}>No</button>
      </div>
    </Modal>
  );
}
export default ModalYesNo;
