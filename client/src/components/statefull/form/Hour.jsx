import React, { useState } from 'react';
import { useEffect } from 'react';


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
