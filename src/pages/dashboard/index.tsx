import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Grid,
  Backdrop,
  CircularProgress,
} from "@mui/material";


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface ChartData {
  labels: string[];
  values: number[];
}

interface MetricsNamesData extends Array<string> {}

const Dashboard = () => {
  const [data, setData] = useState<ChartData>({ labels: [], values: [] });

  const today = new Date()

  const currentDay= String(today.getDate()).padStart(2, '0');
  
  const currentMonth = String(today.getMonth()+1).padStart(2,"0");
  const currentYear = today.getFullYear();

  let defaultStartDate = `${currentYear}-${currentMonth}-${currentDay} 00:00`;
  let defaultEndDate = `${currentYear}-${currentMonth}-${currentDay} 23:59`;

  const [startDate, setStartDate] = useState<string>(defaultStartDate);
  const [endDate, setEndDate] = useState<string>(defaultEndDate);
  const [name, setName] = useState<string>("All");
  const [duration, setDuration] = useState<string>("Hour");
  const [chartName, setChartName] = useState<string>("Sales");
  const [metricsNames, setMetricsNames] = useState<MetricsNamesData>([]);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const fetchData = async () => {
    handleOpen();

    try {
      const baseUrl = import.meta.env.VITE_BASE_URL;

      const metricsNamesResponse = await fetch(
        `${baseUrl}/api/v1/metrics/names`,
        {method: "GET",headers: {"Content-Type": "application/json","ngrok-skip-browser-warning": "skip"}}
      );
      const metricsNamesJsonData = await metricsNamesResponse.json();
      setMetricsNames(metricsNamesJsonData.data);

      const response = await fetch(
        `${baseUrl}/api/v1/metrics?start_date=${startDate}&end_date=${endDate}&name=${name}&duration=${duration}`,
        {method: "GET",headers: {"Content-Type": "application/json","ngrok-skip-browser-warning": "skip"}}
      );
      const jsonData = await response.json();

      setData({
        ...data,
        labels: Object.keys(jsonData.data),
        values: Object.values(jsonData.data),
      });
      setChartName(name);
      handleClose();
    } catch (error) {
      handleClose();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartData = {
    labels: data.labels || [],
    datasets: [
      {
        label: chartName,
        data: data.values || [],
        fill: true,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        lineTension: 0.1,
      },
    ],
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(event.target.value);
  };

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const handleButtonClick = () => {
    fetchData();
  };

  const options = {
    responsive:true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
    layout: {
      padding: {
        bottom: 100,
      },
    },
  };

  return (
    <div>
      {open && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      <h1>Dashboard</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            type="datetime-local"
            variant="outlined"
            color="secondary"
            label="Start Date"
            onChange={handleStartDateChange}
            value={startDate}
            fullWidth
            required
            sx={{ mb: 4 }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
        <TextField
            type="datetime-local"
            variant="outlined"
            color="secondary"
            label="End Date"
            onChange={handleEndDateChange}
            value={endDate}
            fullWidth
            required
            sx={{ mb: 4 }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            value={name}
            onChange={handleNameChange}
            select
            fullWidth
            label="Name"
          >
            <MenuItem value="All">All</MenuItem>
            {
            metricsNames &&
            metricsNames.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            value={duration}
            onChange={handleDurationChange}
            select
            fullWidth
            label="Duration"
          >
            <MenuItem value="Hour">Hour</MenuItem>
            <MenuItem value="Minute">Minute</MenuItem>
            <MenuItem value="Day">Day</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleButtonClick}
          >
            Get Data
          </Button>
        </Grid>
      </Grid>

      <Line data={chartData} options={options} />
      
    </div>
  );
};

export default Dashboard;
