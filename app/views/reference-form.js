const populateLists = lists => {
  const listSelect = document.getElementById('lists');

  lists.forEach(list => {
    const option = document.createElement('option');
    option.textContent = list.name;
    option.value = list.name;
    listSelect.appendChild(option);
  });
};

const populateForm = () => chrome.storage.sync.get(['selectedReference', 'lists'], storageArea => {
  const { doi, title } = storageArea.selectedReference;

  document.getElementById('doi').value = doi;
  document.getElementById('title').innerText = title;
  populateLists(storageArea.lists);
});

document.addEventListener('DOMContentLoaded', populateForm);
