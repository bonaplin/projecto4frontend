import React from "react";

const Modal = ({ open, onClose, children, title }) => {
  if (!open) return null;

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(5px)",
          zIndex: "1",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#FFF",
          padding: "50px",
          zIndex: "2",
          borderRadius: "10px",
          border: "1px solid #000",
        }}
      >
        <h2
          style={{
            margin: "0 0 20px 0",
            textAlign: "center",
            fontSize: "1.2em",
          }}
        >
          Change Password
        </h2>
        {children}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "transparent",
            border: "none",
            fontSize: "1.5em",
          }}
        >
          &times;
        </button>
      </div>
    </>
  );
};

export default Modal;
