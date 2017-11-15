import enablePageActionForTab from './enablePageActionForTab';
import { FROM_CONTENT__SHOW_PAGE_ACTION } from '../messages';

describe('enablePageActionForTab()', () => {
  it('calls chrome.pageAction.show', () => {
    global.chrome = {
      pageAction: {
        show: jest.fn(),
      }
    };
    const tabId = 1;
    const sender = {
      tab: {
        id: tabId,
      },
    };

    enablePageActionForTab(FROM_CONTENT__SHOW_PAGE_ACTION, sender);

    expect(chrome.pageAction.show).toBeCalledWith(tabId);
  });

  it('doesnt call chrome.pageAction.show when another message passed', () => {
    global.chrome = {
      pageAction: {
        show: jest.fn(),
      }
    };
    const message = 'YOLO';
    const tabId = 1;
    const sender = {
      tab: {
        id: tabId,
      },
    };

    enablePageActionForTab(message, sender);

    expect(chrome.pageAction.show).not.toBeCalledWith(tabId);
  });
});
