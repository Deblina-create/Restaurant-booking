import React, { useState } from 'react';
import axios from 'axios';
import SearchRequest from '../models/SearchRequest';
import restaurantApi from '../api/restaurantApi';
import SearchInfo from '../models/SearchInfo';
import Booking from '../models/Booking';
import BookingForm from './BookingForm';

const initialData: SearchInfo[] = [];
const initialSelectedSlot : SearchInfo  = {
    TimeSlotIndex: -1,
    TimeSlotText: "",
    IsTableAvailable: false
};


const MyBookingSearch = () => {
    var curr = new Date();
    var dt = curr.toISOString().substr(0, 10);
    const [bookingDate, setBookingDate] = useState(dt);
    const [peopleCount, setPeopleCount] = useState(2);
    const [searchData, setSearchData] = useState(initialData);
    const [dataFetched, setDataFetched] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(initialSelectedSlot);

    const onDateChange = (e: any) => {
        const dt = e.target.value.toString()
        setBookingDate(dt);
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

    const saveData = async () => {
        const firstTimeSlot = new Date(new Date(bookingDate).setHours(18, 0, 0, 0));
        const payload: Booking = {
            BookingTime: firstTimeSlot.toString(),
            NoOfPeople: peopleCount,
            Email: "dadad@vbvh",
            Preferences: "string",
            Name: "string",
            Phone: "string",
            BookedTableCount: 1
        };
        console.log("Payload", payload);
        const x = await restaurantApi.post<SearchInfo>("/booking", { data: payload });
        console.log("response data", x.data);
    }

    const openForm = (timeSlot: SearchInfo) => {
        setSelectedSlot(timeSlot);
    }

    return (
        <div style={{ textAlign: "center" }}>
            <input type="date" onChange={onDateChange} defaultValue={bookingDate.toString()} />
            <input type="number" min={1} defaultValue={2} onChange={onNumberOfPeopleChange} />
            <button onClick={fetchData}>Search</button>

            {searchData.map((data, index) => <div>
                <input type="radio" value={data.TimeSlotText} disabled={!data.IsTableAvailable} name="slot" onClick={() => openForm(data)} />
                <label>{data.TimeSlotText}</label>
            </div>)}
            {dataFetched && searchData.length === 0 ? <div>Sorry! we have 0 tables left. Try to change date.</div> : ''}
            {searchData.length > 0 && selectedSlot.TimeSlotIndex != -1 ? <div>
                <BookingForm></BookingForm>
            </div>: ''}




        </div>
    );
}

export default MyBookingSearch;