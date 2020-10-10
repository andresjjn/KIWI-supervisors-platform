import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Logout from "./button_logout/logout_button";
import Notification from "./button_notification/notification_button";
import Navbar from "./Components/Statefull/NavBar";
import Dashboard from "./Components/Statefull/Dashboard/Dashboard";
import Booking from "./Components/Statefull/Booking";
import Settings from "./Components/Statefull/Settings/Settings";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="main_section">
          <div className="info_bar">
            <Logout />
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
