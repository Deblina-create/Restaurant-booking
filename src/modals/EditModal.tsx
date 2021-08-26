import React from "react";
import "./css/Modal.css";

interface ModalProps {
  onClose: () => void;
  show: boolean;
}
export const EditModal: React.FC<ModalProps> = ({ onClose, show }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">Booking detail</h3>
        </div>
        <div className="modal-body">
          <input type="text" placeholder="Date" />
          <input type="text" placeholder="Time" />
          <input type="text" placeholder="Number of people" />
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Mobile number" />
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Preference" />
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="save-button">
            Save
          </button>
        </div>
        <button onClick={onClose} className="close-icon">
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};
