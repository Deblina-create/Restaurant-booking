import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import restaurantApi from "../api/restaurantApi";
import Booking from "../models/Booking";
import ErrorResponse from "../models/ErrorResponse";
import SearchInfo from "../models/SearchInfo";
import SearchRequest from "../models/SearchRequest";
import "./css/style.css";

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

const initialData: SearchInfo[] = [];
const initialSelectedSlot: SearchInfo = {
  TimeSlotIndex: -1,
  TimeSlotText: "",
  IsTableAvailable: false,
};

export const EditForm = () => {
  const { id } = useParams<editParams>();

  const [bookingInfo, setBookingInfo] = useState(initialBookingInfo);
  const [bookedDate, setBookedDate] = useState("");
  const [bookedTime, setBookedTime] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [disabledContact, setDisabledContact] = useState(false);
  const [searchData, setSearchData] = useState(initialData);
  const [dataFetched, setDataFetched] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(initialSelectedSlot);
  // const [type, setType] = useState("radio");
  const [hidden, setHidden] = useState(false);

  const history = useHistory();

  const fetchData = async () => {
    const res = await restaurantApi.get<Booking | null>(`/booking/${id}`);
    let selectedBooking = res.data as Booking;
    setBookingInfo(selectedBooking);
    console.log(res.data);
    let date = new Date(selectedBooking.BookingTime);
    setBookedDate(date.toISOString().split("T")[0]);
    setBookedTime(date.toLocaleTimeString("sv-SE", { timeStyle: "short" }));
  };

  const searchTable = async () => {
    // setType("hidden");
    setHidden(true);
    let peopleCount = bookingInfo.NoOfPeople;
    console.log("Date value", bookedDate);
    console.log("People value", peopleCount);
    const payload: SearchRequest = {
      BookingDate: new Date(bookedDate),
      PeopleCount: peopleCount,
    };
    console.log("Payload", payload);
    const x = await restaurantApi.post<SearchInfo[]>("/search", {
      data: payload,
    });
    setSearchData(x.data as SearchInfo[]);
    setDataFetched(true);
    console.log("response data", x.data);
  };

  const saveData = async () => {
    console.log(bookingInfo);
    await restaurantApi.put<Booking | ErrorResponse>("/booking", {
      data: bookingInfo,
    });
    history.push("/admin");
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

  const activate = () => {
    setDisabled(false);
    setDisabledContact(true);
  };

  const activateContact = () => {
    setDisabledContact(false);
    setDisabled(true);
  };

  const openForm = (timeSlot: SearchInfo) => {
    //setSelectedSlot(timeSlot);
    bookingTime(timeSlot);
  };

  return (
    <div className="container">
      <div className="back">
        <a href={"/admin"}>
          <i className="fas fa-chevron-left"></i> Edit form
        </a>
      </div>
      <div>
        <div>
          <p>
            Booking information
            <span className="edit" onClick={activate}>
              <i className="fas fa-pen"></i>
            </span>
          </p>
        </div>
        <input
          type="date"
          value={bookedDate}
          onChange={(e) => setBookedDate(e.target.value)}
          disabled={disabled}
        />
        <input
          type="number"
          placeholder="Number of people"
          value={bookingInfo.NoOfPeople}
          onChange={onNumberOfPeopleChange}
          disabled={disabled}
        />
        <input
          type="text"
          value={bookedTime}
          // onChange={(e) => setBookedDate(e.target.value)}
          disabled
          hidden={hidden}
        />
        <div className="radio">
          {searchData.map((data, index) => (
            <div className="radio-btn" key={index}>
              <input
                type="radio"
                value={data.TimeSlotText}
                disabled={!data.IsTableAvailable}
                name="slot"
                onClick={() => openForm(data)}
              />
              <label>{data.TimeSlotText}</label>
              {!data.IsTableAvailable? <span> (Full)</span> : ""}
            </div>
          ))}
        </div>
        {/* <div className="radio">
          <div className="radio-btn">
            <input
              id="time18"
              type={type}
              value={"18:00"}
              name="time"
              checked={bookedTime === "18:00"}
              onChange={(e) => setBookedTime(e.target.value)}
              // disabled={disabled}
            />
            <label htmlFor="time18" hidden={hidden}>18:00</label>
          </div>
          <div className="radio-btn">
            <input
              id="time21"
              type={type}
              value={"21:00"}
              name="time"
              checked={bookedTime === "21:00"}
              onChange={(e) => setBookedTime(e.target.value)}
              // disabled={disabled}
            />
            <label htmlFor="time21" hidden={hidden}>21:00</label>
          </div>
        </div> */}
        <div>
          <button
            className="empty-btn"
            style={{ backgroundColor: "black" }}
            disabled={disabled}
            onClick={searchTable}
          >
            Check available tabels
          </button>
        </div>
        <p>
          Contact information
          {/* <span className="edit" onClick={activateContact}>
            <i className="fas fa-pen"></i>
          </span> */}
        </p>
        <input
          type="text"
          placeholder="Name"
          value={bookingInfo.Name}
          onChange={nameChanged}
          // disabled={disabledContact}
        />
        <input
          type="text"
          placeholder="Mobile number"
          value={bookingInfo.Phone}
          onChange={phoneChanged}
          // disabled={disabledContact}
        />
        <input
          type="text"
          placeholder="Email"
          value={bookingInfo.Email}
          onChange={emailChanged}
          // disabled={disabledContact}
        />
        {/* <input
            type="text"
            placeholder="Preference"
            defaultValue={bookingInfo.Preference}
          /> */}
      </div>
      <div className="modal-footer">
        <button
          onClick={saveData}
          className="empty-btn"
          // disabled={disabledContact}
          style={{ backgroundColor: "black" }}
        >
          Save
        </button>
      </div>
    </div>
  );
  function bookingTime(slot: SearchInfo) {
    console.log("Changed Slot", slot);
    const dt = new Date(bookedDate.toString());
    let bookingTimeText = "";
    if (slot.TimeSlotIndex === 0 ) {
      bookingTimeText = new Date(new Date(dt).setHours(18, 0, 0, 0)).toString();
    
    } else if(slot.TimeSlotIndex === 1) {
      bookingTimeText = new Date(new Date(dt).setHours(21, 0, 0, 0)).toString();
    }
    console.log("Changed booking time", bookingTimeText);
    //bookingInfo.BookingTime = bookingTimeText;
    setBookingInfo({...bookingInfo, BookingTime: bookingTimeText});
  }
};
