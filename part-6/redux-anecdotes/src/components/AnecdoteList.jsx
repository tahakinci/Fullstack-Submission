import { useSelector, useDispatch } from "react-redux";
import { updateAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    const filteredAnecdotes = state.anecdotes.filter((a) =>
      a.content.toLowerCase().startsWith(state.filter.toLowerCase())
    );
    return filteredAnecdotes.sort((a, b) => b.votes - a.votes);
  });

  const handleVote = (anecdote) => {
    dispatch(updateAnecdote(anecdote));
    dispatch(setNotification(`You voted '${anecdote.content}'`, 3));
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
