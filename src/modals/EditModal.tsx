import React, { useEffect, useState } from "react";
import { setTokenSourceMapRange } from "typescript";
import restaurantApi from "../api/restaurantApi";
import Booking from "../models/Booking";
import ErrorResponse from "../models/ErrorResponse";
import "./css/Modal.css";

interface ModalProps {
  onClose: () => void;
  show: boolean;
  bookingInfo?: Booking;
}

const initialBookingInfo: Booking = {
  BookingTime: "",
  NoOfPeople: 0,
  Email: "",
  Preferences: "",
  Name: "",
  Phone: "",
  BookedTableCount: 0
}

export const EditModal: React.FC<ModalProps> = ({ onClose, show, bookingInfo }) => {
  // const [editBookingInfo, setEditBookingInfo] = useState(initialBookingInfo);
  // const [name, setName] = useState(bookingInfo?.Name);

  if (!show) {
    return null;
  }

  let date = new Date(bookingInfo!.BookingTime);

  
//   const nameChanged = (e:any)=>{
//     setEditBookingInfo({...editBookingInfo, Name: e.target.value.toString()});
//   }

//   const phoneChanged = (e:any)=>{
//     setEditBookingInfo({...editBookingInfo, Phone: e.target.value.toString()});
// }

// const emailChanged = (e:any)=>{
//     setEditBookingInfo({...editBookingInfo, Email: e.target.value.toString()});
// }


  const editBooking = async () => {

    console.log(bookingInfo);
    await restaurantApi.put<Booking | ErrorResponse>("/booking", {
      data: bookingInfo,
    });
    onClose();
  };
 
  // let data = bookingInfo!.BookingTime.split(" ");
  // let date = data[0] + " " + data[1] + " " + data[2] + " " + data[3];
  // let time = data[4];


  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">Booking detail</h3>
        </div>
        <div className="modal-body">
          <input type="date" placeholder="Date" defaultValue={date.toLocaleDateString()} />
          <input type="text" defaultValue={date.toLocaleTimeString("sv-SE", { timeStyle: "short" })} />
          <input
            type="number"
            placeholder="Number of people"
            defaultValue={bookingInfo?.NoOfPeople} 
          />
          <input
            type="text"
            placeholder="Name"
            defaultValue={bookingInfo?.Name}
            onChange={e => bookingInfo!.Name = e.target.value}
          />
          <input
            type="text"
            placeholder="Mobile number"
            defaultValue={bookingInfo?.Phone}
          />
          <input
            type="text"
            placeholder="Email"
            defaultValue={bookingInfo?.Email}
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
};
