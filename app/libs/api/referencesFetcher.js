import axios from 'axios';
import _ from 'lodash/fp';

export const BASE_URL = 'https://doi.org';

const fecthReference = doi => axios({
  headers: { 'Accept': 'application/json; charset=utf-8' },
  url: `${BASE_URL}/${doi}`,
});

const getTitle = _.get('data.title');

const referencesFetcher = async (dois) => {
  const responses = await axios.all(dois.map(fecthReference));
  return responses.map(getTitle);
};

export default referencesFetcher;
