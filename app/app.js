import doiFinder from './doiFinder';

console.log('Started...');

const doi = doiFinder(document.body.innerText);
console.log('The doi: ', doi);
