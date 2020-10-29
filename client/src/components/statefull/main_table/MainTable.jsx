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


const MainTable = ({ isLoaded, setIsLoaded, setIsAdmin, setUserId }) => {
    const { user } = useAuth0();

    setUserId(user.sub);
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

    if (!user.email_verified) {
        console.log("No olvide verificar su cuenta (Usted ya recibió para hacer esto)");
    }

    if (!isLoaded) {
        userRole();
        return <div className='waiting'><h1>Esperando a ser activado...</h1></div>
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
    },

    setUserId(setUserId) {
        dispatch({
            type: "SetUserId",
            setUserId,
        })
    }
})


export default connect(mapStoreToProps, mapDispatchToProps)(MainTable);
