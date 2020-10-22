import React, { useState, useEffect } from 'react';
import formatedDate from '../formatedDate';
import './HoursDay.css';
import deleteHourOfADay from '../../../requests/DeleteHourOfADay';
import assignHourOfADay from '../../../requests/AssignHourOfADay';
import MapHours from './MapHours';
import { Loading, NoConnection, NoHours } from '../../stateless/DashboardMessages';
import sortHours from './SortHours';
import isAdmin from '../../../IsAdmin'
import unassignHourOfADay from '../../../requests/UnassignHourOfADay';

let axios = require("axios");

export default function HoursDay({ reload, value }) {
    const [isLoading, setLoading] = useState(true);
    const [day, setDay] = useState({});
    const [requestFail, setRequestFail] = useState(false);
    const [counter, setCounter] = useState(1);
    const getDay = value.format('YYYYMMDD');
    const cName = isAdmin() ? "booking_list_container" : "booking_list_container2"
    let hoursLength = 0;

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}days/${getDay}`)
            .then((response) => {
                setDay(response.data);
                setLoading(false);
                setRequestFail(false);
            })
            .catch(() => {
                setRequestFail(true);
                setLoading(false);
            });
    }, [getDay, reload]);

    useEffect(() => {
        setTimeout(() => setCounter(counter + 1), 15000);
        console.log("REFRESH");
        refreshList();
    }, [counter]);

    function refreshList() {
        axios.get(`${process.env.REACT_APP_API_URL}days/${getDay}`)
            .then((response) => {
                setDay(response.data);
                setLoading(false);
                setRequestFail(false);
            })
            .catch(() => {
                setRequestFail(true);
                setLoading(false);
            });
    }

    useEffect(() => { /*Called every time day change the state*/ }, [day]);

    if (isLoading) { return <Loading />; }
    else if (requestFail) { return <NoConnection />; }

    hoursLength = day.hours.length;
    if (hoursLength > 0) {
        sortHours(day.hours);
    }

    async function deleteHour(date, hour, index) {
        let respone = await deleteHourOfADay(date, hour);
        if (respone === true) {
            const newDay = { ...day };
            newDay.hours.splice(index, 1);
            setDay(newDay);
        }
    }

    async function assignHour(date, hour, index) {
        let respone = await assignHourOfADay(date, hour, "123456789"); //cambiar por id
        if (respone === true) {
            refreshList();
        }
    }

    async function unassignHour(date, hour, index) {
        let respone = await unassignHourOfADay(date, hour, "123456789"); //cambiar por id
        if (respone === true) {
            refreshList();
        }
    }

    const functions = [deleteHour, assignHour, unassignHour];

    return (
        <div className={cName}>
            <div className='card'>
                <div className='info_section'>
                    <p>{formatedDate(day.date)}</p>
                </div>
                {(hoursLength > 0) ? <MapHours day={day} onClick={functions} /> : <NoHours />}
            </div>
        </div>
    );
}
