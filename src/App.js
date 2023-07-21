import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import Anecdotes from './components/Anecdotes';
import { Route, Routes, Link } from 'react-router-dom';
const App = () => {
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />
      <Anecdotes />
    </div>
  );
};

export default App;
