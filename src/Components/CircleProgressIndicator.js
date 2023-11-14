import React, { useContext, useEffect, useState } from "react";
import "../ComponentStyles/CircleProgressIndicator.css";
import { FilterContext } from "./Content";

export default function CircleProgressIndicator() {
  const context = useContext(FilterContext);
  const [totalConsumption, setTotalConsumption] = useState(0);
  const waterLimit = 5000.0;

  useEffect(() => {
    const fetchTotalConsumption = async () => {
      const currentTS = context.currentTSFilter;
      const graphFilter = context.activeFilter;
      const sensorId = context.selectedMeterId;
      let response = await fetch(
        `http://localhost:5000/api/sensors/${sensorId}/filter/${graphFilter}/timestamp/${currentTS.toISOString()}`
      );
      const responseData = await response.json();
      console.log(
        "JSON from API fetch in CircleProgressIndicator component",
        responseData
      );
      if (responseData.length === 0) setTotalConsumption(0);
      else setTotalConsumption(responseData[0].totalConsumption);
    };
    fetchTotalConsumption();
  }, [context]);

  const percentage =
    (totalConsumption / waterLimit) * 100 > 100
      ? 100
      : (totalConsumption / waterLimit) * 100;
  const svgWidth = 175;
  const svgHeight = 175;
  const strokeWidth = 7;
  const radius = svgHeight / 2 - strokeWidth;
  const cx = svgWidth / 2;
  const cy = svgHeight / 2;
  const gradientColor1 = "rgb(50,79,255)";
  const gradientColor2 = "rgb(141,81,239)";
  const circumference = 2 * Math.PI * radius;
  const progress = (100 - percentage) * 0.01 * circumference;

  return (
    <div className="progressIndicator">
      <svg width={svgWidth} height={svgHeight}>
        <defs>
          <linearGradient id="gradient" x1="100%" y1="80%" x2="100%" y2="15%">
            <stop offset="0%" stopColor={gradientColor1} />
            <stop offset="100%" stopColor={gradientColor2} />
          </linearGradient>
        </defs>
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="#c6d0da"
          fill="transparent"
          transform={`rotate(-90, ${cx}, ${cy})`}
        />
        <circle
          style={{ transition: "1s ease" }}
          cx={cx}
          cy={cy}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="url(#gradient)"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          fill="transparent"
          transform={`rotate(-90, ${cx}, ${cy})`}
        />

        <text x={cx} y={cy} textAnchor="middle" alignmentBaseline="middle">
          <tspan x={cx} dy="-2em" fontSize="14">
            Total month
          </tspan>
          <tspan
            x={cx}
            dy="2em"
            fontSize="20"
            fill="rgb(50,79,255)"
            fontWeight="bold"
          >
            {totalConsumption}L
          </tspan>
          <tspan x={cx} dy="2em" fontSize="14">
            /{waterLimit}
          </tspan>
        </text>
      </svg>
    </div>
  );
}
