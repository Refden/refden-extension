const ramon = () => chrome.storage.sync.get('selectedReference', storageArea =>
  document.getElementById('title').innerText = storageArea.selectedReference.title
);

document.addEventListener('DOMContentLoaded', ramon);
