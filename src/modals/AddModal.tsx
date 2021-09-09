import React, { useState } from "react";
import restaurantApi from "../api/restaurantApi";
import BookingForm from "../components/BookingForm";
import SearchInfo from "../models/SearchInfo";
import SearchRequest from "../models/SearchRequest";
import "./css/modal_style.css";

interface ModalProps {
  onClose: () => void;
  show: boolean;
}

const initialData: SearchInfo[] = [];
const initialSelectedSlot: SearchInfo = {
  TimeSlotIndex: -1,
  TimeSlotText: "",
  IsTableAvailable: false,
};

export const AddModal: React.FC<ModalProps> = ({ onClose, show }) => {
  let curr = new Date();
  let dt = curr.toISOString().substr(0, 10);
  const [bookingDate, setBookingDate] = useState(dt);
  const [peopleCount, setPeopleCount] = useState(2);
  const [searchData, setSearchData] = useState(initialData);
  const [dataFetched, setDataFetched] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(initialSelectedSlot);

  if (!show) {
    return null;
  }

  const onDateChange = (e: any) => {
    const dt = e.target.value.toString();
    setBookingDate(dt);
  };

  const onNumberOfPeopleChange = (e: any) => {
    setPeopleCount(Number.parseInt(e.target.value.toString()));
  };

  const fetchData = async () => {
    console.log("Date value", bookingDate);
    console.log("People value", peopleCount);
    const payload: SearchRequest = {
      BookingDate: new Date(bookingDate),
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

  const openForm = (timeSlot: SearchInfo) => {
    setSelectedSlot(timeSlot);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">Booking detail</h3>
        </div>
        <div className="modal-body">
          <input
            type="date"
            onChange={onDateChange}
            defaultValue={bookingDate.toString()}
          />
          <input
            type="number"
            min={1}
            placeholder={"No. of people"}
            onChange={onNumberOfPeopleChange}
          />
          <button onClick={fetchData} className="empty-btn">
            Search
          </button>
        </div>
        <div className="radio">
          {searchData.map((data, index) => (
            <div key={index} className="radio-btn">
              <input
                type="radio"
                value={data.TimeSlotText}
                disabled={!data.IsTableAvailable}
                name="slot"
                onClick={() => openForm(data)}
                id={data.TimeSlotText}
              />
              <label className="slot" htmlFor={data.TimeSlotText}>
                {data.TimeSlotText}
              </label>
            </div>
          ))}
        </div>
        {dataFetched && searchData.length === 0 ? (
          <div>Sorry! we have 0 tables left. Try to change date.</div>
        ) : (
          ""
        )}
        {searchData.length > 0 && selectedSlot.TimeSlotIndex !== -1 ? (
          <div className="modal-body">
            <BookingForm
              bookingDate={bookingDate}
              peopleCount={peopleCount}
              slot={selectedSlot}
            ></BookingForm>
          </div>
        ) : (
          ""
        )}
        {/* <div className="modal-footer">
          <button className="save-button">Add</button>
        </div> */}
        <button onClick={onClose} className="close-icon">
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};
