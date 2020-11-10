import React, { useState } from 'react'
import deleteUser from '../../../requests/DeleteUser';
import { connect } from 'react-redux';

/**
 * ListUsers - User Component account info
 * @param user user info in Auth0 users with role supervisor or pending
 * @param index Position of the element in the list
 * @param updateLists update all user info to render
 * @param supervisors user accounts list from store (redux)
 * @param setSupervisors Set User role content from store (redux)
 */
const ListUsers = ({ user, index, updateLists, supervisors, setSupervisors }) => {
    //Hook for user state count
    const [isActive, setActive] = useState((user.user_metadata !== undefined && user.user_metadata.role === 'supervisor') ? true : false)

    // Delete a user in Auth0 users list and notify the store
    async function delUser(user, index) {
        const res = await deleteUser(user);
        if (res) {
            let s = [...supervisors];
            s.splice(index, 1);
            setSupervisors(s);
        }
    }

    // Final render user info
    return (
        <div className={isActive ? 'user' : 'pending'} key={user.nickname + user.user_id}>
            <h6 className='userName'>{user.nickname}</h6>
            <h6 className='userId'>{String(user.user_id).slice(6)}</h6>
            <div className='userMenu'>
                <label className="switch">
                    <input type="checkbox" checked={isActive} onChange={(event) => {updateLists(user, event.target.checked, index); setActive(!isActive)}} />
                    <span className="slider round"></span>
                </label>
                <button className='deleteUser' onClick={() =>delUser(user, index)}></button>
            </div>
        </div>
    )
}

// Map props from store
const mapStoreToProps = state => ({
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
export default connect(mapStoreToProps, mapDispatchToProps)(ListUsers)
