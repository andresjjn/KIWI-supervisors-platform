import React, { useState, useEffect } from 'react';


/**
 * Function that returns the input component of the price.
 */
export default function PricePerHour({ reload, onChange }) {
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
