import merge from 'ramda/src/merge';
import pkg from '../../../package.json';

export const SET_REQUESTING = 'app/request/SET_REQUESTING';

const initialState = {
  version: pkg.version,
  isRequesting: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_REQUESTING:
      return merge(state, { isRequesting: payload.isRequesting });
    default:
      return state;
  }
};

export const setRequesting = isRequesting => ({ type: SET_REQUESTING, payload: { isRequesting } });
