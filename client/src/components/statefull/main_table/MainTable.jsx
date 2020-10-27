import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from '../dashboard/Dashboard';
import Booking from '../booking/Booking';
import Settings from '../settings/Settings';
import './MainTable.css';
import { useAuth0 } from "@auth0/auth0-react";
import getUser from "../../../requests/GetUser";
import { connect } from 'react-redux';


const MainTable = ({ isLoaded, setIsLoaded, setIsAdmin }) => {
    const { user } = useAuth0();

    async function userRole() {
        const res = await getUser(user.sub);
        if (res.user_metadata !== undefined && res.user_metadata.role === 'admin') {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
        setIsLoaded(true);
    }

    if (!user.email_verified) {
        console.log("No olvide verificar su cuenta (Usted ya recibió para hacer esto)");
    }

    if (!isLoaded) {
        userRole();
        return <h1>Cargando...</h1>
    }

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

const mapStoreToProps = state => ({
    isLoaded: state.isLoaded
})

const mapDispatchToProps = dispatch => ({
    setIsLoaded(setLoaded, setAdmin) {
        dispatch({
            type: "SetIsLoaded",
            setLoaded,
        })
    },

    setIsAdmin(setAdmin) {
        dispatch({
            type: "SetIsAdmin",
            setAdmin,
        })
    }
})

export default connect(mapStoreToProps, mapDispatchToProps)(MainTable);
