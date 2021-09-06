import { useEffect } from "react";
import restaurantApi from "../api/restaurantApi";
import Contact from "../models/Contact";
import ErrorResponse from "../models/ErrorResponse";
import "./css/modal.css";

interface ModalProps {
  onClose: () => void;
  show: boolean;
  contactId: string | undefined
}
export const ReadMoreModal: React.FC<ModalProps> = ({ onClose, show, contactId }) => {
  
  if (!show) {
    return null;
  }

  const readMoreMessage = async () => {
    let response = await restaurantApi.post<Contact | ErrorResponse>(`/contact/${contactId}`, {
        data: contactId
    });
    let contactDetail = response.data as Contact
    console.log(contactDetail)
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title">Meassage</h1>
        </div>
        <div className="modal-body">
          <p> Contact no.: {contactId}</p>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="empty-btn">
            Close
          </button>
        </div>
        <button onClick={onClose} className="close-icon">
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};
