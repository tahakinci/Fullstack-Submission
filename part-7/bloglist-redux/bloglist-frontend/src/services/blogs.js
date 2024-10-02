import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  console.log(newToken);
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const req = await axios.get(baseUrl);
  return req.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const req = await axios.post(baseUrl, newObject, config);
  return req.data;
};

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const req = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return req.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const req = await axios.delete(`${baseUrl}/${id}`, config);
  console.log(req.data);
  return req.data;
};

export default { getAll, setToken, create, update, remove };
