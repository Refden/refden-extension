import enablePageActionForTab from './libs/listeners/enablePageActionForTab';

window.browser = (function () {
  return window.browser || window.chrome;
})();

browser.runtime.onMessage.addListener(enablePageActionForTab);
