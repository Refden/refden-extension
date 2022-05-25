import enablePageActionForTab from './libs/listeners/enablePageActionForTab';
import setupBrowser from './libs/utils/setupBrowser';

setupBrowser();

browser.runtime.onMessage.addListener(enablePageActionForTab);

var saveReference = function(word){
    var query = word.selectionText;
    // TODO open form with query as a title
};

browser.contextMenus.create({
    id: "1",
    title: "Save Highlight to Refden",
    contexts:["selection"],
});

browser.contextMenus.onClicked.addListener(saveReference);