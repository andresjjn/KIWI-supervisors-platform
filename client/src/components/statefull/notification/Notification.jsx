import React from 'react';
import './Notification.css';
import NotificationIcon from '../../../images/notification.svg'

/**
 * NotificationButton - Component To show alerts
 */
export default function NotificationButton() {
    return (
        <div className='notification'>
            <img className='notification_icon' src={NotificationIcon} alt=''></img>
        </div>
    );
}
