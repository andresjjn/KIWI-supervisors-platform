import React from "react";
import "./NavItem.css";

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
