import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import restaurantApi from '../api/restaurantApi';
import Booking from '../models/Booking';
import ErrorResponse from '../models/ErrorResponse';

const initialBookingInfo: Booking = {
    BookingTime: "",
    NoOfPeople: 0,
    Email: "",
    Preferences: "",
    Name: "",
    Phone: "",
    BookedTableCount: 0
}

const BookingForm = (props: any) => {
    const history = useHistory();
    const [bookingInfo, setBookingInfo] = useState(initialBookingInfo);

    useEffect(()=>{
        const dt = new Date(props.bookingDate);
        let bookingTimeText = "";
        if(props.slot.TimeSlotIndex === 0){
            bookingTimeText= new Date(new Date(dt).setHours(18,0,0,0)).toString();
        }
        else if(props.slot.TimeSlotIndex === 1){
            bookingTimeText= new Date(new Date(dt).setHours(21,0,0,0)).toString();
        }
        setBookingInfo({...bookingInfo, BookingTime: bookingTimeText, NoOfPeople: props.peopleCount});
    },[props])

    const nameChanged = (e:any)=>{
        setBookingInfo({...bookingInfo, Name: e.target.value.toString()});
    }

    const phoneChanged = (e:any)=>{
        setBookingInfo({...bookingInfo, Phone: e.target.value.toString()});
    }

    const emailChanged = (e:any)=>{
        setBookingInfo({...bookingInfo, Email: e.target.value.toString()});
    }

    const saveData = async (e:any)=>{
        e.preventDefault();
        const x = await restaurantApi.post<string | ErrorResponse>("/booking", { data: bookingInfo });
        console.log("response data", x.data);
        history.push("/confirmation");
    }

    return (
        <div style={{ textAlign: "center" }}>
            <form style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h3>Booking Form</h3>
                <input disabled type="text" value={props.bookingDate} ></input>
                <input disabled type="text" value={props.slot.TimeSlotText} ></input>
                <input disabled type="text" value={props.peopleCount} ></input>
                <h3>Contact Info</h3>
                <input type="text" placeholder="Name" onChange={nameChanged}></input>
                <input type="text" placeholder="Phone" onChange={phoneChanged}></input>
                <input type="email" placeholder="Email" onChange={emailChanged}></input>
                <button onClick={saveData}>Book</button>
            </form>
        </div>
    );
}

export default BookingForm;