import React from 'react';
import dayStyles from "./Styles";
import weekSelected from './SelectedWeek'

export default function WeekCalendar({value, calendar, funct }) {
    return (
        <>
            {calendar.map((week) => (
                <div className={weekSelected(value, week)} key={week.toString()}>
                    {week.map((day) => (
                        <div className="day" key={day.toString()} onClick={() => funct(day)}>
                            <div className={dayStyles(day, value)}>
                                {day.format("D").toString()}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
}
