import React from 'react';
import Hour from './Hour';

export default function HourForm({ reload, onClick }) {
    const hours = { '0:00': 0, '1:00': 1, '2:00': 2, '3:00': 3, '4:00': 4, '5:00': 5, '6:00': 6, '7:00': 7, '8:00': 8,
                    '9:00': 9, '10:00': 10, '11:00': 11, '12:00': 12, '13:00': 13, '14:00': 14, '15:00': 15, '16:00': 16,
                    '17:00': 17, '18:00': 18, '19:00': 19, '20:00': 20, '21:00': 21, '22:00': 22, '23:00': 23 };

    return (
        <div className="hours_container">
            {Object.keys(hours).map((key, value) => (
                <Hour reload={reload} key={key} hour={key} value={value} onClick={onClick} />
            ))}
        </div>
    );
}
