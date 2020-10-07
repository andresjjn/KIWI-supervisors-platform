import React, { Component } from 'react';
import './App.css';
import Logout from './button_logout/logout_button'
import Notification from './button_notification/notification_button'
import Navbar from './Components/Statefull/NavBar';

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <Logout />
                <Notification />
                <Navbar/>
            </div>
        );
    }
}
