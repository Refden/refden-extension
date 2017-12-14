import _ from 'lodash/fp';

import { match } from '../utils/lodashfp';

const DOI_REGEX = /\b10\.(?:\d+\.*)+[/](?:(?:[^\s.])+\.*)+\b/g;

const doisFromText = _.flow(
  _.get('body.innerText'),
  match(DOI_REGEX),
);

const doisFromLinks = _.flow(
  _.get('links'),
  _.map('href'),
  _.flatMap(match(DOI_REGEX)),
);

const doiFinder = _.flow(
  document => _.concat(doisFromText(document), doisFromLinks(document)),
  _.uniq,
  _.compact,
  _.take(10),
);

export default doiFinder;
