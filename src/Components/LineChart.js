import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale);

export default function LineChart(props) {
  const [chartData, setChartData] = useState({
    labels: [], // Initial empty labels
    datasets: [
      {
        label: "Water Consumed",
        data: [], // Initial empty data
        backgroundColor: "rgba(133, 223, 251, 255)",
        borderRadius: 15,
        barThickness: 12,
      },
    ],
  });

  let data;

  const fun = () => {
    console.log("Filter Applied " + props.filter);
    if (props.filter === "day") {
      data = props.usageData.dayData;
    } else if (props.filter === "month") {
      data = props.usageData.monthData;
    } else if (props.filter === "year") {
      data = props.usageData.yearData;
    }
    setChartData({
      labels: data.map((data) => data.label), // Update labels as needed
      datasets: [
        {
          label: "Water Consumed",
          data: data.map((data) => data.value), // Update data as needed
          backgroundColor: "rgba(133, 223, 251, 255)",
          borderRadius: 15,
          barThickness: 12,
        },
      ],
    });
  };

  useEffect(() => {
    fun();
  }, [props.filter, props.usageData]);

  console.log("Chart Data");
  console.log(chartData);
  return (
    <div style={{ height: "83%" }}>
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
