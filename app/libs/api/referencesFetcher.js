import _ from 'lodash/fp';

import * as refden from '../api/refden';

export const BASE_URL = 'https://doi.org';

const fetchReference = doi => fetch(`${BASE_URL}/${doi}`, {
  headers: {'Accept': 'application/json; charset=utf-8'},
})
  .then(response => response.ok ? response.json() : Promise.reject('Error'))
  .catch(error => ({error}));

const isValidResponse = response => response && !response.error;

const hasTitle = _.flow(
  _.get('title'),
  _.negate(_.isEmpty),
);

const getInfo = _.pick(['DOI', 'title']);

const withRefdenPresence = async (references) =>
  Promise.all(references.map(async (reference) => {
    try {
      const response = await refden.getReferencePresence(reference.DOI);
      reference.present = response.present;
    } catch (error) {
      reference.present = false;
    }
    return reference;
  }));

const referencesFetcher = async (dois) => {
  const responses = await Promise.all(dois.map(fetchReference));
  const validResponses = responses.filter(isValidResponse);

  const references = _.flow(
    _.filter(_.has('DOI')),
    _.filter(hasTitle),
    _.uniqBy('DOI'),
    _.map(getInfo),
  )(validResponses);

  return withRefdenPresence(references);
};

export default referencesFetcher;
