import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import ProfileViewContainer from '../../containers/ProfileViewContainer';

import './Routes.scss';

const NoPage = () => (<div />);

const Routes = ({ location }) => (
  <TransitionGroup className="routes">
    <CSSTransition key={location.key} timeout={500} classNames="routes-">
      <Switch location={location}>
        <Route exact path="/" component={ProfileViewContainer} />
        <Route path="*" component={NoPage} />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
);

Routes.defaultProps = {
  location: {
    key: '',
  },
};

Routes.propTypes = {
  location: PropTypes.shape({
    key: PropTypes.string,
  }),
};

export default Routes;
