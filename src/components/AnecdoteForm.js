import { useMutation, useQueryClient } from 'react-query';
import { createAnecdote } from '../services';
import {
  setNotification,
  clearNotification,
  useNotificationDispatch,
} from '../Context/NotificationContext';
import { useNavigate } from 'react-router-dom';
import { Table, Form, Button } from 'react-bootstrap';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

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
    navigate('/');
  };

  return (
    <div>
      <h3>create new</h3>
      <Form onSubmit={onCreate}>
        <Form.Group>
          <Form.Control name="anecdote" />
          <Button variant="primary" type="submit">
            create
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default AnecdoteForm;
