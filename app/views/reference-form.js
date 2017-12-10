import $ from 'jquery';
import 'select2';
import 'select2/dist/css/select2.css';

import { postReference } from '../libs/api/refden';

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

const addOnSubmitHandler = () => {
  const form = document.getElementById('form');
  form.onsubmit = () => {
    const formData = new FormData(form);
    postReference(formData);
    window.location.href = '../popup.html';

    return false;
  };
};

const initForm = () => {
  populateForm();
  addOnSubmitHandler();

  $('#lists').select2();
};

document.addEventListener('DOMContentLoaded', initForm);
