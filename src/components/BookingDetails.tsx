import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import restaurantApi from '../api/restaurantApi';
import Booking from '../models/Booking';
import ErrorResponse from '../models/ErrorResponse';




const BookingDetails = (props: any) => {

    
    return (
        <div>
            <h3>{props.headerMessage}</h3>
            <h5>{props.name}</h5>
            <div>{props.id}</div>
            <div>{props.bookingDate}</div>
            <div>{props.peopleCount}</div>
        </div>
    );
}

export default BookingDetails;