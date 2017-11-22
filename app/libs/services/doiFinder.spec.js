import doiFinder from './doiFinder';

describe('doiFinder()', () => {
  it('returns DOIs', () => {
    const text = `
      Korean J Intern Med. 2017 Oct 25.
      doi: 10.3904/kjim.2017.034.
      [Epub ahead of print]
      Other doi here-> 10.3389/fgene.2016.00013
    `;

    const actual = doiFinder(text);
    const expected = [
      '10.3904/kjim.2017.034',
      '10.3389/fgene.2016.00013',
    ];

    expect(actual).toEqual(expected);
  });

  it('removes DOI repeats', () => {
    const text = `
      10.3904/kjim.2017.034
      10.3904/kjim.2017.034
    `;

    const actual = doiFinder(text);
    const expected = ['10.3904/kjim.2017.034'];

    expect(actual).toEqual(expected);
  });

  describe('when no DOIs in text', () => {
    it('returns an empty array', () => {
      const text = 'Yo Rocky!';

      const actual = doiFinder(text);
      const expected = [];

      expect(actual).toEqual(expected);
    });
  });
});
