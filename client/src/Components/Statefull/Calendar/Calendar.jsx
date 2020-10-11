import React, { useState, useEffect } from "react";
import buildCalendar from "./Build";
import dayStyles, { beforeToday } from "./Styles";
import "./Calendar.css";
import Header from "./Header/Header";

export default function Calendar(props) {
    const { value, onChange } = props;
    const [calendar, setCalendar] = useState([]);

    useEffect(() => {
        setCalendar(buildCalendar(value));
    }, [value]);

    return (
        <div className="calendarView">
            <div className="calendar">
                <Header value={value} setValue={onChange} />
                <div className="body">
                    <div className="day-names">
                        {["dom", "lun", "mar", "mié", "jue", "vie", "sáb"].map((d) => (
                            <div className="nameDay"><p>{d}</p></div>
                        ))}
                    </div>
                    {calendar.map((week) => (
                        <div className="week">
                            {week.map((day) => (
                                <div
                                    className="day"
                                    onClick={() =>
                                        !beforeToday(day) && onChange(day)
                                    }
                                >
                                    <div className={dayStyles(day, value)}>
                                        {day.format("D").toString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
