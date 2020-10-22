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

    function isAdded(slots) {
        for (let slot of slots) {
            if (!isAdmin() && slot.id === 123456789) {//cambiar id
                return true;
            }
        }
        return false;
    }

    console.log(day.hours);

    return day.hours.map((elem, index) =>
        <div key={`available ${elem.hour}`} className={isAdded(elem.slots) ? 'assigned' : 'available'}>
            <div key={`hour ${elem.hour}`} className='hour'>{elem['hour']}:00</div>
            <div key={elem['available']}>Slots disponibles: {elem["available"]}</div>
            <div>
                {isAdmin() && (beforeDay >= today) &&
                    <button className="deleteBtn" onClick={() => onClick[0](day.date, elem.hour, index)}>.
                </button>}
                {!isAdmin() && (beforeDay >= today) && !isAdded(elem.slots) &&
                    <button className="addBtn" onClick={() => onClick[1](day.date, elem.hour, index)}>.
                </button>}
                {!isAdmin() && (beforeDay >= today) && isAdded(elem.slots) &&
                    <button className="minusBtn" onClick={() => onClick[2](day.date, elem.hour, index)}>.
                </button>}
            </div>
        </div>
    );
}
