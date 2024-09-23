import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { getNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    const filteredAnecdotes = state.anecdotes.filter((a) =>
      a.content.toLowerCase().startsWith(state.filter.toLowerCase())
    );
    return filteredAnecdotes.sort((a, b) => b.votes - a.votes);
  });

  const handleVote = (anecdote) => {
    dispatch(vote(anecdote.id));

    const notification = {
      content: anecdote.content,
      style: {
        border: "solid",
        padding: 10,
        borderWidth: 1,
        display: "block",
      },
    };
    dispatch(getNotification(notification));
    setTimeout(() => {
      dispatch(
        getNotification({
          content: anecdote.content,
          style: {
            border: "solid",
            padding: 10,
            borderWidth: 1,
            display: "none",
          },
        })
      );
    }, 3000);
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
