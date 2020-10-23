import React from 'react';
import './Settings.css';
import getUsers from '../../../requests/GetUsers'
import Board from './Board'

export default function Settings() {
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
