import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
  const [changeNoOfPeople, setChangeNoOfPeople] = useState(bookingInfo.NoOfPeople);
//   let date = new Date(bookingInfo.BookingTime);
//   let bookedDate = date.toISOString().split("T")[0];
//   const [changeDate, setChangeDate] = useState(bookedDate);
  const [changeName, setChangeName] = useState(bookingInfo.Name);
  const [changePhone, setChangePhone] = useState(bookingInfo.Phone);
  const [changeEmail, setChangeEmail] = useState(bookingInfo.Email);
//   let bookedTime = date.toLocaleTimeString("sv-SE", { timeStyle: "short" });
//   const [changeTime, setChangeTime] = useState(bookedTime);

   

  const fetchData = async () => {
    const res = await restaurantApi.get<Booking | null>(`/booking/${id}`);
    setBookingInfo(res.data as Booking);
    console.log(res.data);
  };

  const saveData = async () => {
    // bookingTime();
    console.log(bookingInfo);
    await restaurantApi.put<Booking | ErrorResponse>("/booking", {
      data: bookingInfo,
    });
  };

  useEffect(() => {
    fetchData();
    console.log(bookingInfo);
  }, []);

  return (
    
      <div className="admin-page">
        <div>
          <h3>Booking detail</h3>
        </div>
        <div>
          <input
            type="text"
            // defaultValue={changeDate}
            // onChange={(e) => (setChangeDate(e.target.value))}
          />
          {/* <div className="radio">
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
          </div> */}
          <input
            type="number"
            placeholder="Number of people"
            defaultValue={changeNoOfPeople}
            onChange={(e) =>
              (setChangeNoOfPeople(Number.parseInt(
                e.target.value.toString())
              ))
            }
          />
          <input
            type="text"
            placeholder="Name"
            defaultValue={changeName}
            onChange={(e) => (setChangeName(e.target.value))}
          />
          <input
            type="text"
            placeholder="Mobile number"
            defaultValue={changePhone}
            onChange={(e) => (setChangePhone(e.target.value))}
          />
          <input
            type="text"
            placeholder="Email"
            defaultValue={changeEmail}
            onChange={(e) => (setChangeEmail(e.target.value))}
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
    // function bookingTime() {
    //   const dt = new Date(bookedDate.toString());
    //   let bookingTimeText = "";
    //   if (bookedTime === "18:00") {
    //     bookingTimeText = new Date(new Date(dt).setHours(18, 0, 0, 0)).toString();
    //   } else if (bookedTime === "21:00") {
    //     bookingTimeText = new Date(new Date(dt).setHours(21, 0, 0, 0)).toString();
    //   }
    //   bookingInfo.BookingTime = bookingTimeText;
    // }
};
