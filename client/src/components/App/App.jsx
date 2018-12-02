import React from 'react';
import PropTypes from 'prop-types';
import VersionContainer from '../../containers/VersionContainer';

import MainBar from '../MainBar/MainBar';

import './App.scss';

const App = ({ children }) => (
  <div className="app">
    <MainBar />
    <main className="app__main">
      {children}
    </main>
    <div className="app__version">
      <VersionContainer />
    </div>
  </div>
);

App.defaultProps = {
  children: null,
};

App.propTypes = {
  children: PropTypes.node,
};

export default App;
