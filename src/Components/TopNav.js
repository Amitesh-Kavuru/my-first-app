import React from "react";
import "../ComponentStyles/TopNav.css";
import waterlogo from '../waterlogo.png';
export default function TopNav({ username }) {
  return (
    <div className="topNav">
      <div>
        <img src={waterlogo} alt="no image" />
        SASTRA WATERMANAGEMENT PROJECT
      </div>
      <div>
        <b>Welcome, &ensp;</b>{username}
      </div>
      {/* <button className="menuBtn" onClick={onMenuButtonClick}>
        <div className="menuLine"></div>
        <div className="menuLine"></div>
        <div className="menuLine"></div>
      </button> */}
    </div>
  );
}
