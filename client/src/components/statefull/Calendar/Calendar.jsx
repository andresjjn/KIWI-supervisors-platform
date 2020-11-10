import React, { useState, useEffect } from "react";
import buildCalendar from "./Build";
import "./Calendar.css";
import Header from "./Header/Header";
import WeekCalendar from "./WeekCalendar";
import DaysName from "./DaysName";


/**
 * Function that return the Calendar component
 */
export default function Calendar({ value, onChange }) {
    const [calendar, setCalendar] = useState([]);

    useEffect(() => {
        setCalendar(buildCalendar(value));
    }, [value]);

    return (
        <div className="calendarView">
            <div className="calendar">
                <Header value={value} setValue={onChange} />
                <div className="body">
                    <DaysName />
                    <WeekCalendar value={value} calendar={calendar} funct={onChange}/>
                </div>
            </div>
        </div>
    );
}
