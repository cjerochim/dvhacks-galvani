import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

export default history => applyMiddleware(
  thunk,
  routerMiddleware(history),
);
