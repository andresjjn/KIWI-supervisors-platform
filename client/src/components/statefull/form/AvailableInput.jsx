import React, { useState, useEffect } from 'react';

export default function AvailableInput({ reload, onChange }) {
    let [value, setValue] = useState('');

    useEffect(() => {
        setValue('');
    }, [reload]);

    function changeValue(event) {
        setValue(event.target.value);
        return event.target.value;
    }

    return (
        <input
            value={value}
            onChange={(event) => onChange(changeValue(event))}
            type="number"
        />
    );
}
