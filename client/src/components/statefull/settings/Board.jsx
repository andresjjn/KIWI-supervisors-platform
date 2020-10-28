import React from 'react';
import editUser from '../../../requests/EditUser';
import { connect } from 'react-redux';
import ListUsers from './ListUsers';


const Board = ({ supervisors, setSupervisors }) => {

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

    const mapSupervisors = supervisors.map((user, index) => (
        <ListUsers key={user.user_id} user={user} index={index} updateLists={updateLists}/>
    ));
    console.log(mapSupervisors);

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

const mapStoreToProps = state => ({
    supervisors: state.supervisors,
})

const mapDispatchToProps = dispatch => ({
    setSupervisors(supervisors, pendings) {
        dispatch({
            type: "setSupervisors",
            supervisors,
        })
    },
})

export default connect(mapStoreToProps, mapDispatchToProps)(Board);
