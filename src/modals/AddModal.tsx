import React, { useEffect, useState } from "react";
import restaurantApi from "../api/restaurantApi";
import Booking from "../models/Booking";
import ErrorResponse from "../models/ErrorResponse";
import "./css/Modal.css";

interface ModalProps {
  onClose: () => void;
  show: boolean;
}

const initialhBookingInfo: Booking = {
  BookingTime: "",
  NoOfPeople: 0,
  Email: "",
  Preferences: "",
  Name: "",
  Phone: "",
  BookedTableCount: 0,
};

export const AddModal: React.FC<ModalProps> = ({ onClose, show }) => {

  const [selectedTime, setSelectedTime] = useState("18:00");
  const [bookingInfo, setBookingInfo] = useState(initialhBookingInfo);

  if (!show) {
    return null;
  }
  const dateChange = (e: any) => {
    setBookingInfo({ ...bookingInfo, BookingTime: e.target.value.toString() });
  };

  const noOfPeopleChanged = (e: any) => {
    setBookingInfo({ ...bookingInfo, NoOfPeople: e.target.value});
  };

  const nameChanged = (e: any) => {
    setBookingInfo({ ...bookingInfo, Name: e.target.value.toString() });
  };

  const phoneChanged = (e: any) => {
    setBookingInfo({ ...bookingInfo, Phone: e.target.value.toString() });
  };

  const emailChanged = (e: any) => {
    setBookingInfo({ ...bookingInfo, Email: e.target.value.toString() });
  };

  const saveBookingInfo = async (e: any) => {
    let bookDate = new Date(bookingInfo.BookingTime);
    if (selectedTime == "18:00") {
      bookDate.setHours(18, 0, 0, 0);
    } else if (selectedTime == "21:00") {
      bookDate.setHours(21, 0, 0, 0);
    }
    bookingInfo.BookingTime = bookDate.toString();

    await restaurantApi.post<string | ErrorResponse>("/booking", {
      data: bookingInfo,
    });
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">Booking detail</h3>
        </div>
        <div className="modal-body">
          <input type="date" onChange={dateChange} />
          <div className="radio">
            <input
              type="radio"
              name="slot"
              onClick={() => setSelectedTime("18:00")}
              className="radio-btn"
              defaultChecked
            />
            <label htmlFor="18:00">18:00</label>
            <input
              type="radio"
              name="slot"
              onClick={() => setSelectedTime("21:00")}
              className="radio-btn"
            />
            <label htmlFor="21:00">21:00</label>
          </div>
          <input
            type="number"
            placeholder="Number of people"
            onChange={noOfPeopleChanged}
          />
          <input type="text" placeholder="Name" onChange={nameChanged} />
          <input
            type="text"
            placeholder="Mobile number"
            onChange={phoneChanged}
          />
          <input type="email" placeholder="Email" onChange={emailChanged} />
          <input type="text" placeholder="Preference" />
        </div>
        <div className="modal-footer">
          <button onClick={saveBookingInfo} className="save-button">
            Add
          </button>
        </div>
        <button onClick={onClose} className="close-icon">
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};
