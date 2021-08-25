import "./css/Modal.css";

interface ModalProps {
  onClose: () => void;
  show: boolean;
}
export const DeleteModal: React.FC<ModalProps> = ({ onClose, show }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title">Delete reservation</h1>
        </div>
        <div className="modal-body">
          <h3>Delete selected reservation</h3>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="yes-button">
            Yes
          </button>
          <button onClick={onClose} className="no-button">
            No
          </button>
        </div>
        <button onClick={onClose} className="close-icon">
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};
