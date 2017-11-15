function setDOIs(dois) {
  document.getElementById('dois').textContent = dois;
}

window.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query({
    active: true,
    currentWindow: true,
  }, function (tabs) {
    var message = {from: 'popup', subject: 'DOMInfo'};
    chrome.tabs.sendMessage(tabs[0].id, message, setDOIs);
  });
});
