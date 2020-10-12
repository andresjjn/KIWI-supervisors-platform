import React from 'react';


export default function AvailableInput(props) {
    const { onChange } = props;
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
