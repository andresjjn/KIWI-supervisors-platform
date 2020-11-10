import React from 'react';
import editUser from '../../../requests/EditUser';
import { connect } from 'react-redux';
import ListUsers from './ListUsers';

/**
 * Board - Sipervisor Board for Admin User
 * @param supervisors user accounts list from store (redux)
 * @param setSupervisors Set User role content from store (redux)
 */
const Board = ({ supervisors, setSupervisors }) => {

    // Load user Info from Auth0 and copy Info to store (redux)
    async function updateLists(user, checked, index) {
        const res = await editUser(user.user_id, checked);
        let s = [...supervisors];
        if (res) {
            if (checked) {
                s[index].user_metadata.role = "supervisor";
            } else {
                s[index].user_metadata.role = "pending";
            }
            setSupervisors(s);
        }
    }

    // Supervisor list view
    const mapSupervisors = supervisors.map((user, index) => (
        <ListUsers key={user.user_id} user={user} index={index} updateLists={updateLists}/>
    ));

    // Final render Admin View
    return (
        <>
            <div className='users'>
                <div className='usersTittle'>
                    <h2>Name</h2>
                    <h2>Id</h2>
                    <h2>Activar / Desactivar - Eliminar</h2>
                </div>
                {mapSupervisors}
            </div>
        </>
    )
}

// Map props from store
const mapStoreToProps = state => ({
    supervisors: state.supervisors,
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
export default connect(mapStoreToProps, mapDispatchToProps)(Board);
