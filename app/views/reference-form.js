import $ from 'jquery';
import 'select2';
import 'select2/dist/css/select2.css';
import autosize from 'autosize';

import addOnSubmitHandler from './reference-form/addOnSubmitHandler';
import setupBrowser from '../libs/utils/setupBrowser';

setupBrowser();

const populateLists = lists => {
  const listSelect = document.getElementById('lists');

  lists.forEach(list => {
    const option = document.createElement('option');
    option.textContent = list.name;
    option.value = list.name;
    listSelect.appendChild(option);
  });
};

const populateForm = async () => {
  chrome.storage.session.get(['selectedReference', 'lists']).then((storageArea) => {
    const { doi, title } = storageArea.selectedReference;

    document.getElementById('doi').value = doi;
    document.getElementById('title').innerText = title;
    populateLists(storageArea.lists);
  });
};

const initForm = async () => {
  await populateForm();
  addOnSubmitHandler(document);

  $('#lists').select2({ tags: true });
  autosize($('textarea'));
};

document.addEventListener('DOMContentLoaded', initForm);
