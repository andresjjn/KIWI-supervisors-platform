import React from 'react';
import './Form.css'

export default function Form() {

    return (
        <div className='form'>
            <div className='days'>
                {['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'].map((d) => (
                    <div className="daySelection" key={d.toString()} onClick={() => console.log('pressed')}>
                        <p>{d}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
