import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Admin.css";
import restaurantApi from "../api/restaurantApi";
import { AddModal } from "../modals/AddModal";
import { DeleteModal } from "../modals/DeleteModal";
import { EditModal } from "../modals/EditModal";
import Booking from "../models/Booking";

// import { Link } from "react-router-dom";

interface SearchRequest {
  BookingDate: Date;
}

export const AdminPage = () => {

    let dateNow = new Date().toDateString();

    const [bookings, setBookings] = useState([] as Booking[]);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [date, setDate] = useState(dateNow);

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


    const fetchData = async () => {
      console.log("bookings from DB");
      const response = await restaurantApi.post<Booking[]>("/admin_search", {
        data: date,
      });
      // console.log("Response is ", response.data.map(b => b.BookingTime));
      
      setBookings(response.data as Booking[]);
    };

    useEffect(() => {
      console.log("AdminPage.useEffect called");
      
      fetchData();
      // console.log(bookings);
    }, [date]);

    let liTag = bookings.map((booking) => {
      return (
        <li key={booking.id} className="booking-list">
          <span>{dateStringToTime(booking.BookingTime)}</span>
          <span><i className="fas fa-user-friends guest"></i>{booking.NoOfPeople}</span>
          <span>{booking.Name}</span>
          <button onClick={() => setShowEdit(true)} className="edit-icon">
            <i className="fas fa-pen"></i>
          </button>
          <button onClick={() => setShowDelete(true)} className="delete-icon">
            <i className="fas fa-trash-alt"></i>
          </button>
        </li>
      );
    });
    return (
      <div className="admin-page">
        <div className="back">
          <Link to={"/"}><i className="fas fa-chevron-left"></i> Admin</Link>
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
            <button onClick={() => setDate(nextDate)} className="increase">
              <i className="fas fa-chevron-right"></i>
            </button>
          </h2>
        </div>
        <p className="total">
          Total: {bookings.length} bookings and {totalNoOfPeople} people
        </p>
        <div className="add">
          <button onClick={() => setShowAdd(true)} className="add-icon">
            <i className="fas fa-plus"></i>
          </button>
        </div>
        <div>
          <ul>{liTag}</ul>
        </div>
        <AddModal onClose={() => setShowAdd(false)} show={showAdd} />
        <EditModal onClose={() => setShowEdit(false)} show={showEdit} />
        <DeleteModal onClose={() => setShowDelete(false)} show={showDelete} />
      </div>
    );

    function dateStringToTime(datestr:string) {
      let date = new Date(datestr);
      return date.toLocaleTimeString("sv-SE", { timeStyle: "short" });
    }
};
