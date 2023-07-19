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

export const updateAnecdote = async (newAnecdote) => {
  const id = newAnecdote.id;
  const response = await axios.put(`${url}/${id}`, newAnecdote);
  return response.data;
};
