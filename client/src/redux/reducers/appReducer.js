import { merge, head, compose, prop } from 'ramda';

import utils from './utils';

import pkg from '../../../package.json';

export const SET_REQUESTING = 'app/request/SET_REQUESTING';
export const SET_VIEW_TYPE = 'app/timeline/SET_VIEW_TYPE';
export const SET_DATE = 'app/timeline/SET_DATE';
export const SET_DATA = 'app/timeline/SET_DATA';

export const SELECT_DAY = 'app/timeline/SELECT_DAY';

// Raw data
const rawData = [
  { date: '2018-02-01', sentiment: 0.1 },
  { date: '2018-02-01', sentiment: 0.3 },
  { date: '2018-02-01', sentiment: 0.3 },
  { date: '2018-02-01', sentiment: 0.3 },
  { date: '2018-02-01', sentiment: 0.3 },
  { date: '2018-02-01', sentiment: 0.7 },
  { date: '2018-02-02', sentiment: 0.2 },
  { date: '2018-02-03', sentiment: 0.2 },
  { date: '2018-02-04', sentiment: 0.2 },
  { date: '2018-02-05', sentiment: 0.2 },
  { date: '2018-02-06', sentiment: 0.2 },
  { date: '2018-02-06', sentiment: 0.3 },
  { date: '2018-02-06', sentiment: 0.2 },
  { date: '2018-02-06', sentiment: 0.2 },
  { date: '2018-02-07', sentiment: 0.2 },
  { date: '2018-02-08', sentiment: 0.2 },
  { date: '2018-02-09', sentiment: 0.2 },
  { date: '2018-02-10', sentiment: 0.2 },
  { date: '2018-02-11', sentiment: 0.2 },
  { date: '2018-02-12', sentiment: 0.2 },
  { date: '2018-02-13', sentiment: 0.2 },
  { date: '2018-02-14', sentiment: 0.2 },
  { date: '2018-02-15', sentiment: 0.2 },
  { date: '2018-02-16', sentiment: 0.2 },
  { date: '2018-02-17', sentiment: 0.2 },
  { date: '2018-02-18', sentiment: 0.2 },
  { date: '2018-02-19', sentiment: 0.2 },
  { date: '2018-02-20', sentiment: 0.2 },
  { date: '2018-02-21', sentiment: 0.2 },
  { date: '2018-02-22', sentiment: 0.2 },
  { date: '2018-02-23', sentiment: 0.2 },
  { date: '2018-02-24', sentiment: 0.2 },
];

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
  setTimeout(() => {
    const parsedDates = utils.parseDates(rawData);
    dispatch(setData(parsedDates));
    dispatch(setRequesting(false));
  }, 2000);
};
