import axios from 'axios';

const BASE_URL = 'https://www.refden.co/api/';

const buildUrl = path => `${BASE_URL}${path}`;

export const getLists = () => axios.get(buildUrl('lists'));
export const postReference = data => axios.post(buildUrl('references'), data);
