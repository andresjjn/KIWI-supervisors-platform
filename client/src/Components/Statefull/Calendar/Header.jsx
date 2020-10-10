import React from 'react';

export default function CalendarHeader(props) {
    const { value, setValue } = props;

    function currentMonthName() {
        let date = value.format('LL');
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
        value.format('YYYY');
    }

    function previousMonth() {
        return value.clone().subtract(1, 'month');
    }

    function nextMonth() {
        return value.clone().add(1, 'month');
    }

    return (
        <div className='header'>
            <div className='previous' onClick={() => setValue(previousMonth())}>{String.fromCharCode(171)}</div>
            <div className='current'>{currentMonthName()} {currentYear()}</div>
            <div className='next' onClick={() => setValue(nextMonth())}>{String.fromCharCode(187)}</div>
        </div>
    );
}
