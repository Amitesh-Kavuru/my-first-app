import React, { useState } from "react";
// import SideNav from "./SideNav";
import { Content } from "./Content";
import NewSideNav from "./NewSideNav";
import SensorNodeStatus from "./SensorNodeStatus";
import TopNav from "./TopNav";
import { useLocation, useParams } from "react-router-dom";

export default function Dashboard(props) {
  const { state } = useLocation();
  const [selectedMeterId, setSelectedMeterId] = useState("");
  const [nodeDetails, setNodeDetails] = useState(true);
  const handleClickRenderContentComponent = (e) => {
    console.log(`Water meter selected ${e.target.value}`);
    setSelectedMeterId(e.target.value);
  };
  return (
    <div className="App" style={{ position: "relative" }}>
      {/* <TopNav username={state.username}/> */}
      {/* <SideNav callbackFun={handleClickRenderContentComponent} /> */}
      <NewSideNav
        username={state.username}
        callbackFun={handleClickRenderContentComponent}
        settingState={setNodeDetails}
        nodeDetails={nodeDetails}
      ></NewSideNav>
      {nodeDetails ? (
        <Content selectedMeterId={selectedMeterId} />
      ) : (
        <SensorNodeStatus />
      )}
    </div>
  );
}
