import React, { useState, useEffect } from 'react'
import "../ComponentStyles/SensorNodeStatus.css";
function SensorNodeStatus() {
    const [availableSensors, setAvailableSensors] = useState([]);

    useEffect(() => {
        const fetchSensors = async () => {
          let response = await fetch("http://localhost:5000/api/sensorsdetails/");
          let responseData = await response.json();
          console.log("Sensors : ", responseData);
          console.log("->->"+new Date( responseData[0].timestamp));

          setAvailableSensors(
            responseData.map((ele) => (
                <table id={ele._id}>
                <tr>
                    <th>Sensor ID:</th>
                    <th>{ele.sensorId}</th>
                </tr>
                <tr>
                    <th>Sensor Location:</th>
                    <th>{ele.sensorLocation}</th>
                </tr>
                <tr>
                    <th>Monitoring Appliance:</th>
                    <th>{ele.monitoringAppliance}</th>
                </tr>
                
                <tr>
                    <th>Recently updated:</th>
                    <th>{new Date(ele.timestamp).getHours() + ":" +new Date(ele.timestamp).getMinutes() + ", "+ new Date(ele.timestamp).toDateString()}</th>
                </tr>
                <tr>
                    <th>Status:</th>
                    <th>Active🟢</th>
                </tr>
            </table>
            ))
          );
        };
        fetchSensors();
      }, []);
  return (
    <div className="status">
        <div className="statusCard">
            {availableSensors}
        </div>
    </div>
  )
}

export default SensorNodeStatus