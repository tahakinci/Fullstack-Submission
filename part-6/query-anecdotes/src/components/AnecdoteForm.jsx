import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNew } from "../services/anecdotes";
import { useNotificationDispatch } from "./NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const newAnecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["anecdotes"] }),
    onError: () => {
      dispatch({
        type: "showNotification",
        payload: `too short anecdote, must have length 5 or more !`,
      });
      setTimeout(() => {
        dispatch({ type: "hideNotification" });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };
  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
