import { useState } from "react";
import "../Admin.css";
import { Modal } from "../modals/EditModal";

// import { Link } from "react-router-dom";

export const AdmingPage = () => {
  let defaultValue = [
    { id: 1, BookingTime: "18:00", NoOfPeople: 2, Name: "Stina" },
    { id: 2, BookingTime: "18:00", NoOfPeople: 4, Name: "Per" },
    { id: 3, BookingTime: "18:00", NoOfPeople: 3, Name: "Sara" },
    { id: 4, BookingTime: "18:00", NoOfPeople: 6, Name: "Nils" },
  ];

  let dateNow = new Date().toDateString();

  const [bookings, setBookings] = useState(defaultValue);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(dateNow);

  let totalNoOfPeople = bookings.reduce((acc, curr) => acc + curr.NoOfPeople, 0);

  let liTag = bookings.map((booking) => {
    return (
      <li className="booking-list">
        <span>{booking.BookingTime}</span>
        <span>{booking.NoOfPeople}</span>
        <span>{booking.Name}</span>

        <button onClick={() => setShow(true)}>edit</button>
        <button>delete</button>
      </li>
    );
  });

  return (
    <div className="admin-page">
      <div className="back">
        {/* <Link to={"/"}><i></i> Admin</Link> */}
        <a href="/">
          <span><i className="fas fa-chevron-left"></i></span><span>Admin</span>
        </a>
      </div>
      <div>
        <h2>{date}</h2>
      </div>
      <p className="total">Total:  {bookings.length} bookings and {totalNoOfPeople} people</p>
      <div>
        <p className="add">add</p>
        <ul>{liTag}</ul>
      </div>
      <Modal onClose={() => setShow(false)} show={show} />
    </div>
  );
};
