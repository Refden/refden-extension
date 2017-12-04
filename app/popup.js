import axios from 'axios';
import _ from 'lodash/fp';

import { FROM_POPUP__SHOW_REFERENCES } from './libs/messages';
import referencesFetcher from './libs/api/referencesFetcher';

const appendReference = _.curry(
  (table, reference) => {
    const row = table.insertRow();
    const cell = row.insertCell(0);
    const htmlContent = `
      ${reference.title}
      <button class="add-button" data-doi="${reference.DOI}">
        Add
      </button>
    `;

    cell.innerHTML = htmlContent;
  }
);

const setReferences = async (dois) => {
  const references = _.isEmpty(dois) ? ['No references were found.'] : await referencesFetcher(dois);

  const table = document.getElementById('references-table');
  table.deleteRow(0);

  references.forEach(appendReference(table));
}

const showReferences = tabs =>
  chrome.tabs.sendMessage(tabs[0].id, FROM_POPUP__SHOW_REFERENCES, setReferences);

const listener = () =>
  chrome.tabs.query({ active: true, currentWindow: true}, showReferences);

window.addEventListener('DOMContentLoaded', listener);
