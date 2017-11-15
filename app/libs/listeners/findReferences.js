import doiFinder from '../services/doiFinder';

const findReferences = (msg, sender, sendResponse) => {
  if (msg.from !== 'popup' || msg.subject !== 'DOMInfo') return;

  const dois = doiFinder(document.body.innerText);
  sendResponse(dois);
};

export default findReferences;
