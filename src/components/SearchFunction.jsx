import { Button, Paper, TextField, Typography } from "@mui/material";
import React from "react";

const SearchFunction = (prop) => {
  return (
    <>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <form onSubmit={prop.fetchWeatherData}>
          <TextField
            label="Enter city name"
            variant="outlined"
            value={prop.city}
            onChange={prop.handleInputChange}
            fullWidth
          />
          <Button variant="contained" type="submit" sx={{ mt: 2 }} fullWidth>
            Get Weather
          </Button>
        </form>
        <Button
          variant="contained"
          onClick={prop.fetchForecastData}
          sx={{ mt: 2 }}
          fullWidth
        >
          Get 5-Day Forecast
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Unit: {prop.unit === "metric" ? "Celsius" : "Fahrenheit"}
        </Typography>
        <Button
          variant="contained"
          onClick={prop.handleUnitChange}
          sx={{ mt: 2 }}
          fullWidth
        >
          Toggle Unit
        </Button>
        {prop.error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {prop.error}
          </Typography>
        )}

        <Typography variant="h6" sx={{ mt: 2 }}>
          Search History
        </Typography>
        {prop.searchHistory.length > 0 ? (
          <ul>
            {prop.searchHistory.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <Typography variant="body2">No search history</Typography>
        )}
      </Paper>
    </>
  );
};

export default SearchFunction;
