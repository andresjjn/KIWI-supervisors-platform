import React, { useState } from 'react';
import getUsers from '../../../requests/GetUsers';

export default function Board() {
    const [supervisors, setSupervisors] = useState([]);

    return (
        <>
            {supervisors.map(user => (
                <div className='user'> {user.name}</div>
            ))}
        </>
    )
}
