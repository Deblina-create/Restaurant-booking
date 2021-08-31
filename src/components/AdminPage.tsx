import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Admin.css";
import restaurantApi from "../api/restaurantApi";
// import { AddModal } from "../modals/AddModal";
import { DeleteModal } from "../modals/DeleteModal";
import { EditModal } from "../modals/EditModal";
import Booking from "../models/Booking";
import { useHistory } from "react-router-dom";

export const AdminPage = () => {

    let dateNow = new Date().toDateString();

    const [bookings, setBookings] = useState([] as Booking[]);
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
      history.push("/edit/" + `${booking.id}`)
    }

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

    const history = useHistory();

    const routeChange = () => {
      history.push("/search");
    };

    let liTag = bookings.map((booking) => {
      return (
        <div key={booking.id} className="booking-list">
          <div>{dateStringToTime(booking.BookingTime)}</div>
          <div><i className="fas fa-user-friends guest"></i>{booking.NoOfPeople}</div>
          <div>{booking.Name}</div>
          <div className="buttons">
          <button onClick={() => getEditForm(booking)} className="edit-icon">
            <i className="fas fa-pen"></i>
          </button>
          <button onClick={() => setDeleteBookingId(booking.id)} className="delete-icon">
            <i className="fas fa-trash-alt"></i>
          </button>
          </div>
        </div>
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
          <button onClick={routeChange} className="add-icon">
            <i className="fas fa-plus"></i>
          </button>
        </div>
        <div>
          {liTag}
        </div>
        {/* <AddModal onClose={() => setShowAddModal(false)} show={showAddModal} /> */}
        <EditModal onClose={onEditDone} show={selectedBooking? true: false} bookingInfo={selectedBooking}/>
        <DeleteModal onClose={onDeleteDone} show={deleteBookingId ? true : false} bookingId={deleteBookingId!}/>
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

    function dateStringToTime(datestr:string) {
      let date = new Date(datestr);
      return date.toLocaleTimeString("sv-SE", { timeStyle: "short" });
    }
};
