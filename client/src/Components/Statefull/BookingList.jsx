import React, { useState, useEffect } from "react";
import "./BookingList.css";
import deleteDaysRequest from '../../requests/deleteDaysRequest';
import DeleteHourOfADay from "../../requests/DeleteHourOfADay";

var axios = require("axios");

export default function BookingList() {
    const [isLoading, setLoading] = useState(true);
    const [daysList, updateList] = useState({});

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}days/`).then((response) => {
            updateList(response.data);
            setLoading(false);
        });
    }, []);

    if (isLoading) {
        return <h1>Test Loading . . .</h1>;
    } else {
        if (daysList.length === 0) {
            return <h1>No hay horas asignadas</h1>
        }
        daysList.sort((a, b) => {
            if (a.date > b.date) {
                return 1;
            }
            if (a.date < b.date) {
                return -1;
            }
            return 0;
        });
        const daysLength = daysList.length;
        for (let i = 0; i < daysLength; i++) {
            const hoursLength = daysList[i]['hours'].length;
            for (let j = 0; j < hoursLength; j++) {
                daysList[i]['hours'].sort((a, b) => {
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
    }

    return (
        <div className="booking_list_container">
            {daysList.map((elem, ind) => (
                <h2 key={ind} className='card'>
                    Date:{elem.date} - ID:{elem._id}
                    <button className='deleteBtn' onClick={() => {
                        const arr = [];
                        arr.push(elem.date);
                        deleteDaysRequest(arr, '', '')}}>Delete
                    </button>
                    {elem.hours.map((h, index) => (
                        <div key={index} className='available'>
                            <div key={h['available']}>Disponibles:{h['available']}</div>
                            <div hey={h['hour'] + index} className='hour'>
                                Hora:{h['hour']}:00
                            </div>
                            <div>
                                <button className='deleteBtn' onClick={() => {
                                    const arr = [];
                                    arr.push(elem.date);
                                    DeleteHourOfADay(elem.date, h['hour']);
                                    }}>Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </h2>
            ))}
        </div>
    );
}
