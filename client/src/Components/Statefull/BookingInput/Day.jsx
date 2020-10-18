import React, {useState} from 'react';
import "./Day.css";
import isYesterday from './DayCheck';

export default function Day({ name, date, onClick }) {
    const months = {'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'};
    const info = date.split(' ');
    const [isSelected, setSelected] = useState('default');
    const finalDate = `${info[3]}${months[info[1]]}${info[2]}`;

    function classNameSelection() {
        if (isSelected === 'default') {
            setSelected('selected')
        }
        else {
            setSelected('default')
        }
        return finalDate;
    }

    return (
        <div>
            {!isYesterday(finalDate) &&
            <button
                className={isSelected}
                onClick={() => onClick(classNameSelection())}
            >
                {name}-{Number(info[2])}
            </button>
            }
        </div>
    );
}
