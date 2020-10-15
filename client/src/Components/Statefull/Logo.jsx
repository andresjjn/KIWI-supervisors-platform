import React from 'react';
import './Logo.css';
import LogoCompressed from '../../images/Logo.png';
import FaceRobot from '../../images/face-robot.png';


export default function Logo(props) {
    const { cName, isOpen } = props;
    return (
        <img className={'logo_' + cName} src={(isOpen) ? LogoCompressed : FaceRobot} alt=''>
        </img>
    );
}
