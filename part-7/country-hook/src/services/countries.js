import axios from "axios";

export const getAll = async () => {
  const response = await axios.get(
    "https://studies.cs.helsinki.fi/restcountries/api/all"
  );
  return response.data;
};

export const getCountry = async (country) => {
  const response = await axios.get(
    `https://studies.cs.helsinki.fi/restcountries/api/name/${country}`
  );
  return response.data;
};
