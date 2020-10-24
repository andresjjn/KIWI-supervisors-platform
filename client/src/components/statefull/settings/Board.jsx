import React from 'react';

export default function Board() {
    console.log("CALKKLGLSJAKLJG");

    /* let mapeo = []
    if (supervisors.length === 0) {
        fillSupervisors();
    } else {
        mapeo = supervisors.map(user => (
            <div className='supervisor' key={user.user_id}>
                <h6 className='supervisorName'>{user.nickname}</h6>
                <h6 className='supervisorId'>{String(user.user_id).slice(6)}</h6>
                <div className='supervisorMenu'>
                    <button className='editSupervisor'>Editar</button>
                    <button className='deleteSupervisor'>Borrar</button>
                </div>
            </div>
        ))
        return <h1>Holi</h1>;
    } */
    return (
        <>
            <div className='supervisors'>

                <div className='supervisorsTittle'>
                    <h2>Name</h2>
                    <h2>Id</h2>
                    <h2>Menu</h2>
                </div>
                {/* (supervisors.length > 0) ? mapeo : <h1>CAGANDO</h1> */}
            </div>
        </>
    )
}
