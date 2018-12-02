import React from 'react';
import classnames from 'classnames';

import './Loader.scss';


const Loader = ({ isRequesting }) => {
  const componentState = classnames('loader', { 'loader--is-active': isRequesting });
  return (
    <div className={componentState}>
      <div className="loader__inner">
        <h2 className="loader__txt">Loading</h2>
      </div>
    </div>
  );
};

export default Loader;
