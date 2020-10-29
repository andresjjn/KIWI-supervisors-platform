import React, { useState } from 'react'

const ListUsers = ({ user, index, updateLists }) => {
    const [isActive, setActive] = useState((user.user_metadata !== undefined && user.user_metadata.role === 'supervisor') ? true : false)

    return (
        <div className={isActive ? 'user' : 'pending'} key={user.nickname + user.user_id}>
            <h6 className='userName'>{user.nickname}</h6>
            <h6 className='userId'>{String(user.user_id).slice(6)}</h6>
            <div className='userMenu'>
                <label className="switch">
                    <input type="checkbox" checked={isActive} onChange={(event) => {updateLists(user, event.target.checked, index); setActive(!isActive)}} />
                    <span className="slider round"></span>
                </label>
                <button className='deleteUser'></button>
            </div>
        </div>
    )
}

export default ListUsers
