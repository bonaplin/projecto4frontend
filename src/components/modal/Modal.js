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
          backgroundColor: "rgba(0, 0, 0, 0.7)",
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
          maxidth: "50%",
        }}
      >
        <div className="header-profile">
          <h3
            className="long-text"
            style={{
              margin: "0 0 0.5rem 0",
              textAlign: "center",
              fontSize: "1.2em",
            }}
          >
            {title}
          </h3>
        </div>
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
