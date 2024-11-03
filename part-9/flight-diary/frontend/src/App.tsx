import { useEffect, useState } from "react";
import diaryServices from "./services/diaries";
import { Diary } from "./types";
import Diaries from "./components/Diaries";
import DiaryForm from "./components/DiaryForm";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    getDiaries();
  }, []);

  const getDiaries = async () => {
    const diaries = await diaryServices.getAll();
    if (diaries) {
      setDiaries(diaries);
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <DiaryForm />
      <h2>Diary entries</h2>
      <Diaries diaries={diaries} />
    </div>
  );
};

export default App;
