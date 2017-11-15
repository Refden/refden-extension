import { FROM_CONTENT__SHOW_PAGE_ACTION } from '../messages';

const enablePageActionForTab = (message, sender) => {
  if (message !== FROM_CONTENT__SHOW_PAGE_ACTION) return;
  chrome.pageAction.show(sender.tab.id);
};

export default enablePageActionForTab;
