import axios from "axios";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const getWeather = (coords) => {
  const req = axios.get(
    `${baseUrl}?lat=${coords[0]}&lon=${coords[1]}&appid=${
      import.meta.env.VITE_WEATHER_API_KEY
    }`
  );
  return req.then((res) => res.data);
};

export default { getWeather };
