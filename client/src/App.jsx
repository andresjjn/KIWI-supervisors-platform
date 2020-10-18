import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Logout from "./button_logout/logout_button";
import Notification from "./button_notification/notification_button";
import Navbar from "./components/Statefull/NavBar";
import Dashboard from "./components/Statefull/Dashboard/Dashboard";
import Booking from "./components/Statefull/Booking";
import Settings from "./components/Statefull/Settings/Settings";
import AuthenticationButton from "./components/Statefull/AuthenticationButton";
import { withAuthenticationRequired } from "@auth0/auth0-react";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Navbar />
                <div className="main_section">
                    <div className="info_bar">
                        <Logout />
                        <AuthenticationButton />
                        <Notification />
                    </div>
                    <div className="main_table">
                        <Router>
                            <Switch>
                                <Route path="/" exact component={Dashboard} />
                                <Route path="/booking" component={Booking} />
                                <Route path="/settings" component={Settings} />
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

export default withAuthenticationRequired(App);
