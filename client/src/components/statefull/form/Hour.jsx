import React, { useState } from 'react';
import { useEffect } from 'react';


/**
 * Function that manages the hours components in the form.
 */
export default function Hour({ reload, hour, value, onClick }) {
    const [isSelected, setSelected] = useState("defaultBtn");

    useEffect(() => {
        setSelected('defaultBtn');
    }, [reload]);

    function selection() {
        if (isSelected === "defaultBtn") {
            setSelected("selectedBtn");
        } else {
            setSelected("defaultBtn");
        }
        return value
    }

    return (
        <div>{
            <button className={isSelected} onClick={() => onClick(selection())}>
                {hour}
            </button>}
        </div>
    );
}
