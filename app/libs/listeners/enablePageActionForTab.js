import * as refden from '../api/refden';
import { FROM_CONTENT__SHOW_PAGE_ACTION } from '../messages';

const enablePageActionForTab = async (message, sender) => {
  if (message !== FROM_CONTENT__SHOW_PAGE_ACTION) return;

  const tabId = sender.tab.id;

  try {
    const response = await refden.getLists();
    browser.storage.sync.set({ lists: response.data });
  }
  catch(error) {
    browser.pageAction.setPopup({ tabId, popup: 'need-login.html' });
  }
  finally {
    browser.pageAction.show(tabId);
  }
};

export default enablePageActionForTab;
