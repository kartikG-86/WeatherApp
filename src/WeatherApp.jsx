import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "weather-icons-react";

import Grid from "@mui/material/Grid";

import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import SearchFunction from "./components/SearchFunction";
import Display from "./components/Display";
import Forecast from "./components/Forecast";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const API_KEY = "43906d27394468badebd5d1199295256";



const Month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [darkMode, setDarkmode] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [language, setLanguage] = useState("en");

  const [unit, setUnit] = useState("metric");

  const darkTheme = createTheme({
    palette: { mode: darkMode ? "dark" : "light" },
  });

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleUnitChange = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  const fetchWeatherData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`
      );
      setWeatherData(response.data);
      setError(null);
      setSearchHistory((prevHistory) => [...prevHistory, response.data.name]);
    } catch (error) {
      setWeatherData(null);
      setError("Error fetching weather data. Please try again.");
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      console.log(navigator.geolocation);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          console.log(position);
          try {
            const response = await axios.get(
              `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&units=${unit}`
            );
            console.log(response.data);
            setWeatherData(response.data);
            setError(null);
          } catch (error) {
            setWeatherData(null);
            setError("Error fetching weather data. Please try again.");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [unit]);

  const fetchForecastData = async () => {
    if (weatherData) {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${unit}`
        );
        setWeatherData((prevData) => ({
          ...prevData,
          forecast: response.data,
        }));
      } catch (error) {
        setError("Error fetching forecast data. Please try again.");
      }
    }
  };

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case "Clear":
        return (
          <WiDaySunny size={50} color={darkMode == false ? "black" : "white"} />
        );
      case "Clouds":
        return (
          <WiCloudy size={50} color={darkMode == false ? "black" : "white"} />
        );
      case "Rain":
        return (
          <WiRain size={50} color={darkMode == false ? "black" : "white"} />
        );
      case "Snow":
        return (
          <WiSnow size={50} color={darkMode == false ? "black" : "white"} />
        );
      case "Thunderstorm":
        return (
          <WiThunderstorm
            size={50}
            color={darkMode == false ? "black" : "white"}
          />
        );
      default:
        return null;
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `
    ${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const getWindDirection = (degree) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round((degree % 360) / 45);
    return directions[index];
  };

  const getDayOfWeek = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const day = date.getDate();
    const month = date.getMonth();

    return `${Month[month]} ${day <= 9 ? `0${day}` : day} `;
  };

  const switchLanguage = (lang) => {
    setLanguage(lang);
  };

  let handleDark = () => {
    setDarkmode(!darkMode);
    console.log(darkMode);
  };

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container style={{ marginBottom: "3rem" }}>
          <Navbar darkMode={darkMode} handleDark={handleDark} />
          <Container style={{ marginTop: "7rem" }}>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={12} sm={6}>
                <SearchFunction
                  fetchWeatherData={fetchWeatherData}
                  error={error}
                  fetchForecastData={fetchForecastData}
                  handleUnitChange={handleUnitChange}
                  handleInputChange={handleInputChange}
                  unit={unit}
                  city={city}
                  searchHistory={searchHistory}
                  language={language}
                  switchLanguage={switchLanguage}
                />
              </Grid>

              <Display
                weatherData={weatherData}
                formatTime={formatTime}
                getWindDirection={getWindDirection}
                getWeatherIcon={getWeatherIcon}
              />

              <Forecast
                unit={unit}
                formatTime={formatTime}
                getWeatherIcon={getWeatherIcon}
                weatherData={weatherData}
                getDayOfWeek={getDayOfWeek}
              />
            </Grid>
          </Container>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default WeatherApp;
