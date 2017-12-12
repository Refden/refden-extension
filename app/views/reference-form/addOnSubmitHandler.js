import { postReference } from '../../libs/api/refden';

const addOnSubmitHandler = document => {
  const form = document.getElementById('form');
  form.onsubmit = () => {
    const formData = new FormData(form);
    postReference(formData);
    window.location = '../popup.html';

    return false;
  };
};

export default addOnSubmitHandler;
