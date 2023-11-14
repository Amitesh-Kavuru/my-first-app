import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import React, { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { FilterContext } from "./Content";

Chart.register(CategoryScale);

export default function LineChart(props) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Water Consumed",
        data: [],
        backgroundColor: "rgba(133, 223, 251, 255)",
        borderRadius: 15,
        barThickness: 12,
      },
    ],
  });
  const context = useContext(FilterContext);

  useEffect(() => {
    const fetchGraphData = async () => {
      const currentTS = context.currentTSFilter;
      const graphFilter = context.activeFilter;
      const sensorId = context.selectedMeterId;
      let response = await fetch(
        `http://localhost:5000/api/sensors/${sensorId}/graphData/filter/${graphFilter}/timestamp/${currentTS.toISOString()}`
      );
      const responseData = await response.json();
      console.log("JSON from API fetch in LineChart component", responseData);
      setChartData({
        labels: responseData.map((ele) => {
          let tempTS = new Date(
            ele._id.year,
            ele._id.month - 1,
            ele._id.day ? ele._id.day : 1,
            ele._id.hour ? ele._id.hour : 0
          );
          if (graphFilter === "day")
            return tempTS.toLocaleString("en", { hour: "2-digit" });
          else if (graphFilter === "month")
            return tempTS.toLocaleString("en", { day: "2-digit" });
          else if (graphFilter === "year")
            return tempTS.toLocaleString("en", { month: "long" });
          else return [];
        }),
        datasets: [
          {
            label: "Water Consumed",
            data: responseData.map((ele) => ele.totalConsumption),
            backgroundColor: "rgba(133, 223, 251, 255)",
            borderRadius: 15,
            barThickness: 12,
          },
        ],
      });
    };
    fetchGraphData();
  }, [context]);
  console.log("Chart Data");
  console.log(chartData);
  return (
    <div style={{ height: "86%" }}>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Water Consumption",
            },
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                drawOnChartArea: false,
                drawTicks: false,
              },
              ticks: {
                // maxTicksLimit: 12,
                padding: 10,
              },
              border: {
                display: false,
              },
            },
            y: {
              grid: {
                drawTicks: false,
              },
              ticks: {
                padding: 10,
                // maxTicksLimit: 15,
              },
              border: {
                display: false,
              },
            },
          },
          // responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
}
