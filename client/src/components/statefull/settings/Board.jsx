import React from 'react';
import editUser from '../../../requests/EditUser';

export default function Board({ supervisors, pendings }) {
    const mapSupervisors = supervisors.map(user => (
        <div className='supervisor' key={user.user_id}>
            <h6 className='supervisorName'>{user.nickname}</h6>
            <h6 className='supervisorId'>{String(user.user_id).slice(6)}</h6>
            <div className='supervisorMenu'>
                <label className="switch">
                <input type="checkbox" checked={true} onChange={(event)=> editUser(user.user_id, event.target.checked)}/>
                    <span className="slider round"></span>
                </label>
                <button className='deleteSupervisor'>Borrar</button>
            </div>
        </div>
    ));

    const mapPendings = pendings.map(user => (
        <div className='pending' key={user.user_id}>
            <h6 className='pendingName'>{user.nickname}</h6>
            <h6 className='pendingId'>{String(user.user_id).slice(6)}</h6>
            <div className='pendingMenu'>
                <label className="switch">
                <input type="checkbox" checked={false} onChange={(event)=> editUser(user.user_id, event.target.checked)}/>
                    <span className="slider round"></span>
                </label>
                <button className='deletePending'>Borrar</button>
            </div>
        </div>
    ));

    return (
        <>
            <div className='supervisors'>

                <div className='supervisorsTittle'>
                    <h2>Name</h2>
                    <h2>Id</h2>
                    <h2>Activar / Desactivar - Eliminar</h2>
                </div>
                {mapSupervisors}
                {mapPendings}
            </div>
        </>
    )
}
