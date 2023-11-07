import React, { useState } from "react";
import SideNav from "./SideNav";
import Content from "./Content";
import RightPanel from "./RightPanel";

export default function Dashboard() {
  const [selectedMeterId, setSelectedMeterId] = useState("");
  const handleClickRenderContentComponent = (e) => {
    console.log(`Water meter selected ${e.target.value}`);
    setSelectedMeterId(e.target.value);
  };

  return (
    <div className="App">
      <SideNav callbackFun={handleClickRenderContentComponent} />
      <Content selectedMeterId={selectedMeterId} />
      {/* <RightPanel /> */}
    </div>
  );
}
