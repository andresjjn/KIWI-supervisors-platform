import React, { useState, useEffect } from 'react';
import formatedDate from './formatedDate';
import DeleteHourOfADay from '../../requests/DeleteHourOfADay';
import './HoursDay.css';


let axios = require("axios");


//This component shows the work hours assigned to a specific day
export default function HoursDay(props) {
    const { value } = props;
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


    //Render all assigned hours per day
    return (
        <div className='booking_list_container'>
            <div className='card'>
                <div className='info_section'>
                    <p>{formatedDate(day.date)}</p>
                </div>
                {day['hours'].map((elem, index) => (
                    <div key={`${elem}${index}`} className='available'>
                        <div key={elem['hour'] + index} className='hour'>
                            {elem['hour']}:00
                            </div>
                        <div key={elem['available']}>
                            Slots disponibles: {elem["available"]}
                        </div>
                        <div>
                            <button
                                className="deleteBtn"
                                onClick={() => {
                                    DeleteHourOfADay(day.date, elem["hour"]);
                                }}
                            >.
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
