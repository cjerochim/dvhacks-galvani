import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './View.scss';

const View = ({ children, center }) => {
  const componentState = classnames('view', { 'view--center': center });
  return (
    <div className={componentState}>
      {children}
    </div>
  );
};

View.defaultProps = {
  center: false,
};

View.propTypes = {
  children: PropTypes.element.isRequired,
  center: PropTypes.bool,
};

export default View;
