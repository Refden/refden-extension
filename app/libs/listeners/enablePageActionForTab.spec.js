import * as refden from '../api/refden';
import { FROM_CONTENT__SHOW_PAGE_ACTION } from '../messages';
import enablePageActionForTab from './enablePageActionForTab';

describe('enablePageActionForTab()', () => {
  it('calls browser.pageAction.show and store lists', async () => {
    global.browser = {
      storage: {
        sync: { set: jest.fn() },
      },
      pageAction: { show: jest.fn() },
    };
    const tabId = 1;
    const sender = {
      tab: { id: tabId },
    };
    const lists = [{ id: 1, name: 'Cancer' }];
    refden.getLists = jest.fn(() => Promise.resolve({ data: lists }));

    await enablePageActionForTab(FROM_CONTENT__SHOW_PAGE_ACTION, sender);

    expect(refden.getLists).toHaveBeenCalledTimes(1);
    expect(browser.pageAction.show).toBeCalledWith(tabId);
    expect(browser.storage.sync.set).toBeCalledWith({ lists });
  });

  describe('when request fails', () => {
    it('shows need login popup', async () => {
      global.browser = {
        pageAction: {
          show: jest.fn(),
          setPopup: jest.fn(),
        },
      };
      const tabId = 1;
      const sender = {
        tab: { id: tabId },
      };
      refden.getLists = jest.fn(() => Promise.reject('Error'));

      await enablePageActionForTab(FROM_CONTENT__SHOW_PAGE_ACTION, sender);

      expect(browser.pageAction.setPopup).toBeCalledWith({
        tabId,
        popup: 'need-login.html',
      });
    });
  });

  describe('when another message is passed', () => {
    it('doesnt call browser.pageAction.show', async () => {
      global.browser = {
        pageAction: { show: jest.fn() }
      };
      const message = 'YOLO';
      const tabId = 1;
      const sender = {
        tab: { id: tabId },
      };

      await enablePageActionForTab(message, sender);

      expect(browser.pageAction.show).not.toBeCalledWith(tabId);
    });
  });
});
