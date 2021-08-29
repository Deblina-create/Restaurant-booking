import React, { useState } from 'react';
import SearchRequest from '../models/SearchRequest';
import restaurantApi from '../api/restaurantApi';
import SearchInfo from '../models/SearchInfo';
import Booking from '../models/Booking';
import BookingForm from './BookingForm';
import BookingDetails from './BookingDetails';

const initialData: SearchInfo[] = [];
const initialSelectedSlot : SearchInfo  = {
    TimeSlotIndex: -1,
    TimeSlotText: "",
    IsTableAvailable: false
};

const initialBookingInfo: Booking = {
    BookingTime: "",
    NoOfPeople: 0,
    Email: "",
    Preferences: "",
    Name: "",
    Phone: "",
    BookedTableCount: 0
}


const MyBookingSearch = () => {
    var curr = new Date();
    var dt = curr.toDateString();
    const [bookingDate, setBookingDate] = useState(dt);
    const [dataSaved, setDataSaved] = useState(false);
    const [peopleCount, setPeopleCount] = useState(2);
    const [searchData, setSearchData] = useState(initialData);
    const [dataFetched, setDataFetched] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(initialSelectedSlot);
    const [savedBookingInfo, setSavedBookingInfo] = useState(initialBookingInfo);

    

    const onDateChange = (diff: number) => {
        const dt = new Date(bookingDate);
        dt.setDate(dt.getDate() + diff);
        setBookingDate(dt.toDateString());
    }

    const onNumberOfPeopleChange = (e: any) => {
        setPeopleCount(Number.parseInt(e.target.value.toString()))
    }

    const fetchData = async () => {
        console.log("Date value", bookingDate);
        console.log("People value", peopleCount);
        const payload: SearchRequest = {
            BookingDate: new Date(bookingDate),
            PeopleCount: peopleCount
        };
        console.log("Payload", payload);
        const x = await restaurantApi.post<SearchInfo[]>("/search", { data: payload });
        setSearchData(x.data as SearchInfo[]);
        setDataFetched(true);
        console.log("response data", x.data);
    }

    const saveData = async (booking?: Booking) => {
        if(booking != null){
            setSavedBookingInfo(booking);
            setDataSaved(true);
        }
    }

    const openForm = (timeSlot: SearchInfo) => {
        setSelectedSlot(timeSlot);
    }

    return (
        <>

{dataSaved ? <BookingDetails
                headerMessage="Your Boking Details"
                name={savedBookingInfo.Name}
                bookingDate={new Date(savedBookingInfo.BookingTime).toDateString()}
                peopleCount={savedBookingInfo.NoOfPeople}
            /> : <div >
            <h2>
          {bookingDate}
          {/* {date === dateNow? <span>(Today)</span> : ""} */}
          <button
            onClick={() => onDateChange(-1)}
            disabled={bookingDate === new Date().toDateString()}
            className="decrease"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button onClick={() => onDateChange(1)} className="increase">
            <i className="fas fa-chevron-right"></i>
          </button>
        </h2>
            <input type="number" min={1} defaultValue={2} onChange={onNumberOfPeopleChange} />
            <button style={{ backgroundColor: "#E1AD01", height: "40px", width: "75px" }} onClick={fetchData}>Search</button>

            {searchData.map((data, index) => <div key={index}>
                <input style={{ backgroundColor:"#E1AD01" }} type="radio" value={data.TimeSlotText} disabled={!data.IsTableAvailable} name="slot" onClick={() => openForm(data)} />
                <label>{data.TimeSlotText}</label>
            </div>)}
            {dataFetched && searchData.length === 0 ? <div>Sorry! we have 0 tables left. Try to change date.</div> : ''}
            {searchData.length > 0 && selectedSlot.TimeSlotIndex != -1 ? <div>
                <BookingForm bookingDate={bookingDate} peopleCount={peopleCount} slot={selectedSlot} onSave={saveData}></BookingForm>
            </div>: ''}




        </div>}
        </>
        
    );
}

export default MyBookingSearch;