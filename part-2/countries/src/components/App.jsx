import { useState, useEffect } from "react";
import countryService from "../services/countries";
import Countries from "./Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    countryService
      .getAll()
      .then((returnedCountries) => setCountries(returnedCountries));
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(filter.toLocaleLowerCase())
    );
    setFilteredCountries(filteredCountries);
  };
  return (
    <div>
      <div>
        find countries{" "}
        <input type="text" value={filter} onChange={handleFilter} />
      </div>
      <Countries countries={filteredCountries} />
    </div>
  );
}

export default App;
