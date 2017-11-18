import { FROM_POPUP__SHOW_REFERENCES } from '../messages';

import doiFinder from '../services/doiFinder';

const findReferences = (msg, sender, sendResponse) => {
  if (msg !== FROM_POPUP__SHOW_REFERENCES) return;
  const dois = doiFinder(document.body.innerText);
  sendResponse(dois);
};

export default findReferences;
