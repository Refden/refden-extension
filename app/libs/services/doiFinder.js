import _ from 'lodash/fp';

import { match } from '../utils/lodashfp';

const DOI_REGEX = /\b10\.(?:\d+\.*)+[/](?:(?:[^\s.])+\.*)+\b/g;

const doiFinder = document => {
  const doisFromLinks = _.flow(
    _.map('href'),
    _.flatMap(match(DOI_REGEX)),
  )(document.links);

  const doisFromText = document.body.innerText.match(DOI_REGEX);

  const dois = _.concat(doisFromLinks, doisFromText);

  return _.flow(
    _.uniq,
    _.compact,
    _.take(10),
  )(dois);
};

export default doiFinder;
