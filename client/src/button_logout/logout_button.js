import React from 'react';
import './logout_button.css';
import LogoutIcon from '../images/logout.svg';


export default function LogoutButton() {
    return (
        <button className='logout'>
            <img className='logout_icon' src={LogoutIcon} alt=''></img>
        </button>
    );
}
