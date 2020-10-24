import React, { Component } from 'react';
import './Settings.css';
import Board from './Board';
import getUsers from '../../../requests/GetUsers';
import { Loading } from '../../stateless/DashboardMessages';


export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supervisors: []
        };
    }

    async componentDidMount() {
        let listUsers = [];

        try {
            const users = await getUsers();
            for (const user of users) {
                if (user.user_metadata === undefined || user.user_metadata.length === 0 || user.user_metadata.role !== 'admin') {
                    listUsers.push(user);
                }
            }
            this.setState({ supervisors: listUsers });
        } catch (error) { console.log(error); }
    }

    render() {
        if (this.state.supervisors.length === 0) {
            return Loading();
        } else {
            return (
                <div className='bodySettings'>
                    <div className='settingsTittle'>
                        <h1>Administracion de Cuentas</h1>
                    </div>
                    <Board supervisors={this.state.supervisors} />
                    <button>Crear</button>
                </div>
            );
        }
    }
}
