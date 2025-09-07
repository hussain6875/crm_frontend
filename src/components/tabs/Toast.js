import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const SuccessToast = ({ message, setShowToast, showToast }) => {
  return (
    <div>
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          bg="success"
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Body className="text-white">{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default SuccessToast;
