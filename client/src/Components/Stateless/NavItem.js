import React from "react";
import "./Styles.css";

export default function Dashboard(props) {
  return (
    <div className={"nav_item_" + props.className}>
      <img className={"icon_" + props.className} src={props.icon} alt=""></img>
      <div className={"text_" + props.className}>
        <p>{props.text}</p>
      </div>
    </div>
  );
}
