import axios from 'axios';

const url = 'http://localhost:3001/anecdotes';

export const getAnecdotes = async () => {
  const response = await axios.get(url);
  return response.data;
};

export const createAnecdote = async (anecdote) => {
  const response = await axios.post(url, anecdote);
  return response.data;
};
