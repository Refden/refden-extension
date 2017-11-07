import doiFinder from './doiFinder';

describe('doiFinder()', () => {
  it('returns doi', () => {
    const text = `
    Korean J Intern Med. 2017 Oct 25.
    doi: 10.3904/kjim.2017.034.
    [Epub ahead of print]
    `;

    const actual = doiFinder(text);

    expect(actual[0]).toEqual('10.3904/kjim.2017.034');
  });
});
