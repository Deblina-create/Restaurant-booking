import { getMaxListeners } from "process";
import { useState } from "react";
import { getCombinedModifierFlags } from "typescript";
import "../Admin.css";

// import { Link } from "react-router-dom";
export const AdmingPage = () => {
  let defaultValue = [
    { id: 1, BookingTime: "18:00", NoOfPeople: 2, Name: "Stina" },
    { id: 2, BookingTime: "18:00", NoOfPeople: 4, Name: "Per" },
    { id: 3, BookingTime: "18:00", NoOfPeople: 3, Name: "Sara" },
    { id: 4, BookingTime: "18:00", NoOfPeople: 6, Name: "Nils" },
  ];
  const [bookings, setBookings] = useState(defaultValue);
  let liTag = bookings.map((booking) => {
    return (
      <li className="booking-list">
        <span>{booking.BookingTime}</span>
        <span>{booking.NoOfPeople}</span>
        <span>{booking.Name}</span>
      </li>
    );
  });
  return (
    <div className="admin-page">
      <div className="back">
        {/* <Link to={"/"}><i></i> Admin</Link> */}
        <a href="/">
          <span>Admin</span>
        </a>
      </div>
      <div>
          <h2>date</h2>
      </div>
      <div>
        <p className="add">add</p>
        <ul>{liTag}</ul>
      </div>
    </div>
  );
};
