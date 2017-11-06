const DOI_REGEX = /\b10\.(?:\d+\.*)+[\/](?:(?:[^\s\.])+\.*)+\b/;

const doiFinder = (text) => {
  return text.match(DOI_REGEX)[0];
};

export default doiFinder;
