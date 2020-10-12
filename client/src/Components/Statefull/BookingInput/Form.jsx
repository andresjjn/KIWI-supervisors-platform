import React from 'react';
import './Form.css'
import DaySelector from './DaySelector';
import { useState } from 'react';

export default function Form(props) {
    const { value } = props;
    const [name, setName] = useState('Reservas');
    const date = value.format('YYYYMM');
    let startOfWeek = value.clone().startOf('isoWeek');
    let endOfWeek = value.clone().endOf('isoWeek');

    function setDaysOfWeek() {
        let days = [];
        let day = startOfWeek;

        while (day <= endOfWeek) {
            days.push(String(day.toDate()).slice(8, 10));
            day = day.clone().add(1, 'd');
        }

        return days;
    }

    function test(val) {
        setName(`${date}${val}`);
    }

    return (
        <div className='form'>
            <h1 onClick={() => test()}>{name}</h1>
            <div key='dayDiv' className='days'>
                <DaySelector onClick={test} arr={setDaysOfWeek()}/>
            </div>
        </div>
    );
}
