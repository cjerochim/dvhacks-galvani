import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import history from '../services/historyService';
import createStore from '../redux/create';
import App from '../components/App/App';
import RoutesContainer from './RoutesContainer';

const { store } = createStore({});

export default () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App>
        <RoutesContainer />
      </App>
    </ConnectedRouter>
  </Provider>
);
