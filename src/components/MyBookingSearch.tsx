import React, { useState } from 'react';
import SearchRequest from '../models/SearchRequest';
import restaurantApi from '../api/restaurantApi';
import SearchInfo from '../models/SearchInfo';
import Booking from '../models/Booking';
import BookingForm from './BookingForm';
import BookingDetails from './BookingDetails';
import "./css/style.css";
import "../modals/css/modal_style.css";

const initialData: SearchInfo[] = [];
const initialSelectedSlot: SearchInfo = {
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
    const [peopleCount, setPeopleCount] = useState(0);
    const [searchData, setSearchData] = useState(initialData);
    const [dataFetched, setDataFetched] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(initialSelectedSlot);
    const [savedBookingInfo, setSavedBookingInfo] = useState(initialBookingInfo);
    const [errorNum, setErrorNum] = useState(false);


    const validate = (): boolean => {
        let valid = true;
        if (peopleCount <= 0) {
            setErrorNum(true);
            valid = false;
        }
        else {
            setErrorNum(false);
        }
        return valid;
    }

    const onDateChange = (diff: number) => {
        const dt = new Date(bookingDate);
        dt.setDate(dt.getDate() + diff);
        setBookingDate(dt.toDateString());
    }

    const onNumberOfPeopleChange = (e: any) => {
        console.log("Changed", e.target.value.toString());
        setPeopleCount(Number.parseInt(e.target.value.toString()))
    }

    const fetchData = async () => {
        if (validate()) {
            const payload: SearchRequest = {
                BookingDate: new Date(bookingDate),
                PeopleCount: peopleCount
            };
            const x = await restaurantApi.post<SearchInfo[]>("/search", { data: payload });
            console.log("Search data", x.data);
            setSearchData(x.data as SearchInfo[]);
            setDataFetched(true);
        }
    }

    const saveData = async (booking?: Booking) => {
        if (booking != null) {
            setSavedBookingInfo(booking);
            setDataSaved(true);
        }
    }

    const openForm = (timeSlot: SearchInfo) => {
        setSelectedSlot(timeSlot);
    }

    return (
        <>

            <div className="container">
                <div className="back">
                    <a href={"/"}><i className="fas fa-chevron-left"></i> Booking Page</a>
                </div>
                <div>

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
                        {errorNum ? <p style={{ color: "orange", margin: 0 }}>Please enter number of people!</p> : ''}
                        <input type="number" min={1} placeholder="No. of people" onChange={onNumberOfPeopleChange} />
                        <button className="empty-btn" style={{ backgroundColor: "black" }} onClick={fetchData}>Search</button>
                        <div className="radio">
                            {searchData.map((data, index) => <div className="radio-btn" key={index}>
                                <input type="radio" value={data.TimeSlotText} disabled={!data.IsTableAvailable} name="slot" onClick={() => openForm(data)} />
                                <label>{data.TimeSlotText}</label>
                            </div>)}
                        </div>
                        {dataFetched && searchData.length === 0 ? <div>Sorry! we have 0 tables left. Try to change date.</div> : ''}
                        {searchData.length > 0 && selectedSlot.TimeSlotIndex != -1 ? <div>
                            <BookingForm bookingDate={bookingDate} peopleCount={peopleCount} slot={selectedSlot} onSave={saveData}></BookingForm>
                        </div> : ''}




                    </div>}
                </div>
            </div>
        </>

    );
}

export default MyBookingSearch;