import React, { useState, useEffect } from "react";
import buildCalendar from "./Build";
import dayStyles, { beforeToday } from "./Styles";
import "./Calendar.css";
import Header from "./Header/Header";

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
                    <div className="day-names">
                        {["lun", "mar", "mié", "jue", "vie", "sáb", "dom"].map((d) => (
                            <div className="nameDay" key={d.toString()}><p>{d}</p></div>
                        ))}
                    </div>
                    {calendar.map((week) => (
                        <div className="week" key={week.toString()}>
                            {week.map((day) => (
                                <div
                                    className="day" key={day.toString()}
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
