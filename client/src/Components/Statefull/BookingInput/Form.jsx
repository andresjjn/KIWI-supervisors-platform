import React from 'react';
import Day from './Day';
import Hour from './Hour';
import AvailableInput from './AvailableInput';
import './Form.css';
import isYesterday from './Today';


export default function Form(props) {
    const { value } = props;

    let startOfWeek = value.clone().startOf('isoWeek');
    let endOfWeek = value.clone().endOf('isoWeek');

    const dirDays = {'LUN': 0, 'MAR': 1, 'MIÉ': 2, 'JUE': 3, 'VIE': 4, 'SÁB': 5, 'DOM': 6};
    let daysInfo = [];

    let hourInfo = [];
    const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

    function setDaysOfWeek(index) {
        let days = [];
        let day = startOfWeek;

        while (day <= endOfWeek) {
            days.push(String(day.toDate()));
            day = day.clone().add(1, 'd');
        }

        return days[index];
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
        if (days === undefined) {
            return;
        }

        if (daysInfo.includes(days)) {
            daysInfo.splice(daysInfo.indexOf(days), 1);
        } else {
            daysInfo.push(days);
        }
        daysInfo.sort((a, b) => a - b);
        console.log(daysInfo);
    }

    function printForm(available) {
        console.log(`dias: ${daysInfo}, horas: ${hourInfo}, available:${available}`);
    }

    return (
        <div className="form">
            <div className="days">
                {Object.keys(dirDays).map((key, value) => (
                    <Day
                        key={key}
                        name={key}
                        date={setDaysOfWeek(value)}
                        onClick={selectDays}
                    />
                ))}
            </div>
            <div className="hours">
                <h3>Seleccione horas para asignar</h3>
                <div className="hours_container">
                    {hours.map((elem) => (
                        <Hour key={elem} hour={elem} onClick={selectHours} />
                    ))}
                </div>
            </div>
            <div className="slots">
                <h3>Cantidad de supervisores por hora</h3>
                <AvailableInput onChange={printForm}/>
            </div>
            <div className="sendBtn">
                <button>Enviar</button>
            </div>
        </div>
    );
}
