import React from 'react'

export default function Day(props) {
    const { name, date, onClick } = props;
    const months = {'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'};
    const info = date.split(' ');
    const finalDate = `${info[3]}${months[info[1]]}${info[2]}`;

    return (
        <div>
            <button onClick={() => onClick(finalDate)}>{name}-{info[2]}</button>
            <p>{finalDate}</p>
        </div>
    );
}
