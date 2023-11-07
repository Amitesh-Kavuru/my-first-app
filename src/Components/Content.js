import React, { useEffect, useState } from "react";
import "../ComponentStyles/Content.css";
import LineChart from "./LineChart";
import CircleProgressIndicator from "./CircleProgressIndicator";
import GraphFilter from "./GraphFilter";

export default function Content(props) {
  const [graphFilter, setGraphFilter] = useState("day");
  const [meterData, setMeterData] = useState();

  const handleRadio = (event) => {
    console.log(event.target.value);
    setGraphFilter(() => event.target.value);
  };

  const selectedMeterId =
    props.selectedMeterId.length === 0 ? "meter1" : props.selectedMeterId;
  const fetchData = async () => {
    console.log("Fetching Data with API call.");
    const response = await fetch(
      `http://localhost:5000/api/waterMeters/${selectedMeterId}`
    );
    const data = await response.json();
    console.log("Json data received from API : ");
    console.log(data);
    setMeterData(data);
  };

  useEffect(() => {
    fetchData();
  }, [selectedMeterId]);

  return (
    <div className="content">
      <div className="content-navDesc">
        <div className="content-navDesc-nav">Navbar</div>
        <div className="content-navDesc-desc">
          <div className="desc-content">
            <p
              style={{
                color: "rgb(50,79,255)",
                fontWeight: "bold",
                fontSize: "25px",
              }}
            >
              {meterData ? meterData.meterLocation : "Waiting"}
            </p>
            <p>{meterData ? `(${meterData.applianceName})` : "Waiting"}</p>
          </div>
          <CircleProgressIndicator
            waterConsumed={meterData ? meterData.currentConsumption : 500.0}
            waterLimit={meterData ? meterData.monthlyConsumptionLimit : 1000.0}
          />
        </div>
      </div>
      <div className="content-graph">
        <GraphFilter handleRadioEvent={handleRadio} activeFilter={graphFilter}/>
        <LineChart
          filter={graphFilter}
          usageData={
            meterData
              ? meterData.usageData
              : { dayData: [], monthData: [], yearData: [] }
          }
        />
      </div>
    </div>
  );
}
