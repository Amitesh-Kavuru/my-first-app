import React, { createContext, useEffect, useState } from "react";
import "../ComponentStyles/Content.css";
import LineChart from "./LineChart";
import CircleProgressIndicator from "./CircleProgressIndicator";
import GraphFilter from "./GraphFilter";
import { Modal } from "@mui/material";
import ModalForm from "./ModalForm";

const FilterContext = createContext();

function Content(props) {
  const [graphFilter, setGraphFilter] = useState("day");
  const [currentTSFilter, setCurrentTSFilter] = useState(new Date());
  const [sensorDescription, setSensorDescription] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [percentage,setPercentage]= useState();
  // const [modalOpen, setModalOpen] = useState(false);
  const selectedMeterId =
    props.selectedMeterId.length === 0 ? "SID001" : props.selectedMeterId;

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  // API call to fetch sensor description data
  const fetchData = async () => {
    console.log("Fetching Data with API call.");
    const response = await fetch(
      `http://localhost:5000/api/sensors/${selectedMeterId}/details`
    );
    const responseData = await response.json();
    console.log("Json data received from API : ");
    console.log(responseData);
    setSensorDescription(responseData);
    setPercentage(Math.floor(Math.random()*100)+1);
  };

  useEffect(() => {
    fetchData();
  }, [selectedMeterId]);
  return (
    <FilterContext.Provider
      value={{
        activeFilter: graphFilter,
        setGraphFilter: setGraphFilter,
        currentTSFilter: currentTSFilter,
        setCurrentTSFilter: setCurrentTSFilter,
        selectedMeterId: selectedMeterId,
      }}
    >
      <div className="content">
        <div className="content-navDesc">
          <div className="content-navDesc-desc">
            <div className="desc-content">
              <p
                style={{
                  color: "rgb(50,79,255)",
                  fontWeight: "bold",
                  fontSize: "30px",
                  marginBottom: "2px",
                }}
              >
                {sensorDescription
                  ? sensorDescription.sensorLocation
                  : "Waiting"}
              </p>
              <p
                style={{
                  fontSize: "18px",
                  marginBottom: "0px",
                }}
              >
                {sensorDescription
                  ? `(${sensorDescription.monitoringAppliance})`
                  : "Waiting"}
              </p>
              <button className="editDevice" onClick={handleModalOpen}>
                Edit device
              </button>
              <Modal open={modalOpen} onClose={handleModalClose}>
                <ModalForm sensorId={props.selectedMeterId} />
              </Modal>
            </div>
            <div className="sensorStatusInfo">
              <table>
                <tr>
                  <th>Recently updated:</th>
                  <th>
                    {sensorDescription
                      ? new Date(sensorDescription.timestamp).getHours() +
                        ":" +
                        new Date(sensorDescription.timestamp).getMinutes() +
                        ", " +
                        new Date(sensorDescription.timestamp).toDateString()
                      : "Waiting"}
                  </th>
                </tr>
                <tr>
                  <th>Status:</th>
                  <th>Active🟢</th>
                </tr>
                <tr>
                  <th>Battery Percentage</th>
                  <th>{percentage?percentage:"Waiting"}%</th>
                </tr>
              </table>
            </div>
            <CircleProgressIndicator />
          </div>
        </div>
        <div className="content-graph">
          <GraphFilter />
          <LineChart />
        </div>
      </div>
    </FilterContext.Provider>
  );
}

export { Content, FilterContext };
