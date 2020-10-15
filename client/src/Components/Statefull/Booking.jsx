import React, { useState } from "react";
import Moment from "moment";
import Calendar from "./Calendar/Calendar";
import Form from './BookingInput/Form';
// import BookingList from './BookingList';
import HoursDay from "./HoursDay";
import './Booking.css';

export default function Booking() {
    const [value, setValue] = useState(Moment());

    return (
        <div className='booking'>
            <div className='bookingInput'>
                <Form value={value} />
            </div>
            <div className='dates'>
                <Calendar value={value} onChange={setValue} />
                {/* <BookingList /> */}
                <HoursDay value={value}/>
            </div>
        </div>
    );
}
