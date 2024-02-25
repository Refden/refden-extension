import * as refden from '../api/refden';
import { FROM_CONTENT__SHOW_PAGE_ACTION } from '../messages';

const enablePageActionForTab = async (message, sender) => {
  if (message !== FROM_CONTENT__SHOW_PAGE_ACTION) return;

  const tabId = sender.tab.id;

  try {
    const lists = await refden.getLists();
    chrome.storage.session.set({ lists });
  }
  catch(error) {
    chrome.action.setPopup({ tabId, popup: 'need-login.html' });
  }
  finally {
    chrome.action.enable(tabId);
  }
};

export default enablePageActionForTab;
