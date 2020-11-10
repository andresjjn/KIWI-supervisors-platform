import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from '../dashboard/Dashboard';
import Booking from '../booking/Booking';
import Settings from '../settings/Settings';
import './MainTable.css';

export default function MainTable() {
    return (
        <div className="main_table">
            <Router>
                <Switch>
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/booking" component={Booking} />
                    <Route path="/settings" component={Settings} />
                </Switch>
            </Router>
        </div>
    );
}
