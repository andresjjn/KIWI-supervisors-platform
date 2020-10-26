import React, { useState } from 'react';
import './NavBar.css';
import Logo from './Logo';
import DashboardIcon from '../../images/dashboard.svg';
import BookingIcon from '../../images/queue.svg';
import SettingsIcon from '../../images/settings.svg';
import NavItem from '../stateless/NavItem';


export default function Navbar() {
    const [isOpen, setOpen] = useState(false);
    const [cName, setCName] = useState('compressed');

    function changeDimension() {
        if (isOpen) {
            setOpen(false);
            setCName('compressed');
        } else {
            setOpen(true);
            setCName('extended');
        }
    }

    return (
        <div className='navbar'>
            <div onMouseEnter={changeDimension} onMouseLeave={changeDimension} className={cName}>
                <Logo cName={cName} isOpen={isOpen} />
                <NavItem link="/" className={cName} icon={DashboardIcon} text={isOpen && 'Tablero'} />
                <NavItem link="/booking" className={cName} icon={BookingIcon} text={isOpen && 'Reservas'} />
                <NavItem link="/settings" className={cName} icon={SettingsIcon} text={isOpen && 'Gestionar'} />
            </div>
        </div>
    );
}
