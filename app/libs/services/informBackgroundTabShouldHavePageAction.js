import { FROM_CONTENT__SHOW_PAGE_ACTION } from '../messages';

const informBackgroundTabShouldHavePageAction = () =>
  browser.runtime.sendMessage(FROM_CONTENT__SHOW_PAGE_ACTION);

export default informBackgroundTabShouldHavePageAction;
