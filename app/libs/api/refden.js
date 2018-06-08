import axios from 'axios';

const BASE_URL = 'https://www.refden.co/api/';

const buildUrl = path => `${BASE_URL}${path}`;

export const REFERENCES_URL = buildUrl('references');

export const getLists = () => axios.get(buildUrl('lists'));

export const getReferencePresence = doi =>
  axios.get(REFERENCES_URL, { params: { doi } });

export const postReference = data => axios.post(REFERENCES_URL, data);
