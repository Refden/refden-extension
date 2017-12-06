const populateForm = () => chrome.storage.sync.get('selectedReference', storageArea => {
  const { doi, title } = storageArea.selectedReference;

  document.getElementById('doi').value = doi;
  document.getElementById('title').innerText = title;
});

document.addEventListener('DOMContentLoaded', populateForm);
