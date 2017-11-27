import axios from 'axios';

export const getLists = () => axios.get('https://www.refden.co/api/lists');
