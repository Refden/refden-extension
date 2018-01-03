import _ from 'lodash/fp';
import { JSDOM } from 'jsdom';

import doiFinder from './doiFinder';

const buildDocument = text => ({
  body: {
    innerText: text,
  }
});

describe('doiFinder()', () => {
  it('returns DOIs', () => {
    const text = `
      Korean J Intern Med. 2017 Oct 25.
      doi: 10.3904/kjim.2017.034.
      [Epub ahead of print]
      Other doi here-> 10.3389/fgene.2016.00013
    `;
    const document = buildDocument(text);

    const actual = doiFinder(document);
    const expected = [
      '10.3904/kjim.2017.034',
      '10.3389/fgene.2016.00013',
    ];

    expect(actual).toEqual(expected);
  });

  it('picks DOIs from links and shows DOIs from text first', () => {
    const dom = new JSDOM(`
      <!DOCTYPE html>
      <a class="doi" href="https://doi.org/10.1016/j.bbr.2013.05.022"></a>
      <a href="https://google.com"></a>
    `, { runScripts: 'outside-only' });
    dom.window.eval(
      'document.body.innerText = "Other doi here-> 10.3389/fgene.2016.00013"'
    );
    const document = dom.window.document;

    const actual = doiFinder(document);
    const expected = [
      '10.3389/fgene.2016.00013',
      '10.1016/j.bbr.2013.05.022',
    ];

    expect(actual).toEqual(expected);
  });

  it('removes DOI repeats', () => {
    const text = `
      10.3904/kjim.2017.034
      10.3904/kjim.2017.034
    `;
    const document = buildDocument(text);

    const actual = doiFinder(document);
    const expected = ['10.3904/kjim.2017.034'];

    expect(actual).toEqual(expected);
  });

  it('only returns 10 results as max', () => {
    const textWith11dois = _.range(0, 11)
      .map(value => `10.3904/kjim.2017.0${value}`)
      .join(' ');
    const document = buildDocument(textWith11dois);

    const actual = doiFinder(document).length;
    const expected = 10;

    expect(actual).toEqual(expected);
  });

  it('excludes text after "#" char', () => {
    const text = `
      doi: 10.3904/kjim.2017.034#AB.
      other doi: 10.3904/kjim.2017.034#AC
    `;
    const document = buildDocument(text);

    const actual = doiFinder(document);
    const expected = [
      '10.3904/kjim.2017.034',
    ];

    expect(actual).toEqual(expected);
  });

  describe('when no DOIs in text', () => {
    it('returns an empty array', () => {
      const text = 'Yo Rocky!';
      const document = buildDocument(text);

      const actual = doiFinder(document);
      const expected = [];

      expect(actual).toEqual(expected);
    });
  });
});
