import axios from 'axios';
import _ from 'lodash/fp';

import * as refden from '../api/refden';

export const BASE_URL = 'https://doi.org';

const fetchReference = doi => axios({
  headers: {'Accept': 'application/json; charset=utf-8'},
  url: `${BASE_URL}/${doi}`,
}).catch(error => error);

const isValidResponse = _.flow(
  _.get('status'),
  _.lte(200) && _.gt(300),
);

const getInfo = _.flow(
  _.get('data'),
  _.pick(['DOI', 'title']),
);

const withRefdenPresence = (references) =>
  Promise.all(references.map(async (reference) => {
    const response = await refden.getReferencePresence(reference.DOI);
    reference.present = response.data.present;
    return reference;
  }));

const referencesFetcher = async (dois) => {
  const responses = await axios.all(dois.map(fetchReference));
  const references = _.flow(
    _.filter(isValidResponse),
    _.map(getInfo),
  )(responses);

  return withRefdenPresence(references);
};

export default referencesFetcher;
