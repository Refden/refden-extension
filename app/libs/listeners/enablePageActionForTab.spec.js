import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import * as refden from '../api/refden';
import { FROM_CONTENT__SHOW_PAGE_ACTION } from '../messages';
import enablePageActionForTab from './enablePageActionForTab';

describe('enablePageActionForTab()', () => {
  it('calls chrome.pageAction.show', async () => {
    global.chrome = {
      pageAction: { show: jest.fn() }
    };
    const tabId = 1;
    const sender = {
      tab: { id: tabId },
    };
    refden.getLists = jest.fn(() => Promise.resolve({}));

    await enablePageActionForTab(FROM_CONTENT__SHOW_PAGE_ACTION, sender);

    expect(refden.getLists).toHaveBeenCalledTimes(1);
    expect(chrome.pageAction.show).toBeCalledWith(tabId);
  });

  describe('when request fails', () => {
    it('shows need login popup', async () => {
      global.chrome = {
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

      expect(chrome.pageAction.setPopup).toBeCalledWith({
        tabId,
        popup: "need-login.html",
      });
    });
  })

  describe('when another message is passed', () => {
    it('doesnt call chrome.pageAction.show', async () => {
      global.chrome = {
        pageAction: { show: jest.fn() }
      };
      const message = 'YOLO';
      const tabId = 1;
      const sender = {
        tab: { id: tabId },
      };

      await enablePageActionForTab(message, sender);

      expect(chrome.pageAction.show).not.toBeCalledWith(tabId);
    });
  });
});
