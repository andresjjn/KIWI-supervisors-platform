import React from 'react';
import Moment from 'moment';
import './Header.css'

export default function CalendarHeader(props) {
    const { value, setValue } = props;

    function currentMonthName() {
        let date = value.format('MMMM');
        const monthsEnglish = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const monthsSpanish = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        let finalDate = '';
        for (let i = 0; i < 12; i++) {
            if (date.includes(monthsEnglish[i])) {
                finalDate = date.replace(monthsEnglish[i], monthsSpanish[i]);
                break;
            }
        }
        return finalDate;
    }

    function currentYear() {
        return value.format('YYYY');
    }

    function previousMonth() {
        return value.clone().subtract(1, 'month');
    }

    function nextMonth() {
        return value.clone().add(1, 'month');
    }

    function currentDay() {
        return Moment();
    }

    return (
        <div className='header'>
            <div className='date'>{currentMonthName()} {currentYear()}</div>
            <div className='picker'>
                <div className='previous' onClick={() => setValue(previousMonth())}>{'<'}</div>
                <div className='today' onClick={() => setValue(currentDay())}>{'HOY'}</div>
                <div className='next' onClick={() => setValue(nextMonth())}>{'>'}</div>
            </div>
        </div>
    );
}
