"use client";

import axios from "axios";
import dynamic from "next/dynamic";
import Chart, { registerables } from "chart.js/auto";
import React from "react";
const Line = dynamic(() => import("react-chartjs-2").then((res) => res.Line), {
  ssr: false,
});

function ChartComponent() {
  const [xAxis, setXAxis] = React.useState([]);
  const [yAxis, setYAxis] = React.useState([]);

  const getXAxis = async () => {
    const response = await axios
      .get("https://retoolapi.dev/gDa8uC/data")
      .then((res) => res.data);
    const data = response.filter((item) => item.id <= 50);

    setXAxis(data);
  };

  const getYAxis = async () => {
    const response = await axios
      .get("https://retoolapi.dev/o5zMs5/data")
      .then((res) => res.data);

    const data = response.filter((item) => item.id <= 50);
    setYAxis(data);
  };

  React.useEffect(() => {
    getXAxis();
    getYAxis();
  }, []);

  const chartData = {
    labels: xAxis.map((item) => item.RandomNumber),
    datasets: [
      {
        label: "Y-axis Data",
        data: yAxis.map((item) => item.RandomNumber),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <h2>Chart</h2>
      <div style={{ width: "50vw", margin:"auto", paddingTop: 20 }}>
        <Line data={chartData} />
      </div>
    </div>
  );
}

Chart.register(...registerables);

export default ChartComponent;
