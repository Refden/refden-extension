import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

import { postReference } from '../../libs/api/refden';

const handleSuccess = () =>
  toastr.success('Reference added', null, {
    timeOut: 2,
    onHidden: () => window.location = '../popup.html',
  });

const handleError = () => toastr.error('Could not add this reference');

const handler = form => () => {
  const formData = new FormData(form);
  postReference(formData).then(handleSuccess).catch(handleError);
  return false;
};

const addOnSubmitHandler = document => {
  const form = document.getElementById('form');
  form.onsubmit = handler(form);
};

export default addOnSubmitHandler;
