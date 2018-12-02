import merge from 'ramda/src/merge';
import curry from 'ramda/src/curry';

const mergeById = curry((id, updateAttr, item) => {
  if (id === item.id) return merge(item, updateAttr);
  return item;
});

const isLast = curry((collection, index) => index === (collection.length - 1));

export default {
  mergeById,
  isLast,
};
