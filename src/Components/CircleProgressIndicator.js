import React from "react";
import "../ComponentStyles/CircleProgressIndicator.css";

export default function CircleProgressIndicator({ waterConsumed, waterLimit }) {
  const percentage = (waterConsumed / waterLimit) * 100;
  const svgWidth = 150;
  const svgHeight = 150;
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
        style={{transition: "1s ease"}}
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
          <tspan x={cx} dy="2em" fontSize="20" fill="rgb(50,79,255)" fontWeight="bold">
            {waterConsumed}L
          </tspan>
          <tspan x={cx} dy="2em" fontSize="14">
            /{waterLimit}
          </tspan>
        </text>
      </svg>
    </div>
  );
}
