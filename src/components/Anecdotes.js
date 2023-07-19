import { useQuery } from 'react-query';
import { getAnecdotes } from '../services';
import { updateAnecdote } from '../services';
import { useMutation, useQueryClient } from 'react-query';

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

  const handleVote = (anecdote) => {
    const newAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    voteAnecdoteMutation.mutate(newAnecdote);
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
