import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import buildCalendar from './Build';
import dayStyles, {beforeToday} from './Styles';
import './Calendar.css';
import Header from './Header';

export default function Calendar() {
    const [calendar, setCalendar] = useState([]);
    const [value, setValue] = useState(Moment());


    useEffect(() => {
        setCalendar(buildCalendar(value))
    }, [value]);



    return (
        <div className='calendar'>
            <Header value={value} setValue={setValue}/>
            <div className='body'>
                {calendar.map((week) => (
                    <div>
                        {week.map((day) => (
                            <div className='day' onClick={() => !beforeToday(day) && setValue(day)}>
                                <div className={dayStyles(day, value)}>
                                    {day.format('D').toString()}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
