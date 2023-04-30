import React, { useState } from "react";
import {
  TextField,
  InputLabel,
  Button,
  Grid,
  Backdrop,
  CircularProgress,
} from "@mui/material";

import {useNavigate } from "react-router-dom";


interface FormData {
  name: string;
  value: number;
  date: string;
}

const CreateMetric = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    value: 0,
    date: "2023-04-27 00:00",
  });
  const [open, setOpen] = useState(false);
  

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleOpen();

    try {
      const baseUrl = import.meta.env.VITE_BASE_URL;
      const response = await fetch(`${baseUrl}/api/v1/metrics`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      await response.json();

      handleClose();
      navigate("/", { replace: true });
      
    } catch (error) {
      handleClose();
      
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
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

      <h1>Create new metric</h1>
      <form role="create-metric-form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              name="name"
              type="text"
              variant="outlined"
              color="secondary"
              label="Name"
              onChange={handleChange}
              value={formData.name}
              fullWidth
              required
              sx={{ mb: 4 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              name="value"
              type="number"
              variant="outlined"
              color="secondary"
              label="Value"
              onChange={handleChange}
              value={formData.value}
              fullWidth
              required
              sx={{ mb: 4 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
          <TextField
            name="date"
            type="datetime-local"
            variant="outlined"
            color="secondary"
            label="Date"
            onChange={handleChange}
            value={formData.date}
            fullWidth
            required
            sx={{ mb: 4 }}
          />
            
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" color="secondary" type="submit">
            Create metric
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default CreateMetric;
