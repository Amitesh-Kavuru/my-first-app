import React, { useState } from "react";
import "../ComponentStyles/CollapsibleMenuButton.css";
import CollapsibleMenuButtonChild from "./CollapsibleMenuButtonChild";
import { ExpandMore } from "@mui/icons-material";

export default function CollapsibleMenuButton(props) {
  const [contentIsOpen, setContentIsOpen] = useState(false);
  const showMenuButtons = () => setContentIsOpen(!contentIsOpen);
  const objList = props.childMenuItems;
  let childComponents = objList.map((obj) => (
    <CollapsibleMenuButtonChild
      callbackFun={props.callbackFun}
      title={obj.title}
      buttons={obj.buttons}
    ></CollapsibleMenuButtonChild>
  ));
  return (
    <div className="sideNav-collapsibleButton">
      <button className="collapsibleButton-button" onClick={showMenuButtons}>
        My Apartment
        <ExpandMore
          className={`collapsibleButton-button-icon-${
            contentIsOpen ? "open" : "close"
          }`}
        />
      </button>
      <div
        // className={`collapsibleButton-content-${
        //   contentIsOpen ? "open" : "close"
        // }`}
        className={`collapsibleButton-content-open`}
      >
        {childComponents}
      </div>
    </div>
  );
}
