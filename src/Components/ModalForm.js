import React, { useEffect, useState } from "react";
import "../ComponentStyles/ModalForm.css";

export default function ModalForm(props) {
  const [sensorDetails, setSensorDetails] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:5000/api/sensors/${props.sensorId}/device-details`
      );
      const responseData = await response.json();
      setSensorDetails(responseData);
    };
    fetchData();
  }, [props.sensorId]);
  const handleModalFormSubmit = (e) => {
    e.preventDefault();
    console.log("Modal submitted.");
  };
  return (
    <form onSubmit={handleModalFormSubmit} className="modalForm">
      <label htmlFor="sensorId">Sensor Id : </label>
      <input
        style={{ marginLeft: "5px", border: "1px solid black" }}
        id="sensorId"
        placeholder="Sensor Id"
        value={sensorDetails ? sensorDetails.sensorId : ""}
      />
      <br />
      <br />
      <label htmlFor="sensorLocation">Sensor Location : </label>
      <input
        id="sensorLocation"
        placeholder="Sensor Location"
        value={sensorDetails ? sensorDetails.sensorLocation : ""}
      />{" "}
      <br />
      <br />
      <label htmlFor="monitoringAppliance">Monitoring Appliance : </label>
      <input
        id="monitoringAppliance"
        placeholder="Monitoring Appliance"
        value={sensorDetails ? sensorDetails.monitoringAppliance : ""}
      />{" "}
      <br />
      <br />
      <input type="submit" value="Submit" className="editDeviceSubmit" />
    </form>
  );
}
