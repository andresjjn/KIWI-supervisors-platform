import React, { useState } from "react";
import Moment from "moment";
import Calendar from "../Calendar/Calendar";
import Form from '../form/Form';
import HoursDay from "../hours_list/HoursDay";
import './Booking.css';
import isAdmin from '../../../IsAdmin';

export default function Booking() {
    const [value, setValue] = useState(Moment());
    const [reload, setReload] = useState(false);

    return (
        <div className='booking'>
            {isAdmin() && <div className='bookingInput'>
                <Form reload={reload} setReload={setReload} value={value} />
            </div>}
            <div className='dates'>
                <Calendar value={value} onChange={setValue} />
                <HoursDay reload={reload} value={value} />
            </div>
        </div>
    );
}
