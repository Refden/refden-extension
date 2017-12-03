import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import * as refden from '../api/refden';
import { FROM_CONTENT__SHOW_PAGE_ACTION } from '../messages';
import enablePageActionForTab from './enablePageActionForTab';

describe('enablePageActionForTab()', () => {
  it('calls chrome.pageAction.show and store lists', async () => {
    global.chrome = {
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
    expect(chrome.pageAction.show).toBeCalledWith(tabId);
    expect(chrome.storage.sync.set).toBeCalledWith({ lists });
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
