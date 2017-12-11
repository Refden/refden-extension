import addOnSubmitHandler from './addOnSubmitHandler';

describe('addOnSubmitHandler()', () => {
  it('gets the form', () => {
    const document = {
      getElementById: jest.fn(() => ({})),
    };

    addOnSubmitHandler(document);

    expect(document.getElementById).toBeCalledWith('form');
  });
});
