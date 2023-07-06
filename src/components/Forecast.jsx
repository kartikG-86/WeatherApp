import { Grid, Paper, Typography } from "@mui/material";
import React from "react";

const Forecast = (prop) => {
  return (
    <>
      {prop.weatherData && prop.weatherData.forecast && (
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
            <Typography
              variant="h5"
              style={{ fontWeight: "bold", margin: "1rem 0 3rem 0" }}
              align="center"
            >
              5-Day Forecast
            </Typography>
            <Grid container spacing={12} justifyContent="center">
              {prop.weatherData.forecast.list.map((forecast) => (
                <>
                  <Grid item sm={4} md={2} key={forecast.dt} align="center">
                    <Typography variant="body1" style={{ fontWeight: "bold" }}>
                      {prop.getDayOfWeek(forecast.dt)}
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{ fontWeight: "bold", marginBottom: "0.5rem" }}
                    >
                      {prop.formatTime(forecast.dt)}
                    </Typography>
                    <Typography
                      style={{
                        fontWeight: "bold",
                        marginBottom: "0.5rem",
                        color: "red",
                      }}
                      variant="body2"
                    >
                      {forecast.main.temp.toFixed(1)}°
                      {prop.unit === "metric" ? "C" : "F"}
                    </Typography>
                    <Typography variant="body2">
                      {forecast.weather[0].main &&
                        prop.getWeatherIcon(forecast.weather[0].main)}
                    </Typography>
                  </Grid>
                </>
              ))}
            </Grid>
          </Paper>
        </Grid>
      )}
    </>
  );
};

export default Forecast;
