import React, { Component } from 'react';
import './Settings.css';
import Board from './Board';
import getUsers from '../../../requests/GetUsers';
import { Loading } from '../../stateless/DashboardMessages';


export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supervisors: [],
            pendings: []
        };
    }

    async componentDidMount() {
        let listUsers = [];
        let listPendings = [];

        try {
            const users = await getUsers();
            for (const user of users) {
                if (user.user_metadata !== undefined && user.user_metadata.role === 'supervisor') {
                    listUsers.push(user);
                } else if (user.user_metadata === undefined || JSON.stringify(user.user_metadata) === JSON.stringify({})) {
                    listPendings.push(user);
                }
            }
            this.setState({ supervisors: listUsers, pendings: listPendings });
        } catch (error) { console.log(error); }
    }

    render() {
        if (this.state.supervisors.length === 0) {
            return Loading();
        } else {
            return (
                <div className='bodySettings'>
                    <div className='settingsTittle'>
                        <h1>Administracion de Supervisores</h1>
                    </div>
                    <Board supervisors={this.state.supervisors} pendings={this.state.pendings} />
                    <button>Crear</button>
                </div>
            );
        }
    }
}
