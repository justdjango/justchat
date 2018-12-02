import React from "react";
import { NavLink } from "react-router-dom";

const Contact = props => (
  <NavLink to={`${props.chatURL}`} style={{ color: "#fff" }}>
    <li className="contact">
      <div className="wrap">
        <span className={`contact-status ${props.status}`} />
        <img src={props.picURL} alt="" />
        <div className="meta">
          <p className="name">{props.name}</p>
          {/* <p className="preview">You just got LITT up, Mike.</p> */}
        </div>
      </div>
    </li>
  </NavLink>
);

export default Contact;
