import { init } from '@sentry/browser';

import informBackgroundTabShouldHavePageAction from './libs/services/informBackgroundTabShouldHavePageAction';
import findReferences from './libs/listeners/findReferences';
import setupBrowser from './libs/utils/setupBrowser';

init({
  dsn: 'https://ef8e3b5f472c409e9cd71ecc6c3611dc@sentry.io/1367650',
});

setupBrowser();

informBackgroundTabShouldHavePageAction();
browser.runtime.onMessage.addListener(findReferences);
