import React from 'react';
import DayForm from './DayForm';

/**
 * WeekForm - Create a list of hours.
 * @param reload Redraw child components
 * @param days Array to map (Days of the week).
 * @param onClick Function to pass to onClick child.
 */
export default function WeekForm({ reload, days, onClick }) {
    const dirDays = { 'LUN': 0, 'MAR': 1, 'MIÉ': 2, 'JUE': 3, 'VIE': 4, 'SÁB': 5, 'DOM': 6 };

    return (
        <>
            {Object.keys(dirDays).map((key, value) => (
                <DayForm reload={reload} key={key} dayName={key} date={days[value]} onClick={onClick} />
            ))}
        </>
    );
}
