import React from 'react';

const SendMoneyModal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null; 
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closeModal}>Cancel Transaction</button>
        {children}
      </div>
    </div>
  );
};

export default SendMoneyModal;
