import enablePageActionForTab from './libs/listeners/enablePageActionForTab';

chrome.runtime.onMessage.addListener(enablePageActionForTab);
