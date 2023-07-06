import { Grid, Paper, Typography } from "@mui/material";
import React from "react";

const Display = (prop) => {
  return (
    <>
      {prop.weatherData && (
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              {prop.weatherData.name}, {prop.weatherData.sys.country}
            </Typography>
            <Typography variant="h3" gutterBottom>
              {prop.weatherData.main.temp}°{prop.unit === "metric" ? "C" : "F"}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {prop.weatherData.weather[0].description}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Humidity: {prop.weatherData.main.humidity}%
            </Typography>
            <Typography variant="body2" gutterBottom>
              Wind Speed: {prop.weatherData.wind.speed} m/s (
              {prop.getWindDirection(prop.weatherData.wind.deg)})
            </Typography>
            <Typography variant="body2" gutterBottom>
              Sunrise: {prop.formatTime(prop.weatherData.sys.sunrise)}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Sunset: {prop.formatTime(prop.weatherData.sys.sunset)}
            </Typography>

            <Typography variant="body2">
              {prop.weatherData.weather[0].main &&
                prop.getWeatherIcon(prop.weatherData.weather[0].main)}
            </Typography>
          </Paper>
        </Grid>
      )}
    </>
  );
};

export default Display;
