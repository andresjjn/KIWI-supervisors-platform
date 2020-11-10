import React from 'react';
import './DaysName.css'

export default function DaysName() {
    return (
        <div className="days_name">
            {["lun", "mar", "mié", "jue", "vie", "sáb", "dom"].map((d) => (
                <div className="nameDay" key={d.toString()}><p>{d}</p></div>
            ))}
        </div>
    );
}
