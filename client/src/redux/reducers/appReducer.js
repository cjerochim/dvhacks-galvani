import {
  merge,
  head,
  compose,
  prop,
} from 'ramda';

import utils from './utils';
import services from '../../services/requestService';
import pkg from '../../../package.json';

// Load in sample data rand run a batch request to the model
import userHistory from '../../data/history.json';

export const SET_REQUESTING = 'app/request/SET_REQUESTING';
export const SET_VIEW_TYPE = 'app/timeline/SET_VIEW_TYPE';
export const SET_DATE = 'app/timeline/SET_DATE';
export const SET_DATA = 'app/timeline/SET_DATA';
export const SELECT_DAY = 'app/timeline/SELECT_DAY';

const initialState = {
  version: pkg.version,
  isRequesting: true,
  date: '',
  type: 'week',
  selectedDay: '',
  actions: [],
  data: [],
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_REQUESTING:
      return merge(state, { isRequesting: payload.isRequesting });
    case SET_VIEW_TYPE:
      return merge(state, { type: payload.type });
    case SET_DATE:
      return merge(state, { date: payload.date });
    case SET_DATA:
      return merge(state, {
        date: compose(prop('date'), head)(payload.data),
        data: payload.data,
      });
    case SELECT_DAY:
      return merge(state, {
        selectDay: payload.date,
        actions: compose(utils.getAction, utils.getSentimentByDate(state.data))(payload.date),
      });
    default:
      return state;
  }
};

export const setRequesting = isRequesting => ({ type: SET_REQUESTING, payload: { isRequesting } });
export const setViewType = type => ({ type: SET_VIEW_TYPE, payload: { type } });
export const setDate = date => ({ type: SET_DATE, payload: { date } });
export const setData = data => ({ type: SET_DATA, payload: { data } });
export const selectDay = date => ({ type: SELECT_DAY, payload: { date } });

export const requestData = () => (dispatch) => {
  dispatch(setRequesting(true));
  services.requestBatchPredictions(userHistory)
    .then(({ data }) => {
      // Parse dates merge duplicate events for a day
      const parsedDates = utils.parseDates(data);
      // Update state
      dispatch(setData(parsedDates));
      // Hide Loader
      dispatch(setRequesting(false));
    })
    // TODO - Manage error state
    .catch(console.error);
};
