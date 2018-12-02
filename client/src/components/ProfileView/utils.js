import Moment from 'moment';
import { extendMoment } from 'moment-range';

import {
  range,
  map,
  compose,
  curry,
} from 'ramda';

const moment = extendMoment(Moment);

// TODO: REMOVE
const randomRange = (min, max) => (Math.random() * (max - min) + min);

// high-order function to get range based on "rangeType" this could be "day", "month"
const getDateRangeBy = curry((rangeType, from, to) => {
  const fromM = moment(from);
  const toM = moment(to);
  const dateRange = moment().range(fromM, toM);
  const result = Array.from(dateRange.by(rangeType));
  return result;
});

// get an array of days
const getDateRangeByDay = getDateRangeBy('day');

// Simple function to convert a value to day format
const toDay = v => moment(v).format('DD');

// Get all dates and format
const getDaysFormatted = (startDate, endDate) => compose(
  map(toDay),
  getDateRangeByDay(startDate),
)(endDate);


// get all days for the week
const getDaysForMonth = (date) => {
  // Return total days based on date selected
  const daysInMonth = moment(date).daysInMonth();
  // Offset the value to ensure it returns dates from 1
  const days = range(1)(daysInMonth + 1);
  return days;
};

// get Days for the week
const getDaysForWeek = (date) => {
  const weekStart = moment(date).startOf('week');
  const weekEnd = moment(date).endOf('week');
  const days = getDaysFormatted(weekStart, weekEnd);
  return days;
};

export default {
  getDaysForMonth,
  getDaysForWeek,
  // TODO: Remove
  randomRange,
};
