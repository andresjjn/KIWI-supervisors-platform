import React from 'react';
import Day from './Day';
import Hour from './Hour';
import AvailableInput from './AvailableInput';
import './Form.css';
import postDays from '../../../requests/postDays';
import getDaysRequest from "../../../requests/getDaysRequest";
import deleteDaysRequest from "../../../requests/deleteDaysRequest";


export default function Form(props) {
    const { value } = props;

    let startOfWeek = value.clone().startOf('isoWeek');
    let endOfWeek = value.clone().endOf('isoWeek');

    const dirDays = {'LUN': 0, 'MAR': 1, 'MIÉ': 2, 'JUE': 3, 'VIE': 4, 'SÁB': 5, 'DOM': 6};
    let daysInfo = [];

    let hourInfo = [];
    const hours = { '0:00': 0, '1:00': 1, '2:00': 2, '3:00': 3, '4:00': 4, '5:00': 5, '6:00': 6, '7:00': 7, '8:00': 8, '9:00': 9, '10:00': 10, '11:00': 11, '12:00': 12, '13:00': 13, '14:00': 14, '15:00': 15, '16:00': 16, '17:00': 17, '18:00': 18, '19:00': 19, '20:00': 20, '21:00': 21, '22:00': 22, '23:00': 23};
    let available = 0;

    let days = [];
    function setDaysOfWeek() {
        let day = startOfWeek;

        while (day <= endOfWeek) {
            days.push(String(day.toDate()));
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
        // console.log(hourInfo);
    }

    function selectDays(days) {
        if (daysInfo.includes(days)) {
            daysInfo.splice(daysInfo.indexOf(days), 1);
        } else {
            daysInfo.push(days);
        }
        daysInfo.sort((a, b) => a - b);
        // console.log(daysInfo);
    }

    function printForm(slots) {
        console.log(`dias: ${daysInfo}, horas: ${hourInfo}, available:${slots}`);
        available = slots;
    }

    return (
        <div className="form">
            <div className="days">
                {setDaysOfWeek()}
                {Object.keys(dirDays).map((key, value) => (
                    <Day
                        key={key}
                        name={key}
                        date={days[value]}
                        onClick={selectDays}
                    />
                ))}
            </div>
            <div className="hours">
                <h3>Seleccione horas para asignar</h3>
                <div className="hours_container">
                    {Object.keys(hours).map((key, value) => (
                        <Hour key={key} hour={key} value={value} onClick={selectHours} />
                    ))}
                </div>
            </div>
            <div className="slots">
                <h3>Cantidad de supervisores por hora</h3>
                <AvailableInput onChange={printForm} />
            </div>
            <div className="sendBtn">
                <button onClick={() => postDays(daysInfo, hourInfo, available)}>Crear Dias</button>
                <button onClick={getDaysRequest}>Ver</button>
                <button onClick={() => deleteDaysRequest(daysInfo, hourInfo, available)}>Borrar</button>
            </div>
        </div>
    );
}
