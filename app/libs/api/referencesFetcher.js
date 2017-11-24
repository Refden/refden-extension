import axios from 'axios';
import _ from 'lodash/fp';

export const BASE_URL = 'https://doi.org';

const fecthReference = doi => axios({
  headers: { 'Accept': 'application/json; charset=utf-8' },
  url: `${BASE_URL}/${doi}`,
}).catch(error => error);

const isValidResponse = _.flow(
  _.get('status'),
  _.lte(200) && _.gt(300),
);

const getTitle = _.get('data.title');

const referencesFetcher = async (dois) => {
  const responses = await axios.all(dois.map(fecthReference));

  return _.flow(
    _.filter(isValidResponse),
    _.map(getTitle),
  )(responses);
};

export default referencesFetcher;
