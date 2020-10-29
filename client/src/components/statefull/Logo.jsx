import React from 'react';
import './Logo.css';
import FaceRobot from '../../images/lobbyWhite.png';


export default function Logo({ cName }) {
    return (
        <div className={cName}>
            <img src={FaceRobot}/>
        </div>
    );
}
