import CountryInfo from "./CountryInfo";

const Countries = ({ countries }) => {
  if (countries.length > 10)
    return <p>Too many matches, specify another filter</p>;

  return (
    <>
      <ul>
        {countries.map((country) => {
          return (
            <li key={country.name.common}>
              <CountryInfo country={country} show={countries.length === 1} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Countries;
