import React from 'react';
import Logout from '../logout/Logout';
import { useAuth0 } from "@auth0/auth0-react";
// import Notification from '../notification/Notification';
import './InfoBar.css'

export default function InfoBar() {
    const { user } = useAuth0();
    return (
        <div className="info_bar">
            <div className="info_user">
                <p>{user.name}-</p>
                <p>{user.sub.slice(6)}</p>
            </div>
            <div className="info_container">
                <Logout />
            </div>
        </div>
    );
}
