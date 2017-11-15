import informBackgroundTabShouldHavePageAction from './libs/services/informBackgroundTabShouldHavePageAction';
import findReferences from './libs/listeners/findReferences';

informBackgroundTabShouldHavePageAction();
chrome.runtime.onMessage.addListener(findReferences);
