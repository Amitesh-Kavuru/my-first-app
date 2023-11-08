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

  const fun = () => {
    if (props.usageData.length !== 0) {
      let data = props.usageData[0];
      console.log("Data---------------------------: ", data);
      let dayData = {
        // day: data.monthlyData.dailyData.day,
        total: data.monthlyData[0].dailyData[0].dailyConsumption,
        labels: data.monthlyData[0].dailyData[0].hourlyData.map((ele) => ele.hour),
        values: data.monthlyData[0].dailyData[0].hourlyData.map(
          (ele) => ele.hourlyConsumption
        ),
      };
      let monthData = {
        // month: data.monthlyData.month,
        total: data.monthlyData[0].monthlyConsumption, //progress total
        labels: data.monthlyData[0].dailyData.map((ele) => ele.day),
        values: data.monthlyData[0].dailyData.map((ele) => ele.dailyConsumption),
      };
      let yearData = {
        // year: data._id.year,
        total: data.yearlyConsumption,
        labels: data.monthlyData.map((ele) => ele.month),
        values: data.monthlyData.map((ele) => ele.monthlyConsumption),
      };
      console.log("Filter Applied " + props.filter);
      let temp;
      if (props.filter === "day") {
        temp = dayData;
      } else if (props.filter === "month") {
        temp = monthData;
      } else if (props.filter === "year") {
        temp = yearData;
      }
      setChartData({
        labels: temp.labels, // Update labels as needed
        datasets: [
          {
            label: "Water Consumed",
            data: temp.values, // Update data as needed
            backgroundColor: "rgba(133, 223, 251, 255)",
            borderRadius: 15,
            barThickness: 12,
          },
        ],
      });
    }
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
