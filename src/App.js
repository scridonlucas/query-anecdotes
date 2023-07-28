import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import Anecdotes from './components/Anecdotes';
import About from './components/About';
import { Route, Routes, Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';

const padding = {
  padding: 5,
};

const App = () => {
  return (
    <div className="container">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              {' '}
              <Link style={padding} to="/">
                Anecdotes
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {' '}
              <Link style={padding} to="/create">
                Create new
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {' '}
              <Link style={padding} to="/about">
                About
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

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
