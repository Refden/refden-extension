import { FROM_POPUP__SHOW_REFERENCES } from '../messages';

import doiFinder from '../services/doiFinder';

const findReferences = (msg, sender, sendResponse) => {
  if (msg !== FROM_POPUP__SHOW_REFERENCES) return;
  const dois = doiFinder(document);
  sendResponse(dois);
};

export default findReferences;
