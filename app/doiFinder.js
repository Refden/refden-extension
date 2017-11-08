import _ from 'lodash/fp';

import { match } from './libs/utils/lodashfp';

const DOI_REGEX = /\b10\.(?:\d+\.*)+[/](?:(?:[^\s.])+\.*)+\b/g;

const doiFinder = _.flow(match(DOI_REGEX), _.uniq);

export default doiFinder;
