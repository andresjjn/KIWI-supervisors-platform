import React from 'react';


export default function AvailableInput({ onChange }) {
    let available;

    function changeValue(event) {
        available = event.target.value;
        return available;
    }

    return (
        <input
            value={available}
            onChange={(event) => onChange(changeValue(event))}
            type="number"
        />
    );
}
