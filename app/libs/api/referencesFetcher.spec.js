import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import referencesFetcher, { BASE_URL } from './referencesFetcher';

describe('referencesFetcher()', () => {
  it('returns titles for DOIs', async () => {
    const firstDoi = '10.1016/j.yjmcc.2015.01.021';
    const secondDoi = '10.1042/CS20100476';
    const mock = new MockAdapter(axios);
    const dataFirstDoi = {
      DOI: firstDoi,
      title: 'Cellular and molecular biology of aging endothelial cells',
    };
    const dataSecondDoi = {
      DOI: secondDoi,
      title: 'Aging and vascular endothelial function in humans',
    };
    mock.onGet(`${BASE_URL}/${firstDoi}`).reply(200, dataFirstDoi);
    mock.onGet(`${BASE_URL}/${secondDoi}`).reply(200, dataSecondDoi);

    const actual = await referencesFetcher([firstDoi, secondDoi]);
    const expected = [
      { DOI: firstDoi, title: 'Cellular and molecular biology of aging endothelial cells' },
      { DOI: secondDoi, title: 'Aging and vascular endothelial function in humans' },
    ];

    expect(actual).toEqual(expected);
  });

  it('filters out a doi returning 404', async () => {
    const doi = '10.1371/journal.pbio.0000005';
    const mock = new MockAdapter(axios);
    mock.onGet(`${BASE_URL}/${doi}`).reply(404, {});

    const actual = await referencesFetcher([doi]);
    const expected = [];

    expect(actual).toEqual(expected);
  });
});
