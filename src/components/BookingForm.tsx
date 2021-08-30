import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import restaurantApi from '../api/restaurantApi';
import Booking from '../models/Booking';
import ErrorResponse from '../models/ErrorResponse';
import Utilities from '../Utilities'

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
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorName, setErrorName] = useState(false);

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
        const name = e.target.value.toString();
        setBookingInfo({...bookingInfo, Name: name});
    }

    const phoneChanged = (e:any)=>{
        setBookingInfo({...bookingInfo, Phone: e.target.value.toString()});
    }

    const emailChanged = (e:any)=>{
        const email = e.target.value.toString();
        setBookingInfo({...bookingInfo, Email: email});
    }

    const validate= () : boolean=>{
        let valid = true;
        if(bookingInfo.Name == ""){
            setErrorName(true);
            valid = false;
        }
        else{
            setErrorName(false);
        }
        if(!Utilities.validateEmail(bookingInfo.Email)){
            setErrorEmail(true);
            valid = false;
        }
        else{
            setErrorEmail(false);
        }
        return valid;
    }

    const saveData = async (e:any)=>{
        e.preventDefault();
        if(!validate()){
            return;
        }
        const x = await restaurantApi.post<string | ErrorResponse>("/booking", { data: bookingInfo });
        console.log("response data", x.data);
        if(props.onSave){
            props.onSave(bookingInfo);
        }
        //history.push("/confirmation");
    }

    return (
        <div >
            <form >
                <h3>Booking Form</h3>
                <input disabled type="text" value={props.bookingDate} ></input>
                <input disabled type="text" value={props.slot.TimeSlotText} ></input>
                <input disabled type="text" value={props.peopleCount} ></input>
                <h3>Contact Info</h3>
                {errorName ? <p style={{color : "red", margin: 0}}>Please enter your name</p> : ''}
                <input type="text" placeholder="Name" onChange={nameChanged}></input>
                <input type="text" placeholder="Phone" onChange={phoneChanged}></input>
                {errorEmail ? <p style={{color : "red", margin: 0}}>Please enter a valid email</p> : ''}
                <input type="email" placeholder="Email" onChange={emailChanged}></input>
                <button style={{ backgroundColor: "#E1AD01", height: "30px", width: "75px", margin:"15px" }} onClick={saveData}>Book</button>
            </form>

        </div>
    );
}

export default BookingForm;