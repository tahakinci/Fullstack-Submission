import { Diary } from "../types";

interface DiariesPropTypes {
  diaries: Diary[];
}

const Diaries = ({ diaries }: DiariesPropTypes) => {
  return (
    <div>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <p>
            <b>{diary.date}</b>
          </p>
          <br />
          visibility: {diary.visibility}
          weather: {diary.weather}
        </div>
      ))}
    </div>
  );
};

export default Diaries;
