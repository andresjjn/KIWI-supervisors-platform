import React from 'react'

export default function CalendarHeader(props) {
    const { value, setValue } = props;

    function currentMonthName() {
        return value.format('MMMM');
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
