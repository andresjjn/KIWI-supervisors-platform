import React from "react";
import "./NavItem.css";

/**
 * NavItem - Item component for navbar
 * @param link Link to the route of navItem
 * @param className className for item styling
 * @param icon Image icon for the component
 * @param text Text of the link navItem
 */
export default function NavItem({ link, className, icon, text}) {
    return (
        <a href={link} className={className}>
            <img className={"icon_" + className} src={icon} alt=""></img>
            <div className={"text_" + className}>
                <p>{text}</p>
            </div>
        </a>
    );
}
