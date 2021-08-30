import Booking from '../models/Booking';
import firebase from '../firebase';
import ErrorResponse from '../models/ErrorResponse';
import SearchInfo from '../models/SearchInfo';
import nodemailer from 'nodemailer';
import config from "../config";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'deblina4.se@gmail.com',
        pass: 'frontend@2020',
    },
});

const TotalTableCount = 15;
const TableCapacity = 6;

const saveBookingDetail = async (booking: Booking): Promise<string | ErrorResponse> => {
    let error: ErrorResponse = {
        Code: "",
        Message: ""
    };
    let tableRequired = Math.floor(booking.NoOfPeople / TableCapacity);
    if (booking.NoOfPeople % TableCapacity > 0) {
        tableRequired++;
    }

    const bookings = await getBookingsData(new Date(booking.BookingTime));
    if (bookings && bookings.length > 0) {
        const available = checkTableAvailability(bookings, tableRequired, new Date(booking.BookingTime));
        if (!available) {
            error = {
                Code: "ERROR_TABLE_UNAVAILABLE",
                Message: "We are fully booked on this time slot. Please try a different date and time"
            };
            return error;
        }
    }

    const doc = await firebase.db.collection("BookingDetails").add({ NoOfPeople: booking.NoOfPeople, Email: booking.Email, Preferences: booking.Preferences, Name: booking.Name, Phone: booking.Phone, BookingTime: booking.BookingTime, BookedTableCount: tableRequired });

    console.log(doc.id);
    if (doc && doc.id) {
        let booking: Booking = await getBookingDetailById(doc.id);
        const html = `
        <h4>Your reservation has been confirmed!</h4>
        <h5>Your booking details are as mentioned below</h5>
        <table>
        <tr>
            <td><b>Reservation No.</b></td>
            <td><b>Name</b></td>
            <td><b>Date & Time</b></td>
            <td><b>No. of people</b></td>
        </tr>
        <tr>
            <td>${doc.id}</td>
            <td>${booking.Name}</td>
            <td>${booking.BookingTime}</td>
            <td>${booking.NoOfPeople}</td>
        </tr>
        </table>
        <div>
            <p>If you want to cancel the reservation, click <a href="${config.UIServerBaseUrl}/cancel/${doc.id}">here</a></p>
        </div>
        `;
        sendMail(booking.Email, "Restaurant Reservation confirmed", "Your reservation has been confirmed!", html);
        return doc.id;
    }
    error = {
        Code: "ERROR_SAVE_BOOKING",
        Message: "An error has occured while saving booking details"
    };
    return error;
}

const getBookingDetailById = async (id: string): Promise<Booking | null> => {

    try {
        const doc = await firebase.db.collection("BookingDetails").doc(id).get();
        const booking = doc.data() as Booking;
        booking.id = doc.id;
        return booking;
    }
    catch (err: any) {
        console.log(err);
    }
    return null;
}

const editBookingDetail = async (booking: Booking): Promise<boolean> => {

    try {
        await firebase.db.collection("BookingDetails").doc(booking.id).update({ NoOfPeople: booking.NoOfPeople, Email: booking.Email, Preferences: booking.Preferences, Name: booking.Name, Phone: booking.Phone, BookingTime: booking.BookingTime });
        return true;
    }
    catch (err: any) {
        console.log(err); 
    }
    return false;
}

const deleteBookingDetail = async (id: string): Promise<boolean> => {

    try {
        let booking: Booking = await getBookingDetailById(id);
        await firebase.db.collection("BookingDetails").doc(id).delete();
        
        const html = `
        <h3>Your Reservation (#${id}) has been cancelled!</h3>
        `;
        sendMail(booking.Email, "Restaurant Reservation cancelled", "Your reservation has been cancelled!", html);
        return true;
    }
    catch (err: any) {
        console.log(err);
    }
    return false;
}


const searchBookingDetail = async (dt: Date, noOfPeople: number): Promise<SearchInfo[]> => {
    let tableRequired = Math.floor(noOfPeople / TableCapacity);
    if (noOfPeople % TableCapacity > 0) {
        tableRequired++;
    }
    //const slots = getDateTimeSlots(dt);
    const firstTimeSlot = new Date(new Date(dt).setHours(18, 0, 0, 0));
    const secondTimeSlot = new Date(new Date(dt).setHours(21, 0, 0, 0));
    const firstSlotBookings = await getBookingsData(firstTimeSlot);
    const secondSlotBookings = await getBookingsData(secondTimeSlot);
    const firstSlotAvailability: SearchInfo = {
        TimeSlotIndex: 0,
        TimeSlotText: "18:00",
        IsTableAvailable: checkTableAvailability(firstSlotBookings, tableRequired, firstTimeSlot)
    };
    const secondSlotAvailability: SearchInfo = {
        TimeSlotIndex: 1,
        TimeSlotText: "21:00",
        IsTableAvailable: checkTableAvailability(secondSlotBookings, tableRequired, secondTimeSlot)
    };
    return [firstSlotAvailability, secondSlotAvailability];


}

const adminSearchBookings = async (date: Date): Promise<Booking[]> => {
    date.setHours(0);
    let from = date.toString()
    date.setHours(23, 59);
    let to = date.toString()

    console.log(`Trying to find bookings between ${from} to ${to}`);
    
    const snapshot= await firebase.db.collection("BookingDetails")
    .where("BookingTime", ">", from)
    .where("BookingTime", "<", to)
    .get(); 
    if(snapshot && snapshot.docs){
        const bds = snapshot.docs.map((doc)=>{
            const data = doc.data() as Booking;
            const booking: Booking = {
                ...data, id: doc.id
            }
            return booking;
        });
        return bds;   
    }
    return null;
}

//helper functions

const getBookingsData = async (timeslot: Date): Promise<Booking[] | null> => {
    const snapshot = await firebase.db.collection("BookingDetails")
        .where("BookingTime", "==", timeslot.toString())
        .get();
    if (snapshot && snapshot.docs) {
        const bds = snapshot.docs.map((doc) => {
            const data = doc.data() as Booking;
            const booking: Booking = {
                ...data, id: doc.id
            }
            return booking;
        });
        return bds;
    }
    return null;
};

const checkTableAvailability = (bookings: Booking[] | null, tableRequired: number, timeslot: Date): boolean => {
    if (bookings == null) {
        return false;
    }
    let NoOfTableBooked = 0;
    bookings.map((b) => {
        if (b.BookedTableCount && timeslot.toString() == b.BookingTime) {
            NoOfTableBooked += b.BookedTableCount;
        }
    });
    if (NoOfTableBooked + tableRequired <= TotalTableCount) {
        return true;
    }
    return false; 
};

const sendMail = (to: string, subject: string, text: string, html: string) => {
    transporter.sendMail({
        from: '"Team Restaurant" <deblina4.se@gmail.com>', // sender address
        to: to,
        subject: subject,
        text: text,
        html: html
    }).then(info => {
        console.log({ info });
    }).catch(console.error);
}

export default { saveBookingDetail, editBookingDetail, deleteBookingDetail, searchBookingDetail, getBookingDetailById, adminSearchBookings };
