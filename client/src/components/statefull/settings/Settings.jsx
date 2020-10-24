import React, { useState } from 'react';
import './Settings.css';
import getUsers from '../../../requests/GetUsers'
import Board from './Board'
import getSupervisors from '../../../requests/GetSupervisors';

export default function Settings() {
    const [supervisors, setSupervisors] = useState([]);

    async function fillSupervisors() {
        let arr = [];
        const users = await getUsers();
        console.log("ACAAAAAAA");
        console.log(users);
        if (users) {
            arr = await getSupervisors(users);
            /* setSupervisors(arr); */
        }
    }
    if (supervisors.length === 0) {
        fillSupervisors();
        return <h1>CARGANDO</h1>
    } else {
        /* mapeo = supervisors.map(user => (
            <div className='supervisor' key={user.user_id}>
                <h6 className='supervisorName'>{user.nickname}</h6>
                <h6 className='supervisorId'>{String(user.user_id).slice(6)}</h6>
                <div className='supervisorMenu'>
                    <button className='editSupervisor'>Editar</button>
                    <button className='deleteSupervisor'>Borrar</button>
                </div>
            </div>
        )) */
        return <h1>Holi</h1>;
    }
    return (
        <div className='bodySettings'>
            <div className='settingsTittle'>
                <h1>Administracion de Cuentas</h1>
            </div>
            <Board />
            <button onClick={getUsers}>Crear</button>
        </div>
    );
}
