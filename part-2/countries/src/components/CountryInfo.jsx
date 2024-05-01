import { useState, useEffect } from "react";
import Weather from "./Weather";
import weatherService from "../services/weather";

const CountryInfo = ({ country = [], show }) => {
  const [display, setDisplay] = useState(show);
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    const req = weatherService.getWeather(country.latlng);
    req.then((returnedWeather) => setWeather(returnedWeather));
  }, []);

  useEffect(() => {
    setDisplay(show);
  }, [show]);

  if (!display)
    return (
      <div>
        {country.name.common}{" "}
        <button onClick={() => setDisplay(!display)}>show</button>
      </div>
    );
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <h2>{country.name.common}</h2>
        <button onClick={() => setDisplay(!display)}>hide</button>
      </div>
      <p>capital {country.capital}</p>
      <p>area {country.area} </p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={country.name.common + language}>{language}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={country.flags.alt}
        style={{ width: "250px", marginTop: "10px" }}
      />
      <Weather capital={country.capital[0]} weather={weather} />
      <hr />
    </div>
  );
};

export default CountryInfo;
