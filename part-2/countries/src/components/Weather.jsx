const Weather = ({ capital, weather }) => {
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>temperature {weather?.main?.temp}</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt=""
      />
      <p>wind {weather.wind.speed}</p>
    </div>
  );
};

export default Weather;
