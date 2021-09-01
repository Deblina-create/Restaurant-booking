import React from "react";
import "./css/Modal.css";

interface ModalProps {
  onClose: () => void;
  show: boolean;
}
export const MsgRecievedModal: React.FC<ModalProps> = ({ onClose, show }) => {
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
          <div>Your Message was recieved! Give us 6 hours to reply</div>
        </div>
        <div className="modal-footer">
        </div>
        <button onClick={onClose} className="close-icon">
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};
