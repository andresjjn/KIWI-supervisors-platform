import React, { useState, useEffect } from 'react';
import formatedDate from './formatedDate';
import './HoursDay.css';
import deleteHourOfADay from '../../requests/DeleteHourOfADay';
import MapHours from './MapHours';


let axios = require("axios");


//This component shows the work hours assigned to a specific day
export default function HoursDay({ value }) {
    const [isLoading, setLoading] = useState(true);
    const [day, setDay] = useState({});
    const [reqFail, setReqFail] = useState(false);
    const getDay = value.format('YYYYMMDD');


    //Redraws the component when getDay changes its value
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


    useEffect(() => {
        //To render when delete hour
    }, [day]);


    //2 different views in case cant load hours or day is empty
    if (isLoading) {
        return <h1>Loading . . .</h1>;
    } else if (reqFail) {
        return <h1>No hay horas asignadas para este día</h1>
    }


    //Sort the hours of the day in ascending order
    if (day['hours'] !== undefined) {
        const hoursLength = day['hours'].length;
        for (let j = 0; j < hoursLength; j++) {
            day['hours'].sort((a, b) => {
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


    //Render all assigned hours per day
    return (
        <div className='booking_list_container'>
            <div className='card'>
                <div className='info_section'>
                    <p>{formatedDate(day.date)}</p>
                </div>
                <MapHours day={day} funct={deleteHour} />
            </div>
        </div>
    );
}
