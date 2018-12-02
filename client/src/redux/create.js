import { createStore, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import history from '../services/historyService';
import middleware from './middleware';
import reducers from './reducers';


const initialState = {};

export default (state = initialState) => {
  let composeMiddleware;
  if (process.env.NODE_ENV === 'production') {
    composeMiddleware = compose(middleware(history));
  } else {
    composeMiddleware = composeWithDevTools(middleware(history));
  }
  const store = createStore(reducers, state, composeMiddleware);
  return { store };
};
