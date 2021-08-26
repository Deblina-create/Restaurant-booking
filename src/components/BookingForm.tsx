import React from 'react';


const BookingForm = () => {

    


    return (
        <div style={{textAlign: "center"}}>
            <form style={{display: "flex", flexDirection: "column",  alignItems:"center" }}>
                <h3>Booking Form</h3>
                <input type="text" name="date" value="" ></input>
                <input type="text" name="date" value="" ></input>
                <input type="text" name="date" value="" ></input>
                <h3>Contact Info</h3>
                <input type="text" name="date" value="" placeholder="Name"></input>
                <input type="text" name="date" value="" placeholder="Phone"></input>
                <input type="text" name="date" value="" placeholder="Email"></input>
                <button>Book</button>
            </form>
        </div>
    );
}

export default BookingForm;