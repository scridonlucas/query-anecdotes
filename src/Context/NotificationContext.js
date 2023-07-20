import { createContext, useContext, useReducer } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TEXT':
      return action.payload;
    case 'CLEAR_TEXT':
      return '';
    default:
      return state;
  }
};

export const setNotification = (text) => {
  return {
    type: 'SET_TEXT',
    payload: text,
  };
};

export const clearNotification = () => {
  return {
    type: 'CLEAR_TEXT',
  };
};

const NotificationContext = createContext();

export const useNotificationValue = () => {
  const notificationAndValue = useContext(NotificationContext);
  return notificationAndValue[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;
