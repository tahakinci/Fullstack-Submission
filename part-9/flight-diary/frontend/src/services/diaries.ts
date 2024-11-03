import axios from "axios";
import { Diary, NewDiary } from "../types";
import { v4 as uuidv4 } from "uuid";
const baseUrl = "/api/diaries";

const getAll = async () => {
  const res = await axios.get<Diary[]>(baseUrl);
  return res.data;
};

const createDiary = async (newObject: NewDiary) => {
  const id = uuidv4();
  const obj = { id: id, ...newObject };
  const res = await axios.post<Diary>(baseUrl, obj);
  return res.data;
};

export default { getAll, createDiary };
