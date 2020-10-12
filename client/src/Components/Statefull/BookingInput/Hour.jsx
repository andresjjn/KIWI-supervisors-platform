import React from 'react'

export default function Hour(props) {
    const { hour, onClick } = props;


    return (
        <div>
            <button onClick={() => onClick(hour)}>{hour}</button>
        </div>
    );
}
