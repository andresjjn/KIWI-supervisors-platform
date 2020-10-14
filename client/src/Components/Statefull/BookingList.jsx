import React from "react";
import "./BookingList.css";

export default function BookingList() {
    let daysList = []
    var axios = require("axios");

    var config = {
        method: "get",
        url: `${process.env.REACT_APP_API_URL}days/`,
        headers: {},
    };

    axios(config)
        .then(function (response) {
            daysList = JSON.stringify(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
        
        console.log('Day list: ', daysList);

    return (
        <div className="booking_list_container">
            
        </div>
    );
}
