import React from "react";
import "./css/Modal.css";

interface ModalProps {
  onClose: () => void;
  show: boolean;
}
export const Modal: React.FC<ModalProps> = ({ onClose, show }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title"> Modal title</h4>
        </div>
        <div className="modal-body">Here is modal content</div>
        <div className="modal-footer">
          <button onClick={onClose} className="button">
            Save
          </button>
        </div>
        <button onClick={onClose} className="close-icon">
          X
        </button>
      </div>
    </div>
  );
};
