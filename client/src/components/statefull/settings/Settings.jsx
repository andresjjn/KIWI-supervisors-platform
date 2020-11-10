import React from 'react';
import './Settings.css';
import Board from './Board';
import getUsers from '../../../requests/GetUsers';
import { Loading } from '../../stateless/DashboardMessages';
import { connect } from 'react-redux';

/**
 * Settings - View for accounts info
 * @param isAdmin If the user in session is admin
 * @param supervisors user accounts list from store (redux)
 * @param setSupervisors Set User role content from store (redux)
 */
const Settings = ({ isAdmin, supervisors, setSupervisors }) => {

    // Get user from Auth0 with any role different than admin and notify the store
    async function fillBoard() {
        let listUsers = [];

        try {
            const users = await getUsers();
            for (const user of users) {
                if (user.user_metadata === undefined || user.user_metadata.role !== 'admin') {
                    listUsers.push(user);
                }
            }
            setSupervisors(listUsers);
        } catch (error) { console.log(error); }
    }

    // If view is not loaded, try to get info and then render all users
    if (supervisors.length === 0) {
        fillBoard();
        return Loading();
    } else {
        return (
            isAdmin && <div className='bodySettings'>
                <div className='settingsTittle'>
                    <h1>Administracion de Supervisores</h1>
                </div>
                <Board />
            </div>
        );
    }
}

// Map props from store
const mapStoreToProps = state => ({
    isAdmin: state.isAdmin,
    supervisors: state.supervisors
})

// Set dispatch to Store
const mapDispatchToProps = dispatch => ({
    setSupervisors(supervisors) {
        dispatch({
            type: "SetSupervisors",
            supervisors,
        })
    },
})

// Connect component with the store
export default connect(mapStoreToProps, mapDispatchToProps)(Settings);
