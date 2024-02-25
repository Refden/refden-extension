const BASE_URL = 'https://www.refden.com/api/';

const buildUrl = path => `${BASE_URL}${path}`;

export const REFERENCES_URL = buildUrl('references');

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  return response.json();
};

export const getLists = () =>
  fetch(buildUrl('lists'))
    .then(handleResponse);

export const getReferencePresence = doi =>
  fetch(`${REFERENCES_URL}?doi=${encodeURIComponent(doi)}`)
    .then(handleResponse);

export const postReference = formData => {
  return fetch(REFERENCES_URL, {
    method: 'POST',
    body: formData,
  });
};
