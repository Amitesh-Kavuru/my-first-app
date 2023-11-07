import React, { useState } from "react";
import "../ComponentStyles/CollapsibleMenuButton.css";
import { Remove } from "@mui/icons-material";

export default function CollapsibleMenuButtonChild(props) {
  const [contentIsOpen, setContentIsOpen] = useState(false);
  const showMenuButtons = () => setContentIsOpen(!contentIsOpen);

  let childButtons = props.buttons.map((button) => (
    <button
      className="collapsibleContent-elementButton"
      onClick={props.callbackFun}
      value={button}
    >
      {button}
    </button>
  ));
  return (
    <div className="sideNav-collapsibleButton">
      <button
        className="collapsibleButton-button-child"
        onClick={showMenuButtons}
      >
        <Remove
          sx={{ fontSize: "13px", mr: 2 }}
          className={`collapsibleButton-button-icon-${
            contentIsOpen ? "open" : "close"
          }`}
        />
        {props.title}
      </button>
      <div
        className={`collapsibleButton-content-${
          contentIsOpen ? "open" : "close"
        }`}
      >
        {childButtons}
      </div>
    </div>
  );
}
