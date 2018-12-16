import informBackgroundTabShouldHavePageAction from './libs/services/informBackgroundTabShouldHavePageAction';
import findReferences from './libs/listeners/findReferences';

window.browser = (function () {
  return window.browser || window.chrome;
})();

informBackgroundTabShouldHavePageAction();
browser.runtime.onMessage.addListener(findReferences);
