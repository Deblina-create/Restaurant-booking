import restaurantApi from "../api/restaurantApi";
import Booking from "../models/Booking";
import Contact from "../models/Contact";
import ErrorResponse from "../models/ErrorResponse";
import "./css/Modal.css";

interface ModalProps {
  onClose: () => void;
  show: boolean;
  contactId: string | undefined
}
export const ReadMoreModal: React.FC<ModalProps> = ({ onClose, show, contactId }) => {

  if (!show) {
    return null;
  }

  const ReadMoreMessage = async () => {
    await restaurantApi.post<Booking | ErrorResponse>(`/contact/${contactId}`, {
        data: contactId
    });
    onClose();
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
