import React from "react";
import { useState, useEffect } from "react";
import Modal from "./Modal";

function ModalYesNo({ open, onClose, title, message, onYes, onNo }) {
  return (
    <Modal open={open} onClose={onClose} center>
      <h2>{title}</h2>
      <p>{message}</p>
      <div>
        <button onClick={onYes}>Yes</button>
        <button onClick={onNo}>No</button>
      </div>
    </Modal>
  );
}
export default ModalYesNo;
