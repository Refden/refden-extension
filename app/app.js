import informBackgroundTabShouldHavePageAction from './libs/services/informBackgroundTabShouldHavePageAction';
import findReferences from './libs/listeners/findReferences';
import setupBrowser from './libs/utils/setupBrowser';

setupBrowser();
informBackgroundTabShouldHavePageAction();
browser.runtime.onMessage.addListener(findReferences);
