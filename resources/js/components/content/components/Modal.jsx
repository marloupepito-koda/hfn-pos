import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" style={{ zIndex: 1 }}>
            <div className="modal-content  bg-white">
                <button className="modal-close-button" onClick={onClose}>
                    Close
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
