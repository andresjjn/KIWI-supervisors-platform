import React, { useState, useEffect } from "react";
import "./BookingList.css";
// import deleteDaysRequest from '../../requests/deleteDaysRequest';

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
        daysList.sort((a, b) => {
            if (a.date > b.date) {
                return 1;
            }
            if (a.date < b.date) {
                return -1;
            }
            return 0;
        });
    }

    return (
        <div className="booking_list_container">
            {daysList.map((element, index) => (
                <h2 key={element._id}>
                    {element.date} - {element._id}
                    {element.hours.map((h) =>
                        <div key={h}>
                            <div key={h['available']}>Available: {h['available']}</div>
                            <div hey={h['hour']}>
                                Hora: {h['hour']}
                                <button>Delete</button>
                            </div>
                        </div>
                    )}
                </h2>
            ))}
        </div>
    );
}
