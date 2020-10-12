import React from 'react';
import Day from './Day';
import './Form.css'

export default function Form(props) {
    const { value } = props;

    let startOfWeek = value.clone().startOf('isoWeek');
    let endOfWeek = value.clone().endOf('isoWeek');

    function setDaysOfWeek(index) {
        let days = [];
        let day = startOfWeek;

        while (day <= endOfWeek) {
            days.push(String(day.toDate()));
            day = day.clone().add(1, 'd');
        }

        return days[index];
    }

    return (
        <div className='form'>
            <div className='days'>
                <Day name='LUN' date={setDaysOfWeek(0)}/>
                <Day name='MAR' date={setDaysOfWeek(1)}/>
                <Day name='MIÉ' date={setDaysOfWeek(2)}/>
                <Day name='JUV' date={setDaysOfWeek(3)}/>
                <Day name='VIE' date={setDaysOfWeek(4)}/>
                <Day name='SÁB' date={setDaysOfWeek(5)}/>
                <Day name='DOM' date={setDaysOfWeek(6)}/>
            </div>
            <div className='hours'>
                
            </div>
        </div>
    );
}
