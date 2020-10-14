import React, { useState, useEffect } from "react";
import "./BookingList.css";
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
        console.log("Cargando");
        return <h1>Test Loading . . .</h1>;
    } else {
        console.log(daysList[0]);
        daysList.sort((a, b) => {
            if (a.date > b.date) {
                return 1;
            }
            if (a.date < b.date) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });
    }
    return (
        <div className="booking_list_container">
            {daysList.map((element) => (
                <h2>
                    {element.date} - {element._id}
                </h2>
            ))}
        </div>
    );
}
