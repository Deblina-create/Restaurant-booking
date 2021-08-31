import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import restaurantApi from "../api/restaurantApi";
import Booking from "../models/Booking";
import ErrorResponse from "../models/ErrorResponse";

type editParams = {
  id: string;
};

const initialBookingInfo: Booking = {
  BookingTime: "",
  NoOfPeople: 0,
  Email: "",
  Preferences: "",
  Name: "",
  Phone: "",
  BookedTableCount: 0,
};

export const EditForm = () => {
  const { id } = useParams<editParams>();

  const [bookingInfo, setBookingInfo] = useState(initialBookingInfo);
  const [bookedDate, setBookedDate] = useState("");
  const [bookedTime, setBookedTime] = useState("");

  const history = useHistory();

  const fetchData = async () => {
    const res = await restaurantApi.get<Booking | null>(`/booking/${id}`);
    let booking = res.data as Booking;
    setBookingInfo(booking);
    console.log(res.data);
    let date = new Date(booking.BookingTime);
    setBookedDate(date.toISOString().split("T")[0]);
    setBookedTime(date.toLocaleTimeString("sv-SE", { timeStyle: "short" }));
  };

  const saveData = async () => {
    bookingTime();
    console.log(bookingInfo);
    await restaurantApi.put<Booking | ErrorResponse>("/booking", {
      data: bookingInfo,
    });
    history.push('/admin');
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onNumberOfPeopleChange = (e: any) => {
    setBookingInfo({
      ...bookingInfo,
      NoOfPeople: Number.parseInt(e.target.value.toString()),
    });
  };

  const nameChanged = (e: any) => {
    const name = e.target.value.toString();
    setBookingInfo({ ...bookingInfo, Name: name });
  };

  const phoneChanged = (e: any) => {
    setBookingInfo({ ...bookingInfo, Phone: e.target.value.toString() });
  };

  const emailChanged = (e: any) => {
    const email = e.target.value.toString();
    setBookingInfo({ ...bookingInfo, Email: email });
  };

  return (
    <div className="admin-page">
      <div>
        <h3>Edit form</h3>
      </div>
      <div>
        <input 
        type="date" 
        defaultValue={bookedDate}
        onChange={(e) => setBookedDate(e.target.value)}
         />
        <div className="radio">
          <div className="radio-btn">
            <input
              id="time18"
              type="radio"
              value={"18:00"}
              name="time"
              defaultChecked={bookedTime === "18:00"}
              onChange={(e) => setBookedTime(e.target.value)}
            />
            <label htmlFor="time18">18:00</label>
          </div>
          <div className="radio-btn">
            <input
              id="time21"
              type="radio"
              value={"21:00"}
              name="time"
              defaultChecked={bookedTime === "21:00"}
              onChange={(e) => setBookedTime(e.target.value)}
            />
            <label htmlFor="time21">21:00</label>
          </div>
        </div>
        <input
          type="number"
          placeholder="Number of people"
          defaultValue={bookingInfo.NoOfPeople}
          onChange={onNumberOfPeopleChange}
        />
        <input
          type="text"
          placeholder="Name"
          defaultValue={bookingInfo.Name}
          onChange={nameChanged}
        />
        <input
          type="text"
          placeholder="Mobile number"
          defaultValue={bookingInfo.Phone}
          onChange={phoneChanged}
        />
        <input
          type="text"
          placeholder="Email"
          defaultValue={bookingInfo.Email}
          onChange={emailChanged}
        />
        {/* <input
            type="text"
            placeholder="Preference"
            defaultValue={bookingInfo.Preference}
          /> */}
      </div>
      <div className="modal-footer">
        <button onClick={saveData} className="full-btn">
          Save
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
    bookingInfo.BookingTime = bookingTimeText;
  }
};
