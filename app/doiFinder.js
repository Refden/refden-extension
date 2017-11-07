const DOI_REGEX = /\b10\.(?:\d+\.*)+[/](?:(?:[^\s.])+\.*)+\b/;

const doiFinder = text => text.match(DOI_REGEX);

export default doiFinder;
