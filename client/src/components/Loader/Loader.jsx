import React from 'react';
import classnames from 'classnames';
import { PulseLoader } from 'react-spinners';

import './Loader.scss';

const Loader = ({ isRequesting }) => {
  const componentState = classnames('loader', { 'loader--is-active': isRequesting });
  return (
    <div className={componentState}>
      <div className="loader__inner">
        <PulseLoader loading color="#fff" />
      </div>
    </div>
  );
};

export default Loader;
