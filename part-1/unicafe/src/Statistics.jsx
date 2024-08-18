import { StatisticLine } from "./StatisticLine";

export const Statistics = ({ good, bad, neutral }) => {
  return (
    <table>
      <tbody>
        <StatisticLine text={"good"} value={good} />
        <StatisticLine text={"neutral"} value={neutral} />
        <StatisticLine text={"bad"} value={bad} />
        <StatisticLine text={"all"} value={good + bad + neutral} />
        <StatisticLine
          text={"average"}
          value={(good - bad) / (good + bad + neutral)}
        />
        <StatisticLine
          text={"average"}
          value={(good * 100) / (good + bad + neutral) + "%"}
        />
      </tbody>
      {/* <tr>
        <tr>good: {good}</tr>
        <tr>neutral: {neutral}</tr>
        <tr>bad: {bad}</tr>
        <tr>all: {good + bad + neutral}</tr>
        <tr>average {(good - bad) / (good + bad + neutral)}</tr>
        <tr>positive {good / (good + bad + neutral)} %</tr>
      </tr> */}
    </table>
  );
};
