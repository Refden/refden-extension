import axios from 'axios';

import { FROM_POPUP__SHOW_REFERENCES } from './libs/messages';

const setDOIs = async (dois) => {
  const response = await axios({
    method: 'get',
    url: `https://doi.org/${dois[0]}`,
    headers: { 'Accept': 'application/json; charset=utf-8' },
  });

  document.getElementById('dois').textContent = response.data.title;
}

const showReferences = tabs =>
  chrome.tabs.sendMessage(tabs[0].id, FROM_POPUP__SHOW_REFERENCES, setDOIs);

const listener = () =>
  chrome.tabs.query({ active: true, currentWindow: true}, showReferences);

window.addEventListener('DOMContentLoaded', listener);
