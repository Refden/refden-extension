import _ from 'lodash/fp';

import { match } from '../utils/lodashfp';

const DOI_REGEX = /\b10\.(?:\d+\.*)+[/](?:(?:[^\s.])+\.*)+\b/g;

const doiFinder = _.flow(
  match(DOI_REGEX),
  _.uniq,
  _.take(10),
);

export default doiFinder;
