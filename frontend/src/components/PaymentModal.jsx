import React from 'react';
import './Modal.css'; // Optional: for styling

const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-button">Close</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
