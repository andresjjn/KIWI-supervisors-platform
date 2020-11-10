import React, { useState } from "react";
import Moment from "moment";
import Calendar from "../Calendar/Calendar";
import Form from '../form/Form';
import HoursDay from "../hours_list/HoursDay";
import './Booking.css';
import { connect } from 'react-redux';


/** 
 * Function that returns the booking component that
 * contain the form and the calendar.
*/
const Booking = ({ isAdmin }) => {
    const [value, setValue] = useState(Moment());
    const [reload, setReload] = useState(false);
    const cName = isAdmin ? "dates" : "dates2"

    return (
        <div className='booking'>
            {isAdmin && <div className='bookingInput'>
                <Form reload={reload} setReload={setReload} value={value} />
            </div>}
            <div className={cName}>
                <Calendar value={value} onChange={setValue} />
                <HoursDay reload={reload} value={value} />
            </div>
        </div>
    );
}

const mapStoreToProps = state => ({
    isAdmin: state.isAdmin
})

export default connect(mapStoreToProps, {})(Booking);
