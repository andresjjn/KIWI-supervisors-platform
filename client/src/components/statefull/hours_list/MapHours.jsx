import React from 'react';
import Moment from 'moment';
import isAdmin from '../../../IsAdmin';

/**
 * MapHours - Create a list of hours.
 * @param day Array to map.
 * @param onClick Function to pass to onClick child.
 */
export default function MapHours({ day, onClick }) {
    const beforeDay = Number(day.date);
    const today = Number(Moment().format('YYYYMMDD'));

    return day.hours.map((elem, index) =>
        <div key={`available ${elem.hour}`} className='available'>
            <div key={`hour ${elem.hour}`} className='hour'>{elem['hour']}:00</div>
            <div key={elem['available']}>Slots disponibles: {elem["available"]}</div>
            <div>
                {isAdmin() && (beforeDay >= today) &&
                <button className="deleteBtn" onClick={() => onClick(day.date, elem.hour, index) }>.
                </button>}
            </div>
        </div>
    );
}
