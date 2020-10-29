import React, { useState } from 'react'
import deleteUser from '../../../requests/DeleteUser';
import { connect } from 'react-redux';

const ListUsers = ({ user, index, updateLists, supervisors, setSupervisors }) => {
    const [isActive, setActive] = useState((user.user_metadata !== undefined && user.user_metadata.role === 'supervisor') ? true : false)

    async function delUser(user, index) {
        const res = await deleteUser(user);
        if (res) {
            let s = [...supervisors];
            s.splice(index, 1);
            setSupervisors(s);
        }
    }

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
const mapStoreToProps = state => ({
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

export default connect(mapStoreToProps, mapDispatchToProps)(ListUsers)
