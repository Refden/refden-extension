import _ from 'lodash/fp';

export const match = _.curry(
  (regex, string) => string.match(regex)
);
