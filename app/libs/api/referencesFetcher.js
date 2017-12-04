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

const getInfo = _.flow(
  _.get('data'),
  _.pick(['DOI', 'title']),
);

const referencesFetcher = async (dois) => {
  const responses = await axios.all(dois.map(fecthReference));

  return _.flow(
    _.filter(isValidResponse),
    _.map(getInfo),
  )(responses);
};

export default referencesFetcher;
