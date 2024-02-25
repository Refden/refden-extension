import * as refden from '../api/refden';
import { FROM_CONTENT__SHOW_PAGE_ACTION } from '../messages';
import enablePageActionForTab from './enablePageActionForTab';

describe('enablePageActionForTab()', () => {
  it('calls chrome.action.show and store lists', async () => {
    global.chrome = {
      storage: {
        session: { set: jest.fn() },
      },
      action: {
        show: jest.fn(),
        enable: jest.fn(),
      },
    };
    const tabId = 1;
    const sender = {
      tab: { id: tabId },
    };
    const lists = [{ id: 1, name: 'Cancer' }];
    refden.getLists = jest.fn(() => Promise.resolve(lists));

    await enablePageActionForTab(FROM_CONTENT__SHOW_PAGE_ACTION, sender);

    expect(refden.getLists).toHaveBeenCalledTimes(1);
    expect(chrome.action.enable).toHaveBeenCalledWith(tabId);
    expect(chrome.storage.session.set).toHaveBeenCalledWith({ lists });
  });

  describe('when request fails', () => {
    it('shows need login popup', async () => {
      global.chrome = {
        action: {
          show: jest.fn(),
          setPopup: jest.fn(),
          enable: jest.fn(),
        },
      };
      const tabId = 1;
      const sender = {
        tab: { id: tabId },
      };
      refden.getLists = jest.fn(() => Promise.reject('Error'));

      await enablePageActionForTab(FROM_CONTENT__SHOW_PAGE_ACTION, sender);

      expect(chrome.action.setPopup).toHaveBeenCalledWith({
        tabId,
        popup: 'need-login.html',
      });
    });
  });

  describe('when another message is passed', () => {
    it('doesnt call browser.action.show', async () => {
      global.browser = {
        action: { show: jest.fn() }
      };
      const message = 'YOLO';
      const tabId = 1;
      const sender = {
        tab: { id: tabId },
      };

      await enablePageActionForTab(message, sender);

      expect(browser.action.show).not.toHaveBeenCalledWith(tabId);
    });
  });
});
