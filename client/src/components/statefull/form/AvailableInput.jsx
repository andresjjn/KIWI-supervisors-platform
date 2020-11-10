import React, { useState, useEffect } from 'react';

/**
 * Function that manages the hours to be assigned
 * @param reload State variable that reload the form component.
 * @param onChange Function that print the info in the form.
 */
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
