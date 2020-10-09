import React from 'react';
import './NavItem.css';


export default function Dashboard(props) {
    const {className, icon, text} = props;
    return (
        <div className={'dashboard_' + className}>
            <img className={'icon_' + className} src={icon} alt=''></img>
            <div className={'text_' + className}><p>{text}</p></div>
        </div>
    );
}
