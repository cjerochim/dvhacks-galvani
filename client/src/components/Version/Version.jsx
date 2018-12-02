import React from 'react';
import PropTypes from 'prop-types';

import './Version.scss';

const Version = ({ version }) => (
  <div className="version">
    <h6 className="version__title">
      {version}
    </h6>
  </div>
);

Version.propTypes = {
  version: PropTypes.string.isRequired,
};

export default Version;
