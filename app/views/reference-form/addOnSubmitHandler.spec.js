import { JSDOM } from 'jsdom';

import * as refden from '../../libs/api/refden';

import addOnSubmitHandler from './addOnSubmitHandler';

const buildDocument = () =>
  (new JSDOM(`<!DOCTYPE html><form id="form"></form>`)).window.document;

describe('addOnSubmitHandler()', () => {
  it('gets the form', () => {
    const document = {
      getElementById: jest.fn(() => ({})),
    };

    addOnSubmitHandler(document);

    expect(document.getElementById).toBeCalledWith('form');
  });

  describe('form.onsubmit()', () => {
    it('returns false and submits form to server', () => {
      const document = buildDocument();
      const form = document.getElementById('form');
      const formData = {};
      global.FormData = jest.fn(() => formData);
      refden.postReference = jest.fn();

      addOnSubmitHandler(document);
      const actual = form.onsubmit();

      expect(actual).toBe(false);
      expect(global.FormData).toBeCalledWith(form);
      expect(refden.postReference).toBeCalledWith(formData);
    });
  });
});
