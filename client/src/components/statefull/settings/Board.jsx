import React, { useState } from 'react';
import getUsers from '../../../requests/GetUsers';

export default function Board() {
    const [supervisors, setSupervisors] = useState([]);

    let arr = [];
    let mapeo = []
    async function fillSupervisors() {
        const res = await getUsers();
        for (let user of res) {
            if (user.role === 'admin') { arr.push(user) }
        }
        setSupervisors(arr);
    }
    if (supervisors.length === 0) {
        fillSupervisors();
    } else {
        mapeo = supervisors.map(user => (
            <div className='supervisor' key={user.id}>
                <h6 className='supervisorName'>{user.name}</h6>
                <h6 className='supervisorId'>{user.id}</h6>
                <div className='supervisorMenu'>
                    <button className='editSupervisor'>Editar</button>
                    <button className='deleteSupervisor'>Borrar</button>
                </div>
            </div>
        ))
    }
    return (
        <>
            <div className='supervisors'>

                <div className='supervisorsTittle'>
                    <h2>Name</h2>
                    <h2>Id</h2>
                    <h2>Menu</h2>
                </div>
                {(supervisors.length > 0) ? mapeo : <h1>CAGANDO</h1>}
            </div>
        </>
    )
}
