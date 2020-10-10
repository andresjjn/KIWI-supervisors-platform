import React, { Component } from 'react';
import './Settings.css'

class Settings extends Component {
    render() { 
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
}
 
export default Settings;
