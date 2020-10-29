import React from 'react';
import AvailableInput from './AvailableInput';
import './Form.css';
import WeekForm from './WeekForm';
import HoursForm from './HoursForm';
import postHours from '../../../requests/PostHours';
import PricePerHour from './PricePerHour';


export default function Form({ reload, setReload, value }) {
    let startOfWeek = value.clone().startOf('isoWeek');
    let endOfWeek = value.clone().endOf('isoWeek');
    let daysOfWeek = [];
    let daysInfo = [];
    let hourInfo = [];
    let available = 0;
    let price = 0;

    function setDaysOfWeek() {
        let day = startOfWeek;

        while (day <= endOfWeek) {
            daysOfWeek.push(String(day.toDate()));
            day = day.clone().add(1, 'd');
        }
    }

    function selectHours(hour) {
        if (hourInfo.includes(hour)) {
            hourInfo.splice(hourInfo.indexOf(hour), 1);
        } else {
            hourInfo.push(hour);
        }
        hourInfo.sort((a, b) => a - b);
        console.log(hourInfo);
    }

    function selectDays(days) {
        if (daysInfo.includes(days)) {
            daysInfo.splice(daysInfo.indexOf(days), 1);
        } else {
            daysInfo.push(days);
        }
        daysInfo.sort((a, b) => a - b);
        console.log(daysInfo);
    }

    function printForm(slots) {
        console.log(`dias: ${daysInfo}, horas: ${hourInfo}, available:${slots}, price:${price}`);
        available = slots;
    }

    function changePrice(newPrice) {
        price = newPrice;
    }

    async function sendInfo() {
        let success = await postHours(daysInfo, hourInfo, available, price);
        if (success) {
            const load = (reload === false) ? true : false;
            setReload(load);
        }
    }

    return (
        <div className="form">
            <div className='week'>
                {setDaysOfWeek()}
                <WeekForm reload={reload} days={daysOfWeek} onClick={selectDays}/>
            </div>
            <div className="hours">
                <h3>Seleccione horas para asignar</h3>
                <HoursForm reload={reload} onClick={selectHours} />
            </div>
            <div className="slots">
                <h3>Cantidad de supervisores por hora</h3>
                <AvailableInput reload={reload} onChange={printForm} />
            </div>
            <div className="price">
                <h3>Precio por hora</h3>
                <PricePerHour reload={reload} onChange={changePrice} />
            </div>
            <div className="sendBtn">
                <button onClick={sendInfo}>Crear</button>
            </div>
        </div>
    );
}
