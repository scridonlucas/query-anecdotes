import { useQuery } from 'react-query';
import { getAnecdotes } from '../services';
import { updateAnecdote } from '../services';
import { useMutation, useQueryClient } from 'react-query';
import {
  setNotification,
  clearNotification,
  useNotificationDispatch,
} from '../Context/NotificationContext';

const Anecdote = ({ content, votes, handleClick }) => {
  return (
    <>
      <div>{content}</div>
      <div>
        has {votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </>
  );
};

const Anecdotes = () => {
  const result = useQuery('anecdotes', getAnecdotes);

  const queryClient = useQueryClient();

  const dispatch = useNotificationDispatch();

  const voteAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes');
    },
  });

  if (result.isLoading) {
    return <div>Loading data...</div>;
  }

  if (result.isError) {
    return <div>Error: {result.error}</div>;
  }

  const anecdotes = result.data;

  const showNotification = (text) => {
    dispatch(setNotification(text));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 3000);
  };

  const handleVote = (anecdote) => {
    const newAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    voteAnecdoteMutation.mutate(newAnecdote);
    showNotification(`${newAnecdote.content} has been successfullty voted`);
  };
  return (
    <>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          content={anecdote.content}
          votes={anecdote.votes}
          handleClick={() => {
            handleVote(anecdote);
          }}
        />
      ))}
    </>
  );
};

export default Anecdotes;
