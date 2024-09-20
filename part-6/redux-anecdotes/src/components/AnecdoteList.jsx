import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    const filteredAnecdotes = state.anecdotes.filter((a) =>
      a.content.toLowerCase().startsWith(state.filter.toLowerCase())
    );
    return filteredAnecdotes.sort((a, b) => b.votes - a.votes);
  });
  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
