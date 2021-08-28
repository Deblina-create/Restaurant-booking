import React from "react";
import restaurantApi from "../api/restaurantApi";
import Booking from "../models/Booking";
import ErrorResponse from "../models/ErrorResponse";
import "./css/Modal.css";

interface ModalProps {
  onClose: () => void;
  show: boolean;
  bookingInfo: any;
}
export const EditModal: React.FC<ModalProps> = ({ onClose, show, bookingInfo }) => {
  if (!show) {
    return null;
  }

  const editBooking = async () => {
    console.log(bookingInfo);
    await restaurantApi.put<Booking | ErrorResponse>("/booking", {
      data: bookingInfo
    }) 
    onClose();
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">Booking detail</h3>
        </div>
        <div className="modal-body">
          <input type="text" placeholder="Date" defaultValue={bookingInfo.BookingTime}/>
          <input type="text" placeholder="Time" />
          <input type="text" placeholder="Number of people" defaultValue={bookingInfo.NoOfPeople} />
          <input type="text" placeholder="Name" defaultValue={bookingInfo.Name}/>
          <input type="text" placeholder="Mobile number" defaultValue={bookingInfo.Phone} />
          <input type="text" placeholder="Email"defaultValue={bookingInfo.Email} />
          <input type="text" placeholder="Preference" defaultValue={bookingInfo.Preference}/>
        </div>
        <div className="modal-footer">
          <button onClick={editBooking} className="full-btn">
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
