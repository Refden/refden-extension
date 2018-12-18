import enablePageActionForTab from './libs/listeners/enablePageActionForTab';
import setupBrowser from './libs/utils/setupBrowser';

setupBrowser();

browser.runtime.onMessage.addListener(enablePageActionForTab);
