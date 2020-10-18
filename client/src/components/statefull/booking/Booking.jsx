import React, { useState } from "react";
import Moment from "moment";
import Calendar from "../Calendar/Calendar";
import Form from '../BookingInput/Form';
import HoursDay from "../hours_list/HoursDay";
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
                <HoursDay value={value}/>
            </div>
        </div>
    );
}
