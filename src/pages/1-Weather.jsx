import { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// API endpoint — Mississauga coordinates, returns current weather
// https://api.open-meteo.com/v1/forecast?latitude=43.5890&longitude=-79.6441&current_weather=true
//
// Useful fields in response.current_weather:
//   temperature    — current temp in °C
//   windspeed      — wind speed in km/h
//   weathercode    — WMO code (0 = clear sky, 61 = rain, etc.)

const API_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=43.5890&longitude=-79.6441&current_weather=true";

export default function WeatherOnMount() {
  // 1. Declare state variables for weather data, loading, and error
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Write a useEffect that runs once when the component mounts
  //    - Use an empty dependency array []
  //    - Define an async function inside the effect
  //    - Fetch from API_URL
  //    URL: https://api.open-meteo.com/v1/forecast?latitude=43.5890&longitude=-79.6441&current_weather=true
  //    - Use try / catch / finally
  //    - Check response.ok before parsing JSON
  //    - Set weather, error, and loading state accordingly
  useEffect(() => {

    async function fetchweather() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error('Some problem with API, try again')
        }

        //convert json to javascript
        const data = await response.json();
        setWeather(data.current_weather);
      }
      catch (err) {
        setError(err.message);
      }
      finally {
      setLoading(false);  // Weather displayed or error displayed so we have to stop loading message
      }
  }
  fetchweather();
  }, []); //one time only

  // 3. Handle the loading state
  //    For now render a plain text message
  //    TODO later: replace with MUI CircularProgress
  if (loading)
    return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
    );

  // 4. Handle the error state
  if (error) return <p>Error: {error}</p>;

  // 5. Render the weather data
  //    Display at minimum: temperature, windspeed, weathercode
  return (
    <div>
      <h2>Current Weather — Mississauga</h2>

      {/* TODO: display weather.temperature */}
      <p>Temperature: {weather.temperature}</p>
      {/* TODO: display weather.windspeed */}
      <p>Windspeed: {weather.windspeed}</p>
      {/* TODO: display weather.weathercode */}
      <p>Time: {weather.time}</p>
    </div>
  );
}