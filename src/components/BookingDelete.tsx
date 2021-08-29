import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import restaurantApi from '../api/restaurantApi';
import Booking from '../models/Booking';
import ErrorResponse from '../models/ErrorResponse';
import BookingDetails from './BookingDetails';

type deleteParams = {
    id: string;
}

const initialBookingInfo: Booking = {
    BookingTime: "",
    NoOfPeople: 0,
    Email: "",
    Preferences: "",
    Name: "",
    Phone: "",
    BookedTableCount: 0
}

const BookingDelete = () => {
    const { id } = useParams<deleteParams>();
    const history = useHistory();
    const [bookingInfo, setBookingInfo] = useState(initialBookingInfo);
    const [dataFetched, setDataFetched] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await restaurantApi.get<Booking | null>(`/booking/${id}`);
        setBookingInfo(res.data as Booking);
        setDataFetched(true);
    }


    const cancelBooking = async (booking: Booking) => {
        const res = await restaurantApi.delete<boolean>(`/booking/${id}`);

        if (res.data) {
            history.push('/confirmcancel');
        }
    }


    return (
        <div>
            {bookingInfo ? <div>
                <BookingDetails
                    headerMessage="Your Boking Details"
                    name={bookingInfo.Name}
                    bookingDate={new Date(bookingInfo.BookingTime).toDateString()}
                    peopleCount={bookingInfo.NoOfPeople}
                />
                <button onClick={() => cancelBooking(bookingInfo)}>Cancel</button>
            </div>: <p>Invalid reservation number!</p>}
        </div>
    );
}

export default BookingDelete;