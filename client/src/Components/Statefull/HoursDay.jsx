import React, { useState, useEffect } from 'react';
import formatedDate from './formatedDate';
import './HoursDay.css';
import deleteHourOfADay from '../../requests/DeleteHourOfADay';
import MapHours from './MapHours';
import { Loading, NoConnection, NoHours } from '../Stateless/DashboardMessages';

let axios = require("axios");

export default function HoursDay({ value }) {
    const [isLoading, setLoading] = useState(true);
    const [day, setDay] = useState({});
    const [reqFail, setReqFail] = useState(false);
    const getDay = value.format('YYYYMMDD');
    let hoursLength = 0;

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}days/${getDay}`)
            .then((response) => {
                setDay(response.data);
                setLoading(false);
                setReqFail(false);
            })
            .catch(() => {
                setReqFail(true);
                setLoading(false);
            });
    }, [getDay]);

    useEffect(() => { /*Called every time day change the state*/ }, [day]);

    if (isLoading) { return <Loading />; }
    else if (reqFail) { return <NoConnection />; }

    hoursLength = day.hours.length;
    if (hoursLength > 0) {
        sortHours(day.hours);
    }

    function sortHours(hours) {
        for (let j = 0; j < hoursLength; j++) {
            hours.sort((a, b) => {
                if (a['hour'] > b['hour']) {
                    return 1;
                }
                if (a['hour'] < b['hour']) {
                    return -1;
                }
                return 0;
            });
        }
    }

    async function deleteHour(date, hour, index) {
        let respone = await deleteHourOfADay(date, hour);
        if (respone === true) {
            const newDay = { ...day };
            newDay.hours.splice(index, 1);
            setDay(newDay);
        }
    }

    return (
        <div className='booking_list_container'>
            <div className='card'>
                <div className='info_section'>
                    <p>{formatedDate(day.date)}</p>
                </div>
                {(hoursLength > 0) ? <MapHours day={day} funct={deleteHour} /> : <NoHours />}
            </div>
        </div>
    );
}
