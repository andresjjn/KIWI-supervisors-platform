import React from 'react';
import './Settings.css';
import Board from './Board';
import getUsers from '../../../requests/GetUsers';
import { Loading } from '../../stateless/DashboardMessages';
import { connect } from 'react-redux';


const Settings = ({ isAdmin, supervisors, setSupervisors }) => {

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
                <button>Crear</button>
            </div>
        );
    }
}


const mapStoreToProps = state => ({
    isAdmin: state.isAdmin,
    supervisors: state.supervisors
})

const mapDispatchToProps = dispatch => ({
    setSupervisors(supervisors) {
        dispatch({
            type: "SetSupervisors",
            supervisors,
        })
    },
})

export default connect(mapStoreToProps, mapDispatchToProps)(Settings);
