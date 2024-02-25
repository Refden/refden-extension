import _ from 'lodash/fp';

import { FROM_POPUP__SHOW_REFERENCES } from './libs/messages';
import referencesFetcher from './libs/api/referencesFetcher';
import setupBrowser from './libs/utils/setupBrowser';
import * as refden from './libs/api/refden';

setupBrowser();

const appendReference = _.curry(
  (table, reference) => {
    const row = table.insertRow();
    const cellTitle = row.insertCell(0);
    const cellButton = row.insertCell(1);

    cellTitle.innerHTML = reference.title;

    if (reference.present) {
      cellButton.innerHTML = 'Added';
    } else {
      cellButton.innerHTML = `
        <button
          class="add-button btn btn-outline-dark btn-sm"
          data-doi="${reference.DOI}"
          data-title="${reference.title}"
        />
          Add
        </button>
      `;
    }
  }
);

const setReferences = async (dois) => {
  const references = await referencesFetcher(dois);

  const table = document.getElementById('references-table');
  table.deleteRow(0);

  if(_.isEmpty(references)) {
    table.insertRow().insertCell(0).innerHTML = 'No references found in this page';
  }
  else {
    references.forEach(appendReference(table));
  }
};

const handleOnAdd = async(event) => {
  if (event.target.tagName !== 'BUTTON' && event.target.className !== 'add-button') return;

  const { doi, title } = event.target.dataset;
  const lists = await refden.getLists();

  chrome.storage.session.set({
    selectedReference: { doi, title },
    lists,
  });
  window.location.href = 'views/reference-form.html';
};

const showReferences = tabs => {
  const tabId = tabs[0].id;
  browser.tabs.sendMessage(tabId, FROM_POPUP__SHOW_REFERENCES, setReferences);

  document.addEventListener('click', handleOnAdd);
};

const listener = () =>
  browser.tabs.query({ active: true, currentWindow: true}, showReferences);

window.addEventListener('DOMContentLoaded', listener);
