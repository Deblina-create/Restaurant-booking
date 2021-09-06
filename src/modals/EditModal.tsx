import React, { useEffect, useState } from "react";
import restaurantApi from "../api/restaurantApi";
import Booking from "../models/Booking";
import ErrorResponse from "../models/ErrorResponse";
import "./css/modal.css";

interface ModalProps {
  onClose: () => void;
  show: boolean;
  bookingInfo?: Booking;
}

export const EditModal: React.FC<ModalProps> = ({
  onClose,
  show,
  bookingInfo,
}) => {
  if (!show) {
    return null;
  }

  let date = new Date(bookingInfo!.BookingTime);
  let bookedDate = date.toISOString().split("T")[0];
  let bookedTime = date.toLocaleTimeString("sv-SE", { timeStyle: "short" });

  const editBooking = async () => {
    bookingTime();
    console.log(bookingInfo);
    await restaurantApi.put<Booking | ErrorResponse>("/booking", {
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
          <input
            type="date"
            placeholder="Date"
            defaultValue={bookedDate}
            onChange={(e) => (bookedDate = e.target.value)}
          />
          <div className="radio">
            <div className="radio-btn">
              <input
                id="time18"
                type="radio"
                value={"18:00"}
                name="time"
                onChange={(e) => {
                  bookedTime = e.target.value;
                }}
                defaultChecked={bookedTime === "18:00"}
              />
              <label htmlFor="time18">18:00</label>
            </div>
            <div className="radio-btn">
              <input
                id="time21"
                type="radio"
                value={"21:00"}
                name="time"
                onChange={(e) => {
                  bookedTime = e.target.value;
                }}
                defaultChecked={bookedTime === "21:00"}
              />
              <label htmlFor="time21">21:00</label>
            </div>
          </div>
          <input
            type="number"
            placeholder="Number of people"
            defaultValue={bookingInfo?.NoOfPeople}
            onChange={(e) =>
              (bookingInfo!.NoOfPeople = Number.parseInt(
                e.target.value.toString()
              ))
            }
          />
          <input
            type="text"
            placeholder="Name"
            defaultValue={bookingInfo?.Name}
            onChange={(e) => (bookingInfo!.Name = e.target.value)}
          />
          <input
            type="text"
            placeholder="Mobile number"
            defaultValue={bookingInfo?.Phone}
            onChange={(e) => (bookingInfo!.Phone = e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            defaultValue={bookingInfo?.Email}
            onChange={(e) => (bookingInfo!.Email = e.target.value)}
          />
          {/* <input
            type="text"
            placeholder="Preference"
            defaultValue={bookingInfo.Preference}
          /> */}
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
  function bookingTime() {
    const dt = new Date(bookedDate.toString());
    let bookingTimeText = "";
    if (bookedTime === "18:00") {
      bookingTimeText = new Date(new Date(dt).setHours(18, 0, 0, 0)).toString();
    } else if (bookedTime === "21:00") {
      bookingTimeText = new Date(new Date(dt).setHours(21, 0, 0, 0)).toString();
    }
    bookingInfo!.BookingTime = bookingTimeText;
  }
};
