import React, { useState } from 'react';
import './NavBar.css';
import Logo from './Logo';
import DashboardIcon from '../../images/dashboard.svg';
import BookingIcon from '../../images/queue.svg';
import SettingsIcon from '../../images/settings.svg';
import NavItem from '../stateless/NavItem';
import Logout from './logout/Logout';
import { useAuth0 } from "@auth0/auth0-react";


export default function Navbar() {

    const { user } = useAuth0();
    console.log(user);
    return (
        <div className='navbar'>
            <div className={'navbarView'}>
                <Logo cName="logo" />
                <div className="infoUser">
                    <img src={user.picture} />
                    <h4>{user.nickname}</h4>
                </div>
                <div className="menuViews">
                    <NavItem link="/" className='tablero' icon={DashboardIcon} text={'Tablero'} />
                    <NavItem link="/booking" className='reservas' icon={BookingIcon} text={'Reservas'} />
                    <NavItem link="/settings" className='gestionar' icon={SettingsIcon} text={'Gestionar'} />
                </div>
                <Logout />
            </div>
        </div>
    );
}
