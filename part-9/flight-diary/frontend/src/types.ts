export type Weather = "sunny" | "rainy" | "cloudy" | "stormy" | "windy";

export type Visibility = "great" | "good" | "ok" | "poor";

export interface Diary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

export type NewDiary = Omit<Diary, "id">;

export type NonSensitiveDiary = Omit<Diary, "comment">;
