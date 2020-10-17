import React from 'react'

/**
 * MapHours - Create a list of hours.
 * @param day Array to map.
 * @param funct Function to call in onClick.
 */
export default function MapHours({ day, funct }) {
    return day.hours.map((elem, index) =>
        <div key={`available ${elem.hour}`} className='available'>
            <div key={`hour ${elem.hour}`} className='hour'>{elem['hour']}:00</div>
            <div key={elem['available']}>Slots disponibles: {elem["available"]}</div>
            <div>
                <button className="deleteBtn" onClick={() => funct(day.date, elem.hour, index) }>.
                </button>
            </div>
        </div>
    );
}
