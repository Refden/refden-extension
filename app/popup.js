import { FROM_POPUP__SHOW_REFERENCES } from './libs/messages';

const setDOIs = dois =>
  document.getElementById('dois').textContent = dois;

const showReferences = tabs =>
  chrome.tabs.sendMessage(tabs[0].id, FROM_POPUP__SHOW_REFERENCES, setDOIs);

const listener = () =>
  chrome.tabs.query({ active: true, currentWindow: true}, showReferences);

window.addEventListener('DOMContentLoaded', listener);
