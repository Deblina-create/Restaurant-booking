import { useState } from "react";
import "../Admin.css";
import { DeleteModal } from "../modals/DeleteModal";
import { EditModal } from "../modals/EditModal";

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
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [date, setDate] = useState(dateNow);

  let currentDate = new Date(date);
  let numberOfMlSeconds = currentDate.getTime();
  let dayToMlSeconds = 24 * 60 * 60 * 1000;
  let previousDate = new Date(numberOfMlSeconds - dayToMlSeconds).toDateString();
  let nextDate = new Date(numberOfMlSeconds + dayToMlSeconds).toDateString();

  let totalNoOfPeople = bookings.reduce(
    (acc, curr) => acc + curr.NoOfPeople,
    0
  );

  let liTag = bookings.map((booking) => {
    return (
      <li key={booking.id} className="booking-list">
        <span>{booking.BookingTime}</span>
        <span>{booking.NoOfPeople}</span>
        <span>{booking.Name}</span>
        <button onClick={() => setShowEdit(true)} className="edit-icon">
          <i className="fas fa-pen"></i>
        </button>
        <button onClick={() => setShowDelete(true)} className="remove-icon">
          <i className="fas fa-trash-alt"></i>
        </button>
      </li>
    );
  });

  return (
    <div className="admin-page">
      <div className="back">
        {/* <Link to={"/"}><i></i> Admin</Link> */}
        <a href="/">
          <span>
            <i className="fas fa-chevron-left"></i>
          </span>
          <span> Admin</span>
        </a>
      </div>
      <div>
        <h2>
          {date}
          {date === dateNow? <span>(Today)</span> : ""} 
          <button onClick={() => setDate(previousDate)}>  
            <i className="fas fa-chevron-left"></i>
          </button>
          <button onClick={() => setDate(nextDate)}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </h2>
      </div>
      <p className="total">
        Total: {bookings.length} bookings and {totalNoOfPeople} people
      </p>
      <div className="add">
        <button className="add-icon">
          <i className="fas fa-plus"></i>
          <span> add</span>
        </button>
      </div>
      <div>
        <ul>{liTag}</ul>
      </div>
      <EditModal onClose={() => setShowEdit(false)} show={showEdit} />
      <DeleteModal onClose={() => setShowDelete(false)} show={showDelete} />
    </div>
  );
};
