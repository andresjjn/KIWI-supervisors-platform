import React from 'react';
import './Logo.css';
import FaceRobot from '../../images/lobbyWhite.png';

/**
 * Logo - render logo on Navbar
 * @param cName className for component style
 */
export default function Logo({ cName }) {
    return (
        <div className={cName}>
            <img src={FaceRobot} alt=""/>
        </div>
    );
}
