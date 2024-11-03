import { useState } from "react";
import diaryServices from "../services/diaries";
import Notification from "./Notification";
import { AxiosError } from "axios";
import { NewDiary, Visibility, Weather } from "../types";

export interface INotification {
  status: "success" | "error";
  message: string;
}

const DiaryForm = () => {
  const [notification, setNotification] = useState<INotification>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement); // Cast event.target to HTMLFormElement
    const object: NewDiary = {
      date: formData.get("date") as string,
      visibility: formData.get("visibility") as Visibility,
      weather: formData.get("weather") as Weather,
      comment: formData.get("comment") as string,
    };
    console.log(object);
    try {
      await diaryServices.createDiary(object);
      setNotification({
        status: "success",
        message: "Diary added successfully",
      });
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage =
        typeof axiosError.response?.data === "string"
          ? axiosError.response.data
          : "An error occurred";

      setNotification({ status: "error", message: errorMessage });
      console.log(errorMessage);
    }
  };
  return (
    <div>
      {notification && <Notification notification={notification} />}
      <form onSubmit={handleSubmit}>
        date: <input name="date" type="date" />
        <br />
        visibility: <label htmlFor="great">great</label>
        <input
          id="great"
          type="radio"
          value="great"
          checked
          name="visibility"
        />{" "}
        <label htmlFor="good">good</label>
        <input id="good" type="radio" value="good" name="visibility" />
        <label htmlFor="ok">ok</label>
        <input id="ok" type="radio" value="ok" name="visibility" />
        <label htmlFor="poor">poor</label>
        <input id="poor" type="radio" value="poor" name="visibility" /> <br />
        weather: <label htmlFor="sunny">sunny</label>
        <input
          id="sunny"
          type="radio"
          value="sunny"
          checked
          name="weather"
        />{" "}
        <label htmlFor="rainy">rainy</label>
        <input id="rainy" type="radio" value="rainy" name="weather" />
        <label htmlFor="cloudy">cloudy</label>
        <input id="cloudy" type="radio" value="cloudy" name="weather" />
        <label htmlFor="stormy">stormy</label>
        <input id="stormy" type="radio" value="stormy" name="weather" />
        <label htmlFor="windy">windy</label>
        <input id="windy" type="radio" value="windy" name="weather" />
        <br />
        comment: <input name="comment" />
        <br />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
