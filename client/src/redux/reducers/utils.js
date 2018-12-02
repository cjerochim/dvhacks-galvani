import {
  map,
  compose,
  prop,
  curry,
  head,
  reduce,
  groupWith,
  flatten,
  find,
  propEq,
} from 'ramda';


// Match against date values
const groupDatesByDate = groupWith((a, b) => a.date === b.date);

// Average sentiment on duplicate dates
const averageDuplicateDates = (v) => {
  // If only 1 item no need to determine average skip it
  if (v.length === 1) return v;
  // Get the total sum of sentiment
  const totalSentiment = reduce((sum, { sentiment }) => sum + sentiment, 0, v);
  // Retain the date and return the sentiment average
  return {
    date: compose(prop('date'), head)(v),
    sentiment: totalSentiment / v.length,
  };
};


// Parse dates to return a flatten array with the average of each sentiment
const parseDates = (rawData) => {
  // Split date set into matching days
  const groupedDates = groupDatesByDate(rawData);
  // Average days with more than one event
  const averageGroupedDates = map(averageDuplicateDates)(groupedDates);
  // flatten collection
  const dates = flatten(averageGroupedDates);
  return dates;
};


// For demo purpose, this would have more thought in considerations
// around the sentiment thresholds and clear actions
const getAction = (sentiment) => {
  // Everything is good in life carry on
  if (sentiment > 0.6) return [];
  // Ok... that's it I'm over it.
  if (sentiment <= 0.2) return [{ id: '23434', title: 'Catch-up', text: 'Locked in a meeting to have a coffee and catch-up' }];
  // Umm... something needs to happen here
  if (sentiment <= 0.3) return [{ id: '3e323', title: 'Great news! You have Friday off', text: 'Just confirmed with Julien, you have a much needed break' }]
  // Well, this is not cool i'm getting tired
  if (sentiment <= 0.4) return [{ id: '23425', title: 'Working waay to many hours', text: 'Why don\'t you try to leave your laptop at work' }];
  // Not soo cool, we're ok but could be better
  if (sentiment <= 0.6) return [{ id: '24235656', title: 'Are you ok?', text: 'Have a break, get some fresh air' }];
  return [];
};


const getSentimentByDate = curry((dates, date) => compose(
  prop('sentiment'),
  find(propEq('date', date)),
)(dates));

export default {
  parseDates,
  getAction,
  getSentimentByDate,
};
