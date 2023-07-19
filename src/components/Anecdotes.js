import { useQuery } from 'react-query';
import { getAnecdotes } from '../services';

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

  if (result.isLoading) {
    return <div>Loading data...</div>;
  }

  if (result.isError) {
    return <div>Error: {result.error}</div>;
  }

  const anecdotes = result.data;

  const handleVote = (anecdote) => {
    console.log(anecdote.id);
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
