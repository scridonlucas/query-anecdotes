import { useNotificationValue } from '../Context/NotificationContext';
import { Alert } from 'react-bootstrap';

const Notification = () => {
  const notificationText = useNotificationValue();

  if (notificationText === '') return null;

  return <Alert variant="success">{notificationText}</Alert>;
};

export default Notification;
