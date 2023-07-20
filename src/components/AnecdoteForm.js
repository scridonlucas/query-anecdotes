import { useMutation, useQueryClient } from 'react-query';
import { createAnecdote } from '../services';
import {
  setNotification,
  clearNotification,
  useNotificationDispatch,
} from '../Context/NotificationContext';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const dispatch = useNotificationDispatch();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes');
    },
    onError: () => {
      showNotification('Too short! Anecdote must at least have 5 characters.');
    },
  });

  const showNotification = (text) => {
    dispatch(setNotification(text));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 3000);
  };

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    const newAnecdote = {
      content: content,
      votes: 0,
    };
    newAnecdoteMutation.mutate(newAnecdote);
    showNotification(`${newAnecdote.content} has been successfully created`);
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
