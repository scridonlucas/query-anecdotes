import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import Anecdotes from './components/Anecdotes';
import About from './components/About';
import { Route, Routes, Link } from 'react-router-dom';

const padding = {
  padding: 5,
};

const App = () => {
  return (
    <div>
      <Link style={padding} to="/">
        Anecdotes
      </Link>
      <Link style={padding} to="/create">
        Create new
      </Link>
      <Link style={padding} to="/about">
        About
      </Link>
      <h3>Anecdote app</h3>
      <Notification />
      <Routes>
        <Route path="/" element={<Anecdotes />} />
        <Route path="/create" element={<AnecdoteForm />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;
