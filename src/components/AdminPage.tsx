import { useEffect, useState } from "react";
import "./Admin.css";
import restaurantApi from "../api/restaurantApi";
// import { AddModal } from "../modals/AddModal";
import { DeleteModal } from "../modals/DeleteModal";
import { EditModal } from "../modals/EditModal";
import Booking from "../models/Booking";
import { useHistory } from "react-router-dom";
import { convertTypeAcquisitionFromJson } from "typescript";
import Contact from "../models/Contact";

export const AdminPage = () => {
  let dateNow = new Date().toDateString();

  const [bookings, setBookings] = useState([] as Booking[]);
  const [contacts, setContacts] = useState([] as Contact[]);
  const [selectedBooking, setSelectedBooking] = useState<Booking>();
  // const [showAddModal, setShowAddModal] = useState(false);
  const [date, setDate] = useState(dateNow);
  const [deleteBookingId, setDeleteBookingId] = useState<string>();

  let currentDate = new Date(date);
  let numberOfMlSeconds = currentDate.getTime();
  let dayToMlSeconds = 24 * 60 * 60 * 1000;
  let previousDate = new Date(
    numberOfMlSeconds - dayToMlSeconds
  ).toDateString();
  let nextDate = new Date(numberOfMlSeconds + dayToMlSeconds).toDateString();

  let totalNoOfPeople = bookings.reduce(
    (acc, curr) => acc + curr.NoOfPeople,
    0
  );

  const getEditForm = (booking: Booking) => {
    history.push("/edit/" + `${booking.id}`);
  };

  const fetchData = async () => {
    console.log("### bookings from DB");
    const response = await restaurantApi.post<Booking[]>("/admin_search", {
      data: date,
    });
    const rs = await restaurantApi.post<Contact[]>("/contact_search", {
      data: contacts,
    });
    console.log("### Response is ", response);
    setBookings(response.data as Booking[]);
    setContacts(rs.data as Contact[]);
  };

  useEffect(() => {
    console.log("AdminPage.useEffect called");

    fetchData();
    console.log(bookings);
  }, [date]);

  const history = useHistory();

  const routeChange = () => {
    history.push("/search");
  };

  let divTag = bookings.map((booking) => {
    return (
      <div key={booking.id} className="booking-list" data-testid="booking">
        <div>{dateStringToTime(booking.BookingTime)}</div>
        <div>
          <i className="fas fa-user-friends guest"></i>
          {booking.NoOfPeople}
        </div>
        <div>{booking.Name}</div>
        <div className="buttons">
          <button onClick={() => getEditForm(booking)} className="edit-icon">
            <i className="fas fa-pen"></i>
          </button>
          <button
            onClick={() => setDeleteBookingId(booking.id)}
            className="delete-icon"
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    );
  });
  return (
    <div className="container">
      <div className="back">
        <a href={"/"} data-testid="admin">
          <i className="fas fa-chevron-left"></i> Admin
        </a>
      </div>
      <div>
        <h2>
          {date}
          {/* {date === dateNow? <span>(Today)</span> : ""} */}
          <button
            onClick={() => setDate(previousDate)}
            disabled={date === dateNow}
            className="decrease"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            onClick={() => setDate(nextDate)}
            className="increase"
            data-testid="increment"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </h2>
      </div>
      <p className="total">
        Total: {bookings.length} bookings and {totalNoOfPeople} people
        <a href="/message" className="notification">
          <span>
            <i className="fas fa-envelope envelope"></i>
          </span>
          {contacts.length === 0? <span className="badge">0</span> : 
          <span className="badge">{contacts.length}</span>
          }
        </a>
      </p>
      <div className="add">
        <button
          onClick={routeChange}
          className="add-icon"
          data-testid="add-btn"
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>
      <div>{divTag}</div>
      {/* <AddModal onClose={() => setShowAddModal(false)} show={showAddModal} /> */}
      <EditModal
        onClose={onEditDone}
        show={selectedBooking ? true : false}
        bookingInfo={selectedBooking}
      />
      <DeleteModal
        onClose={onDeleteDone}
        show={deleteBookingId ? true : false}
        bookingId={deleteBookingId!}
      />
    </div>
  );

  function onDeleteDone() {
    setDeleteBookingId(undefined);
    fetchData();
  }

  function onEditDone() {
    setSelectedBooking(undefined);
    fetchData();
  }

  function dateStringToTime(datestr: string) {
    let date = new Date(datestr);
    return date.toLocaleTimeString("sv-SE", { timeStyle: "short" });
  }
};
