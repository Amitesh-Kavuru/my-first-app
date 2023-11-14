import { useState, useEffect } from "react";
import React from "react";
import "../ComponentStyles/NewSideNav.css";
import { ExpandMore, Remove } from "@mui/icons-material";

export default function NewSideNav(props) {
  const [availableSensors, setAvailableSensors] = useState([]);
  useEffect(() => {
    const fetchSensors = async () => {
      let response = await fetch("http://localhost:5000/api/sensors/");
      let responseData = await response.json();
      console.log("Sensors : ", responseData);
      setAvailableSensors(
        responseData.map((ele) => (
          <>
            <button
              className="sensorButton"
              onClick={props.callbackFun}
              value={ele._id}
            >
              {ele._id}
            </button>
            {/* <div className="divider"></div> */}
          </>
        ))
      );
    };
    fetchSensors();
  }, []);
  return (
    <nav className="sideNav">
      <div>
        {/* <p style={{ fontSize: "18px" }}>
          My Apartment{" "}
          <span style={{ marginLeft: "25px" }}>
            <ExpandMore style={{ color: "white", fontSize: "25px" }} />
          </span>
        </p> */}
        <p
          style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}
        >
          {/* <span style={{ marginRight: "20px" }}>
            <Remove style={{ color: "white", fontSize: "25px" }} />
          </span> */}
          Water Meters
        </p>
        {/* <div className="divider"></div> */}
        {availableSensors}
      </div>
    </nav>
  );
}
