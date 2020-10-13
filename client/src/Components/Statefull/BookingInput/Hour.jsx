import React, { useState } from 'react'
import './Hour.css'


export default function Hour(props) {
    const [isSelected, setSelected] = useState("defaultBtn");
    const { hour, onClick } = props;


    function classNameSelection() {
        if (isSelected === "defaultBtn") {
            setSelected("selectedBtn");
        } else {
            setSelected("defaultBtn");
        }
        return hour
    }

    return (
        <div>
            <button className={isSelected} onClick={() => onClick(classNameSelection())}>{hour}</button>
        </div>
    );
}
