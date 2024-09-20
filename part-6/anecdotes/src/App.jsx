import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

  let mostVotedAnecdote;
  for (let i = 0; i < points.length; i++) {
    const greatestNumOfArr = Math.max(...points);
    if (points[i] === greatestNumOfArr) {
      mostVotedAnecdote = i;
    }
  }

  console.log(mostVotedAnecdote);
  const handleSelected = () => {
    const index = Math.round(Math.random() * anecdotes.length - 1);
    setSelected(index);
  };

  const handleVote = () => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
  };

  return (
    <div>
      <div>
        <h3>Anecdote of the day</h3>
        <p>{anecdotes[selected]}</p>
        <p>
          has {points[selected]} {points[selected] > 1 ? "votes" : "vote"}
        </p>
        <div>
          <button onClick={handleVote}>vote</button>
          <button onClick={handleSelected}>next anecdote</button>
        </div>
      </div>
      <div>
        <h3>Anecdote with most votes</h3>
        <p>{anecdotes[mostVotedAnecdote]}</p>
        <p>
          has {points[mostVotedAnecdote]}{" "}
          {points[mostVotedAnecdote] > 1 ? "votes" : "vote"}
        </p>
      </div>
    </div>
  );
};

export default App;
