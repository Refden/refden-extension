import $ from 'jquery';
import 'select2';
import 'select2/dist/css/select2.css';

import { postReference } from '../libs/api/refden';
import addOnSubmitHandler from './reference-form/addOnSubmitHandler';

const populateLists = lists => {
  const listSelect = document.getElementById('lists');

  lists.forEach(list => {
    const option = document.createElement('option');
    option.textContent = list.name;
    option.value = list.id;
    listSelect.appendChild(option);
  });
};

const populateForm = () => {
  chrome.storage.sync.get(['selectedReference', 'lists'], storageArea => {
    const { doi, title } = storageArea.selectedReference;

    document.getElementById('doi').value = doi;
    document.getElementById('title').innerText = title;
    populateLists(storageArea.lists);
  });
};

const initForm = () => {
  populateForm();
  addOnSubmitHandler(document);

  $('#lists').select2();
};

document.addEventListener('DOMContentLoaded', initForm);
