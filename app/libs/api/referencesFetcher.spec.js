import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import referencesFetcher, { BASE_URL } from './referencesFetcher';
import { REFERENCES_URL } from './refden';

const mockRefdenPresence = (mock, doi, present) =>
  mock.onGet(REFERENCES_URL, { params: { doi } }).reply(200, { doi, present });

describe('referencesFetcher()', () => {
  it('returns titles and presence status for DOIs', async () => {
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
    mockRefdenPresence(mock, firstDoi, true);
    mockRefdenPresence(mock, secondDoi, false);

    const actual = await referencesFetcher([firstDoi, secondDoi]);
    const expected = [
      {
        DOI: firstDoi,
        title: 'Cellular and molecular biology of aging endothelial cells',
        present: true,
      },
      {
        DOI: secondDoi,
        title: 'Aging and vascular endothelial function in humans',
        present: false,
      },
    ];

    expect(actual).toEqual(expected);
  });

  it('removes duplicates', async () => {
    const firstDoi = '10.1016/j.yjmcc.2015.01.021';
    const secondDoi = '10.1016/j.yjmcc.2015.01.021?x=a';
    const mock = new MockAdapter(axios);
    const dataDoi = {
      DOI: firstDoi,
      title: 'Da title',
    };
    mock.onGet(`${BASE_URL}/${firstDoi}`).reply(200, dataDoi);
    mock.onGet(`${BASE_URL}/${secondDoi}`).reply(200, dataDoi);
    mockRefdenPresence(mock, firstDoi, true);
    mockRefdenPresence(mock, secondDoi, true);

    const actual = await referencesFetcher([firstDoi, secondDoi]);
    const expected = [
      {
        DOI: firstDoi,
        title: 'Da title',
        present: true,
      },
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

  it('filters out a doi not returning DOI data', async () => {
    const doi = '10.1371/journal.pbio.0000005';
    const mock = new MockAdapter(axios);
    mock.onGet(`${BASE_URL}/${doi}`).reply(200, { html: 'xx' });

    const actual = await referencesFetcher([doi]);
    const expected = [];

    expect(actual).toEqual(expected);
  });
});
