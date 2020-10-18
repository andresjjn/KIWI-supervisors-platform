import React from 'react';
import './Settings.css';

export default function Settings() {
    return (
        <div className='bodySettings'>
            <div className='settingsTittle'>
                <h1>Administracion de Cuentas</h1>
            </div>
            <div className='settingsView'>
                <button>Crear</button>
                <button>Modificar</button>
                <button>Eliminar</button>
            </div>
        </div>
    );
}
