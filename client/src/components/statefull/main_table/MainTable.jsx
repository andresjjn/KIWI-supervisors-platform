import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from '../dashboard/Dashboard';
import Booking from '../booking/Booking';
import Settings from '../settings/Settings';
import './MainTable.css';
import { useAuth0 } from "@auth0/auth0-react";
import getUser from "../../../requests/GetUser";
import { connect } from 'react-redux';
import editUser from '../../../requests/EditUser';

/**
 * MainTable - Main View
 * @param isLoaded If view is complete loaded (redux)
 * @param SetIsLoaded Set Isloaded to true in store (redux)
 * @param setIsAdmin Set IsAdmin to value from Auth0 database to store (redux)
 * @param setUserId Set UserId from Auth0 to store (redux)
 */
const MainTable = ({ isLoaded, setIsLoaded, setIsAdmin, setUserId }) => {
    // Get user Info from Auth0 authentication
    const { user } = useAuth0();

    // Set UserId in Store
    setUserId(user.sub);

    // Get User role from Auth0 metadata
    async function userRole() {
        const res = await getUser(user.sub);
        if (res.user_metadata !== undefined && res.user_metadata.role === 'admin') {
            setIsAdmin(true);
            setIsLoaded(true);
        } else if (res.user_metadata !== undefined && res.user_metadata.role === 'supervisor') {
            setIsAdmin(false);
            setIsLoaded(true);
        } else {
            await editUser(user.sub, false);
        }
    }

    // Notify User if email is not verified
    if (!user.email_verified) {
        console.log("No olvide verificar su cuenta (Usted ya recibió para hacer esto)");
    }

    // If view is not loaded show a Banner and load info from Auth0
    if (!isLoaded) {
        userRole();
        return <div className='waiting'><h1>Esperando a ser activado...</h1></div>
    }

    // Return all the routes for the user, only if has admin or supervisor role
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

// Get props from Store
const mapStoreToProps = state => ({
    isLoaded: state.isLoaded
})

// Send dispacth to Store
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
    },

    setUserId(setUserId) {
        dispatch({
            type: "SetUserId",
            setUserId,
        })
    }
})

// Connect this Component with Store
export default connect(mapStoreToProps, mapDispatchToProps)(MainTable);
