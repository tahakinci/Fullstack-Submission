import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAll, update } from "./services/anecdotes";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useNotificationDispatch } from "./components/NotificationContext";

const App = () => {
  const queryClient = useQueryClient();

  const dispatch = useNotificationDispatch();

  const updateAnecdoteMutation = useMutation({
    mutationFn: update,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      const updatedAnecdotes = anecdotes.map((anecdote) =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      );

      queryClient.setQueryData(["anecdotes"], updatedAnecdotes);
    },
  });

  const handleVote = async (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });

    await dispatch({
      type: "showNotification",
      payload: `You voted ${anecdote.content}`,
    });

    setTimeout(() => {
      dispatch({ type: "hideNotification" });
    }, 3000);
  };
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAll,
    retry: false,
  });

  if (result.isLoading) {
    return <div>Loading...</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
