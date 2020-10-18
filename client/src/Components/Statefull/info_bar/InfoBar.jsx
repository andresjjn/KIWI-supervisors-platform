import React from 'react';
import Logout from '../logout/Logout';
import AuthenticationButton from '../AuthenticationButton';
import Notification from '../notification/Notification';
import './InfoBar.css'

export default function InfoBar() {
    return (
        <div className="info_bar">
            <Logout />
            <AuthenticationButton />
            <Notification />
        </div>
    );
}
