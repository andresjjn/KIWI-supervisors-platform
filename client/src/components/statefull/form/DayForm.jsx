import React, { useState, useEffect } from 'react';
import isYesterday from './DayCheck';


/**
 * Function that manages the days components in the form.
 */
export default function DayForm({ reload, dayName, date, onClick }) {
    const months = { 'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12' };
    const info = date.split(' ');
    const [isSelected, setSelected] = useState('default');
    const finalDate = `${info[3]}${months[info[1]]}${info[2]}`;

    useEffect(() => {
        setSelected('default');
    }, [reload]);

    function classNameSelection() {
        const cName = (isSelected !== 'selected') ? 'selected' : 'default';
        setSelected(cName);
        return finalDate;
    }

    return (
        <button
            className={(!isYesterday(finalDate)) ? isSelected : 'past'}
            onClick={() => !isYesterday(finalDate) && onClick(classNameSelection())}
        >
            {dayName}-{Number(info[2])}
        </button>
    );
}
